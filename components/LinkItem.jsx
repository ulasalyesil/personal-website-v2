import Link from "next/link";

export default function LinkItem({ target, title, image, description }) {
  return (
    <Link
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 items-center py-3 px-2 -mx-2 rounded-lg hover:bg-surface-1 transition-colors duration-150"
    >
      <div className="size-10 flex items-center justify-center rounded-md bg-surface-2 shrink-0">
        {image}
      </div>
      <div>
        <span className="font-medium text-text-primary text-sm">{title}</span>
        <p className="text-text-tertiary text-sm font-mono">{description}</p>
      </div>
    </Link>
  );
}
