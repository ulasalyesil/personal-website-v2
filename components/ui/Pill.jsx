export default function Pill({label}) {
  return (
    <div className="flex w-fit items-center justify-center text-xs text-neutral-500 font-medium rounded-full px-3 h-8 border border-neutral-300">
      <p>{label}</p>
    </div>
  );
}
