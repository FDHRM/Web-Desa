export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-700 text-kertas">
      <div className="bg-noticeboard pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-16">
        <span className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em] text-lime-300">
          {eyebrow}
        </span>
        <h1
          className="animate-fade-up mt-2 font-display text-3xl font-semibold md:text-4xl"
          style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-fade-up mt-2 max-w-2xl text-sm text-kertas/80"
            style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
          >
            {description}
          </p>
        )}
      </div>
      <svg
        viewBox="0 0 1200 40"
        className="absolute bottom-0 left-0 w-full text-kertas"
        preserveAspectRatio="none"
      >
        <path d="M0 40 L0 22 Q600 -12 1200 22 L1200 40 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
