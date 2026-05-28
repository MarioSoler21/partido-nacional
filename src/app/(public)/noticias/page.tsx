import { prisma } from "@/lib/prisma";
import NewsCard from "@/components/shared/NewsCard";
import PageHero from "@/components/shared/PageHero";
import { Search, Tag } from "lucide-react";

const mockNews = [
  { id: 1, slug: "asamblea-nacional-partido-2024", titulo: "Partido Nacional celebra Asamblea Nacional con récord de participación", resumen: "Más de 5,000 delegados de los 18 departamentos se reunieron para definir la agenda política.", imagen: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80", creadoEn: new Date("2024-03-18"), tags: ["Política", "Asamblea"] },
  { id: 2, slug: "acuerdo-infraestructura-vial", titulo: "Firmado acuerdo para la construcción de 200 km de carreteras en zonas rurales", resumen: "El proyecto beneficiará a más de 80 comunidades en Olancho, El Paraíso y Choluteca.", imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", creadoEn: new Date("2024-03-12"), tags: ["Infraestructura", "Rural"] },
  { id: 3, slug: "plan-seguridad-ciudadana", titulo: "Presentado el Plan de Seguridad Ciudadana para las principales ciudades", resumen: "El plan incluye videovigilancia, mayor presencia policial y programas de reinserción social.", imagen: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80", creadoEn: new Date("2024-03-08"), tags: ["Seguridad", "Ciudadanos"] },
  { id: 4, slug: "programa-empleo-juvenil", titulo: "Lanzado el Programa Nacional de Empleo Juvenil", resumen: "10,000 jóvenes tendrán acceso a capacitación técnica y colocación laboral.", imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", creadoEn: new Date("2024-03-01"), tags: ["Economía", "Juventud"] },
  { id: 5, slug: "inauguracion-escuela-rural", titulo: "Inauguración de 15 nuevas escuelas en zonas rurales de Honduras", resumen: "Las instituciones educativas beneficiarán a más de 4,500 niños en comunidades alejadas.", imagen: "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=600&q=80", creadoEn: new Date("2024-02-22"), tags: ["Educación"] },
  { id: 6, slug: "acuerdo-salud-publica", titulo: "Nuevo convenio para fortalecer la salud pública en Honduras", resumen: "El acuerdo internacional proveerá medicamentos y equipos médicos a 200 centros de salud.", imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80", creadoEn: new Date("2024-02-15"), tags: ["Salud"] },
];

const popularTags = ["Política", "Infraestructura", "Educación", "Salud", "Seguridad", "Economía", "Ambiente", "Social"];

async function getNews() {
  try {
    return await prisma.noticia.findMany({
      where: { publicado: true },
      orderBy: { creadoEn: "desc" },
    });
  } catch {
    return mockNews;
  }
}

export default async function NoticiasPage() {
  const news = await getNews();

  return (
    <>
      <PageHero
        title="Sala de Prensa"
        subtitle="Mantente informado sobre las acciones y propuestas del Partido Nacional"
      />
      <section className="py-16 bg-section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {news.map((noticia) => (
                  <NewsCard key={noticia.id} {...noticia} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-serif font-semibold text-text-dark mb-3 text-lg">
                  Buscar
                </h3>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Buscar noticias..."
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Popular tags */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-serif font-semibold text-text-dark mb-3 text-lg flex items-center gap-2">
                  <Tag size={16} className="text-gold" />
                  Temas Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-section-bg text-primary text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
