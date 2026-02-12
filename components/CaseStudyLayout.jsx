import Image from "next/image";
import Button from "@/components/ui/Button";
import CaseStudyTitle from "@/components/CaseStudyTitle";

export default function CaseStudyLayout({
  title,
  date,
  company,
  role,
  contentBlocks,
  websiteUrl,
  slug,
}) {
  const firstImageIndex = contentBlocks.findIndex(
    (block) => block.type === "image",
  );

  return (
    <article>
      <CaseStudyTitle title={title} date={date} company={company} role={role} />

      <div className="mt-12 space-y-6 text-base text-text-secondary font-mono leading-relaxed">
        {contentBlocks.map((block, index) => {
          if (block.type === "text") {
            return (
              <p key={index} className="text-pretty">
                {block.text}
              </p>
            );
          }

          if (block.type === "image") {
            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden bg-surface-1"
                style={
                  slug && index === firstImageIndex
                    ? { viewTransitionName: `project-${slug}` }
                    : undefined
                }
              >
                <Image
                  src={block.src}
                  alt={block.alt || `${title} image ${index + 1}`}
                  className="w-full"
                />
              </div>
            );
          }

          if (block.type === "gallery") {
            return (
              <div key={index} className="grid grid-cols-2 gap-3">
                {block.items.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden bg-surface-1"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `${title} gallery image ${idx + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        {websiteUrl && (
          <div className="pt-8">
            <Button
              label="Visit Website"
              href={websiteUrl}
              type="primary"
              target="_blank"
            />
          </div>
        )}
      </div>
    </article>
  );
}
