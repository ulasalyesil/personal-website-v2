'use client'

export default function LinkItem({ target, title, image, description }) {
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="pr-3 flex gap-4 items-center rounded-lg hover:bg-neutral-200/50 transition duration-300"
      >
        <div
          id="image"
          className="aspect-square p-1 m-3 bg-neutral-100/50 border border-neutral-300/50 h-12 w-12 flex items-center justify-center rounded-md"
        >
          {image}
        </div>
        <div id="content" className="py-3 w-full">
          <h4 id="title" className="text-neutral-900 font-semibold text-sm">
            {title}
          </h4>
          <p id="description" className="text-neutral-500 text-sm">
            {description}
          </p>
        </div>
      </a>
    );
  }
  