import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "@/components/shared/NewsCard";

const mockNews = [
  {
    id: 1,
    slug: "asamblea-nacional-partido-2024",
    titulo: "Partido Nacional celebra Asamblea Nacional con récord de participación",
    resumen: "Más de 5,000 delegados de los 18 departamentos del país se reunieron para definir la agenda política del partido.",
    imagen: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80",
    creadoEn: new Date("2024-03-18"),
    tags: ["Política", "Asamblea"],
  },
  {
    id: 2,
    slug: "acuerdo-infraestructura-vial",
    titulo: "Firmado acuerdo para la construcción de 200 km de carreteras en zonas rurales",
    resumen: "El proyecto beneficiará a más de 80 comunidades en los departamentos de Olancho, El Paraíso y Choluteca.",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    creadoEn: new Date("2024-03-12"),
    tags: ["Infraestructura", "Rural"],
  },
  {
    id: 3,
    slug: "plan-seguridad-ciudadana",
    titulo: "Presentado el Plan de Seguridad Ciudadana para las principales ciudades",
    resumen: "El plan incluye tecnología de videovigilancia, mayor presencia policial y programas de reinserción social.",
    imagen: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    creadoEn: new Date("2024-03-08"),
    tags: ["Seguridad", "Ciudadanos"],
  },
];

export default function NewsGrid() {
  return (
    <section className="py-20 bg-section-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-2">Sala de Prensa</p>
            <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold">
              Últimas Noticias
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold rounded-full" />
          </div>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-teal transition-colors"
          >
            Ver todas las noticias
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map((noticia) => (
            <NewsCard key={noticia.id} {...noticia} />
          ))}
        </div>
      </div>
    </section>
  );
}
