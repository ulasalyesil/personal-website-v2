import { SOCIAL_LINKS, EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 border-t border-border-subtle">
      <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-text-tertiary">
        <a
          href={`mailto:${EMAIL}`}
          className="hover:text-text-primary transition-colors duration-150"
        >
          {EMAIL}
        </a>
        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-150"
          >
            X
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors duration-150"
          >
            Dribbble
          </a>
        </div>
      </div>
    </footer>
  );
}
