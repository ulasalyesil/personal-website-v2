import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary text-balance">
        Ulaş Alyeşil
      </h1>
      <p className="mt-1 text-text-secondary font-mono text-sm">
        Product Designer
      </p>
      <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed text-pretty">
        Designing clear interfaces, useful tools, and creative technology.
        Currently focused on early-stage products where design shapes the
        outcome.
      </p>
      <div className="mt-6 flex gap-3">
        <Button
          label="Contact me"
          type="primary"
          href="mailto:hello@ulasalyesil.com"
        />
        <Button label="See Works" type="secondary" href="/works" />
      </div>
    </section>
  );
}
