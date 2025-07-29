import Image from "next/image";

export default function Experience() {
  const experiences = [
    {
      company: "Jotform",
      logo: "https://www.jotform.com/resources/assets/svg/jotform-icon-white.svg",
      role: "Software Engineer", // Update with your actual role
      period: "2023 - Present", // Update with your actual period
    },
    {
      company: "Peaka",
      logo: "https://www.jotform.com/resources/assets/svg/jotform-icon-white.svg",
      role: "Frontend Developer", // Update with your actual role
      period: "2022 - 2023", // Update with your actual period
    },
    {
      company: "WiseCareAI",
      logo: "https://www.jotform.com/resources/assets/svg/jotform-icon-white.svg",
      role: "Product Designer", // Update with your actual role
      period: "2024-2025", // Update with your actual period
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-neutral-400 px-4 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-mono font-bold w-full gap-4">
        Experience
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex-1 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200"
          >
            {/* Logo Container */}
            <div className="flex items-center justify-center h-12 mb-4">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                width={100}
                height={32}
                className="object-contain filter dark:brightness-0 dark:invert"
                priority={index === 0}
              />
            </div>

            {/* Content */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {exp.company}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                {exp.role}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                {exp.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
