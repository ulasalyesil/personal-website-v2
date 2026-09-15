import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary text-balance">
        Ulaş Alyeşil
      </h1>
      <p className="mt-1 text-text-secondary font-mono text-sm">
        Product Designer
      </p>
      <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl leading-snug text-pretty">
        I design financial products and the systems behind them. At
        GetirFinans, I work on banking and AI experiences, lead design-system
        work, and prototype interactions in SwiftUI and React.
      </p>
      <div className="mt-6 flex gap-3">
        <Button
          label="Get in touch"
          type="primary"
          href="mailto:hello@ulasalyesil.com"
        />
        <Button label="Explore banking work" type="secondary" href="/getirfinans-ai" />
        <Button label="View résumé" type="secondary" href="/ulas-alyesil-resume.pdf" target="_blank" />
      </div>
    </section>
  );
}
