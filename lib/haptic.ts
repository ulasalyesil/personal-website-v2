/**
 * Triggers haptic feedback on supported devices.
 * Uses Vibration API on Android, iOS checkbox trick on iOS.
 */
export function haptic(pattern: number | number[] = 50): void {
  if (typeof navigator === "undefined") return;

  // Vibration API (Android / modern browsers)
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
    return;
  }

  // iOS checkbox trick: momentarily check/uncheck a hidden checkbox
  // to trigger native haptic feedback
  const input = document.createElement("input");
  input.type = "checkbox";
  input.style.cssText =
    "position:absolute;opacity:0;pointer-events:none;width:0;height:0;";
  document.body.appendChild(input);
  input.checked = true;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  input.offsetHeight; // force layout
  input.checked = false;
  document.body.removeChild(input);
}
