import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #003580 0%, #006994 100%)" }}
    >
      {/* Left landmark illustration */}
      <div className="absolute left-0 bottom-0 w-72 md:w-96 lg:w-[420px] opacity-[0.18] pointer-events-none select-none">
        <CathedralSVG />
      </div>

      {/* Right landmark illustration */}
      <div className="absolute right-0 bottom-0 w-72 md:w-96 lg:w-[420px] opacity-[0.18] pointer-events-none select-none scale-x-[-1]">
        <CongressSVG />
      </div>

      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/PNH_2016_logo.svg"
            alt="Partido Nacional de Honduras"
            className="h-24 md:h-32 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
          Con Dios, por la Patria,
          <span className="block text-gold-light">hacia la Libertad</span>
        </h1>

        {/* Tagline */}
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Construyendo un Honduras próspero, seguro y libre para todas las familias hondureñas.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/partido"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#1B5E20" }}
          >
            Conoce al Partido
          </Link>
          <Link
            href="/proyectos"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white border-2 border-white/60 backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Ver Proyectos
          </Link>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gold/40" />
          <div className="w-2 h-2 rounded-full bg-gold/60" />
          <div className="h-px w-16 bg-gold/40" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,53,128,0.3))" }}
      />
    </section>
  );
}

function CathedralSVG() {
  return (
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g stroke="#C9A84C" strokeWidth="1.2" fill="none">
        {/* Main facade */}
        <rect x="60" y="200" width="280" height="280" />
        {/* Central nave */}
        <rect x="140" y="200" width="120" height="280" />
        {/* Left tower */}
        <rect x="60" y="120" width="80" height="360" />
        {/* Right tower */}
        <rect x="260" y="120" width="80" height="360" />
        {/* Left tower cap */}
        <polygon points="60,120 100,40 140,120" />
        {/* Right tower cap */}
        <polygon points="260,120 300,40 340,120" />
        {/* Cross on left tower */}
        <line x1="100" y1="50" x2="100" y2="90" />
        <line x1="85" y1="65" x2="115" y2="65" />
        {/* Cross on right tower */}
        <line x1="300" y1="50" x2="300" y2="90" />
        <line x1="285" y1="65" x2="315" y2="65" />
        {/* Central arch */}
        <path d="M 160 480 L 160 300 Q 200 260 240 300 L 240 480" />
        {/* Rose window */}
        <circle cx="200" cy="230" r="30" />
        <circle cx="200" cy="230" r="20" />
        {/* Window spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={200 + 10 * Math.cos((angle * Math.PI) / 180)}
            y1={230 + 10 * Math.sin((angle * Math.PI) / 180)}
            x2={200 + 28 * Math.cos((angle * Math.PI) / 180)}
            y2={230 + 28 * Math.sin((angle * Math.PI) / 180)}
          />
        ))}
        {/* Left tower windows */}
        <rect x="75" y="150" width="50" height="60" rx="25" />
        <rect x="75" y="240" width="50" height="60" rx="25" />
        {/* Right tower windows */}
        <rect x="275" y="150" width="50" height="60" rx="25" />
        <rect x="275" y="240" width="50" height="60" rx="25" />
        {/* Steps */}
        <rect x="100" y="475" width="200" height="8" />
        <rect x="80" y="483" width="240" height="8" />
        {/* Columns */}
        <line x1="160" y1="200" x2="160" y2="480" />
        <line x1="240" y1="200" x2="240" y2="480" />
        {/* Horizontal decorative bands */}
        <line x1="60" y1="320" x2="340" y2="320" />
        <line x1="60" y1="390" x2="340" y2="390" />
      </g>
    </svg>
  );
}

function CongressSVG() {
  return (
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g stroke="#C9A84C" strokeWidth="1.2" fill="none">
        {/* Main building */}
        <rect x="40" y="260" width="320" height="220" />
        {/* Central dome base */}
        <rect x="150" y="200" width="100" height="60" />
        {/* Dome */}
        <path d="M 150 200 Q 200 130 250 200" />
        {/* Dome lantern */}
        <rect x="188" y="130" width="24" height="40" />
        <rect x="192" y="110" width="16" height="25" />
        {/* Flag/cross on top */}
        <line x1="200" y1="88" x2="200" y2="110" />
        <line x1="200" y1="92" x2="220" y2="96" />
        {/* Columns row */}
        {[80, 115, 150, 185, 215, 250, 285].map((x) => (
          <line key={x} x1={x} y1={260} x2={x} y2={480} />
        ))}
        {/* Column caps */}
        <line x1="60" y1="260" x2="340" y2="260" />
        <line x1="60" y1="270" x2="340" y2="270" />
        {/* Pediment */}
        <polygon points="60,260 200,180 340,260" />
        {/* Windows */}
        {[70, 130, 190, 250, 310].map((x) => (
          <rect key={x} x={x} y={300} width={40} height={60} rx={20} />
        ))}
        {/* Second row windows */}
        {[70, 130, 190, 250, 310].map((x) => (
          <rect key={x + 400} x={x} y={380} width={40} height={60} rx={20} />
        ))}
        {/* Main entrance */}
        <rect x="165" y="380" width="70" height="100" />
        <path d="M 165 380 Q 200 350 235 380" />
        {/* Steps */}
        <rect x="80" y="475" width="240" height="8" />
        <rect x="60" y="483" width="280" height="8" />
        {/* Decorative band */}
        <line x1="40" y1="340" x2="360" y2="340" />
        {/* Side wings */}
        <rect x="20" y="290" width="60" height="190" />
        <rect x="320" y="290" width="60" height="190" />
      </g>
    </svg>
  );
}
