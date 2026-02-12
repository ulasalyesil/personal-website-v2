import Pill from "./ui/Pill";

export default function CaseStudyTitle({ title, date, company, role }) {
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
