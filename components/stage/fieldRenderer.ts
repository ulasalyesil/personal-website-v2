/*
 * One WebGL context paints every lab and project stage. Browsers cap live contexts at
 * ~16, so each stage owns a plain 2D canvas and the shared context renders
 * into it by drawImage. Only stages on screen animate; reduced motion gets a
 * single still frame.
 */

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/* Domain-warped value noise: a slow field of light, tinted by the item. */
const FRAGMENT = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_seed;
uniform float u_energy;
uniform float u_dark;
uniform vec3 u_base;
uniform vec3 u_accent;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}
float fbm3(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v / 0.875;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.15 + u_seed;
  float t = u_time * 0.018;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 2.4 * q + vec2(1.7, 9.2) + 0.6 * t),
    fbm(p + 2.4 * q + vec2(8.3, 2.8) - 0.4 * t)
  );
  float f = fbm(p + 2.0 * r);

  vec3 col = u_base;
  col = mix(col, u_accent, smoothstep(0.3, 0.9, f) * mix(0.14, 0.12, u_dark));

  // Light sits top-left and leans toward the centre on hover.
  vec2 lp = mix(vec2(0.22, 0.1), vec2(0.4, 0.22), u_energy);
  float d = length((uv - lp) * vec2(aspect, 1.0));
  float light = exp(-d * d * 1.8) * (0.55 + 0.45 * smoothstep(0.2, 0.8, q.x));
  col += light * mix(0.11, 0.035, u_dark);

  // Faint contour lines read the field as terrain, not a blur. They trace a
  // low-octave copy of the field so they stay smooth instead of wormy.
  float g = fbm3(p * 0.9 + 1.4 * q);
  float bands = abs(fract(g * 7.0) - 0.5) / (fwidth(g * 7.0) + 1e-4);
  float line = 1.0 - smoothstep(0.0, 1.2, bands);
  col = mix(col, mix(u_accent, vec3(1.0), u_dark * 0.5), line * mix(0.07, 0.06, u_dark));

  // Grain breaks up banding on 8-bit displays.
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}
`;

type Rgb = [number, number, number];

type Target = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  host: HTMLElement;
  tint: Rgb;
  base: Rgb;
  dark: boolean;
  seed: number;
  visible: boolean;
  hover: boolean;
  energy: number;
  drawn: boolean;
  width: number;
  height: number;
};

type Renderer = {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  uniforms: Record<string, WebGLUniformLocation | null>;
};

const targets = new Set<Target>();
let renderer: Renderer | null | undefined;
let frame = 0;
let last = 0;
let time = 0;
let schemeQuery: MediaQueryList | null = null;
let motionQuery: MediaQueryList | null = null;

function hexToRgb(hex: string): Rgb {
  const value = hex.trim().replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/* Matches the CSS fallback: 9% of the tint into surface-1. */
function readColors(target: Target) {
  const surface =
    getComputedStyle(target.host).getPropertyValue("--color-surface-1") ||
    "#f5f5f5";
  const s = hexToRgb(surface);
  target.base = mix(s, target.tint, 0.09);
  target.dark = 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2] < 0.5;
}

function createRenderer(): Renderer | null {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl || !gl.getExtension("OES_standard_derivatives")) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(
    [
      "u_res",
      "u_time",
      "u_seed",
      "u_energy",
      "u_dark",
      "u_base",
      "u_accent",
    ].map((name) => [name, gl.getUniformLocation(program, name)])
  );
  canvas.addEventListener("webglcontextlost", () => {
    // The CSS background underneath takes over.
    renderer = null;
    cancelAnimationFrame(frame);
    frame = 0;
    targets.forEach((t) =>
      t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height)
    );
  });
  return { gl, canvas, uniforms };
}

function paint(target: Target, time: number) {
  if (!renderer) return;
  const { gl, canvas, uniforms } = renderer;
  // Soft field: CSS-pixel resolution is enough, and keeps grain film-sized.
  // Cache layout dimensions on resize, not in the animation loop. Cap the
  // soft field's resolution so large detail stages do not dominate GPU work.
  const scale = Math.min(1, 960 / Math.max(target.width, target.height));
  const w = Math.max(1, Math.round(target.width * scale));
  const h = Math.max(1, Math.round(target.height * scale));
  if (target.canvas.width !== w || target.canvas.height !== h) {
    target.canvas.width = w;
    target.canvas.height = h;
  }
  if (canvas.width < w) canvas.width = w;
  if (canvas.height < h) canvas.height = h;
  gl.viewport(0, 0, w, h);
  gl.uniform2f(uniforms.u_res, w, h);
  gl.uniform1f(uniforms.u_time, time);
  gl.uniform1f(uniforms.u_seed, target.seed);
  gl.uniform1f(uniforms.u_energy, target.energy);
  gl.uniform1f(uniforms.u_dark, target.dark ? 1 : 0);
  gl.uniform3fv(uniforms.u_base, target.base);
  gl.uniform3fv(uniforms.u_accent, target.tint);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  // The viewport sits at the bottom-left of the shared canvas.
  target.ctx.drawImage(canvas, 0, canvas.height - h, w, h, 0, 0, w, h);
  target.drawn = true;
}

function reduced() {
  return motionQuery?.matches ?? false;
}

function tick(now: number) {
  frame = 0;
  if (reduced() || document.hidden || !renderer) return;
  frame = requestAnimationFrame(tick);
  // ~30fps is plenty for motion this slow.
  if (now - last < 32) return;
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  time += dt;
  let active = false;
  targets.forEach((target) => {
    if (!target.visible) return;
    active = true;
    const goal = target.hover ? 1 : 0;
    target.energy += (goal - target.energy) * Math.min(1, dt * 2.4);
    paint(target, time);
  });
  if (!active) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

function wake() {
  if (!renderer) return;
  if (reduced() || document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
    if (document.hidden) return;
    targets.forEach((t) => {
      if (t.visible && !t.drawn) {
        t.energy = 0;
        paint(t, 0);
      }
    });
    return;
  }
  if (!frame) {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
}

function seedFor(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 37;
}

function ensureGlobals() {
  if (renderer === undefined) renderer = createRenderer();
  if (!schemeQuery) {
    schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    schemeQuery.addEventListener("change", () => {
      targets.forEach((t) => {
        readColors(t);
        t.drawn = false;
      });
      wake();
    });
  }
  if (!motionQuery) {
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", () => {
      targets.forEach((t) => {
        t.drawn = false;
      });
      wake();
    });
    document.addEventListener("visibilitychange", wake);
  }
}

export function attachStageField(
  canvas: HTMLCanvasElement,
  key: string,
  tint: string
): () => void {
  ensureGlobals();
  const host = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  if (!renderer || !host || !ctx) return () => {};
  const target: Target = {
    canvas,
    ctx,
    host,
    tint: hexToRgb(tint),
    base: [0, 0, 0],
    dark: false,
    seed: seedFor(key),
    visible: false,
    hover: false,
    energy: 0,
    drawn: false,
    width: host.clientWidth,
    height: host.clientHeight,
  };
  readColors(target);
  targets.add(target);

  const observer = new IntersectionObserver(([entry]) => {
    target.visible = entry.isIntersecting;
    if (target.visible) wake();
  });
  observer.observe(host);

  const resize = new ResizeObserver(() => {
    target.width = host.clientWidth;
    target.height = host.clientHeight;
    target.drawn = false;
    if (target.visible) wake();
  });
  resize.observe(host);

  const trigger = host.closest("a") ?? host;
  const on = () => {
    target.hover = true;
  };
  const off = () => {
    target.hover = false;
  };
  trigger.addEventListener("pointerenter", on);
  trigger.addEventListener("pointerleave", off);
  trigger.addEventListener("focusin", on);
  trigger.addEventListener("focusout", off);

  return () => {
    targets.delete(target);
    if (!targets.size) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    observer.disconnect();
    resize.disconnect();
    trigger.removeEventListener("pointerenter", on);
    trigger.removeEventListener("pointerleave", off);
    trigger.removeEventListener("focusin", on);
    trigger.removeEventListener("focusout", off);
  };
}
