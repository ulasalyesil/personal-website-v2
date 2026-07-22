import Pill from "./ui/Pill";

interface CaseStudyTitleProps {
  title: string;
  date: string;
  company: string;
  role: string;
  status?: string;
}

export default function CaseStudyTitle({ title, date, company, role, status }: CaseStudyTitleProps) {
  return (
    <header className="mb-10">
      {status && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {status}
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-semibold text-text-primary tracking-tight text-balance">
        {title}
      </h1>
      <div className="flex flex-wrap gap-2 mt-4">
        <Pill label={date} />
        <Pill label={company} />
        <Pill label={role} />
      </div>
    </header>
  );
}
