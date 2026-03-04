import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-6 px-4 text-center">
      <h1 className="text-2xl font-bold text-text-primary max-w-lg text-balance">
        We regret to inform that we decided to move on with other pages.
        We&apos;ll keep your candidate info and reach out if we see any fit.
      </h1>
      <Button href="/" label="Go Home" type="primary" />
    </div>
  );
}
