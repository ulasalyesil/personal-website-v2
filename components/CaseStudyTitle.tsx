import Pill from "./ui/Pill";

interface CaseStudyTitleProps {
  title: string;
  date: string;
  company: string;
  role: string;
}

export default function CaseStudyTitle({ title, date, company, role }: CaseStudyTitleProps) {
  return (
    <header className="mb-10">
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
