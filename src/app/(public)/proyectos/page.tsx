import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/shared/ProjectCard";
import PageHero from "@/components/shared/PageHero";
import ProjectsFilter from "@/components/shared/ProjectsFilter";

const CATEGORIES = ["Todos", "Infraestructura", "Educación", "Salud", "Ambiente", "Social"];

const mockProjects = [
  { id: 1, slug: "construccion-parque-central", titulo: "Construcción del Parque Central de Tegucigalpa", descripcion: "Renovación completa del parque central con nuevas áreas verdes, iluminación LED y espacios para la familia.", imagen: "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=600&q=80", categoria: "Infraestructura", creadoEn: new Date("2024-03-15") },
  { id: 2, slug: "programa-becas-estudiantiles", titulo: "Programa de Becas para Estudiantes Sobresalientes", descripcion: "1,200 becas universitarias otorgadas a jóvenes hondureños de escasos recursos.", imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", categoria: "Educación", creadoEn: new Date("2024-02-20") },
  { id: 3, slug: "clinicas-moviles-rurales", titulo: "Clínicas Móviles para Comunidades Rurales", descripcion: "40 unidades médicas móviles para brindar atención primaria en zonas alejadas.", imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80", categoria: "Salud", creadoEn: new Date("2024-01-10") },
  { id: 4, slug: "reforestacion-nacional", titulo: "Plan Nacional de Reforestación", descripcion: "Siembra de 2 millones de árboles en áreas degradadas de todo el país.", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80", categoria: "Ambiente", creadoEn: new Date("2024-01-05") },
  { id: 5, slug: "vivienda-social-comayagua", titulo: "Proyecto de Vivienda Social en Comayagua", descripcion: "500 viviendas dignas para familias de escasos recursos en el departamento de Comayagua.", imagen: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600&q=80", categoria: "Social", creadoEn: new Date("2023-12-15") },
  { id: 6, slug: "puente-sur-choluteca", titulo: "Puente sobre el Río Choluteca", descripcion: "Infraestructura vial que conectará a 15,000 familias del sur del país.", imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", categoria: "Infraestructura", creadoEn: new Date("2023-11-20") },
];

async function getProjects() {
  try {
    return await prisma.proyecto.findMany({
      where: { publicado: true },
      orderBy: { creadoEn: "desc" },
    });
  } catch {
    return mockProjects;
  }
}

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const projects = await getProjects();
  const activeCategory = searchParams.categoria ?? "Todos";

  const filtered =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.categoria === activeCategory);

  return (
    <>
      <PageHero
        title="Nuestros Proyectos"
        subtitle="Conoce las iniciativas que estamos llevando a cabo en todo Honduras"
      />
      <section style={{ backgroundColor: "#EFF3F8" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsFilter categories={CATEGORIES} active={activeCategory} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No hay proyectos en esta categoría.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
