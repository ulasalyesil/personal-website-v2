'use client';
export default function Pill({label}) {
  return (
    <div className="flex sm:w-fit items-center justify-center text-xs text-neutral-500 font-mono font-medium rounded-full px-3 h-8 border border-neutral-300 dark:border-neutral-800">
      <p>{label}</p>
    </div>
  );
}
