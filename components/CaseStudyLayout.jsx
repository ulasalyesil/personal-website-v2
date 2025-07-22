`use client`;

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import CaseStudyTitle from "@/components/CaseStudyTitle";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export default function CaseStudyLayout({
  title,
  date,
  company,
  role,
  contentBlocks,
  websiteUrl,
}) {
  const { initial, animate, transition } = animationConfig;

  return (
    <div className="sm:px-6 md:px-10 max-w-5xl mx-auto">
      {/* Title Section */}
      <CaseStudyTitle title={title} date={date} company={company} role={role} />

      {/* Dynamic Content Blocks */}
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className="mt-12 space-y-6 text-base text-neutral-700 dark:text-neutral-300 font-mono leading-relaxed"
      >
        {contentBlocks.map((block, index) => {
          if (block.type === "text") {
            return <p key={index}>{block.text}</p>;
          }

          if (block.type === "image") {
            return (
              <motion.div
                key={index}
                initial={initial}
                animate={animate}
                transition={transition}
                className="mt-8"
              >
                <Image
                  src={block.src}
                  alt={block.alt || `${title} image ${index + 1}`}
                  className="w-full rounded-lg shadow"
                />
              </motion.div>
            );
          }

          if (block.type === "gallery") {
            return (
              <div key={index} className="grid grid-cols-2 gap-4 mt-8">
                {block.items.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.src}
                    alt={img.alt || `${title} gallery image ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            );
          }

          return null;
        })}

        {/* Optional Website Link */}
        {websiteUrl && (
          <div className="text-sm font-mono mt-6">
            Website:{" "}
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-orange-600"
            >
              {websiteUrl}
            </a>
          </div>
        )}
      </motion.div>

      {/* Optional Call-to-Action Button */}
      {websiteUrl && (
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
          className="mt-12"
        >
          <Button label="Visit Website" href={websiteUrl} type="primary" />
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
