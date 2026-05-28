import Link from "next/link";

function FacebookIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function TwitterIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>; }
function YoutubeIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>; }

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/partido", label: "Partido" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/transparencia", label: "Transparencia" },
  { href: "/galeria", label: "Galería" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#001a4d" }} className="text-white">
      {/* Gold top border */}
      <div className="h-1 bg-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="/PNHBLANCO.png"
                alt="Partido Nacional de Honduras"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm italic font-serif">
              &ldquo;Con Dios, por la Patria, hacia la Libertad&rdquo;
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: FacebookIcon, href: "#", label: "Facebook" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
                { icon: TwitterIcon, href: "#", label: "Twitter" },
                { icon: YoutubeIcon, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-blue-400/40 flex items-center justify-center text-blue-200 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-blue-100">
              <li>Tegucigalpa, Honduras</li>
              <li>
                <a href="mailto:info@partidonacional.hn" className="hover:text-gold transition-colors">
                  info@partidonacional.hn
                </a>
              </li>
              <li>
                <a href="tel:+50422XXXXXX" className="hover:text-gold transition-colors">
                  +504 22XX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-300 text-xs">
            © {currentYear} Partido Nacional de Honduras. Todos los derechos reservados.
          </p>
          <Link href="/admin" className="text-blue-400 text-xs hover:text-gold transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
