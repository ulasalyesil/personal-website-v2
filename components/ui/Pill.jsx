export default function Pill({ label }) {
  return (
    <span className="inline-flex items-center px-3 h-7 text-xs font-mono tabular-nums text-text-tertiary border border-border-default rounded-full">
      {label}
    </span>
  );
}
