interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section
      className="py-20 relative"
      style={{ background: "linear-gradient(135deg, #2D22E6 0%, #3125F0 100%)" }}
    >
      {/* Geometric overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="page-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid)" />
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-12 bg-gold/60" />
        </div>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
