import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";

const mockProjects = [
  {
    id: 1,
    slug: "construccion-parque-central",
    titulo: "Construcción del Parque Central de Tegucigalpa",
    descripcion: "Renovación completa del parque central con nuevas áreas verdes, iluminación LED y espacios para la familia.",
    imagen: "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=600&q=80",
    categoria: "Infraestructura",
    creadoEn: new Date("2024-03-15"),
  },
  {
    id: 2,
    slug: "programa-becas-estudiantiles",
    titulo: "Programa de Becas para Estudiantes Sobresalientes",
    descripcion: "1,200 becas universitarias otorgadas a jóvenes hondureños de escasos recursos con alto rendimiento académico.",
    imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    categoria: "Educación",
    creadoEn: new Date("2024-02-20"),
  },
  {
    id: 3,
    slug: "clinicas-moviles-rurales",
    titulo: "Clínicas Móviles para Comunidades Rurales",
    descripcion: "Implementación de 40 unidades médicas móviles para brindar atención primaria en zonas alejadas del país.",
    imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    categoria: "Salud",
    creadoEn: new Date("2024-01-10"),
  },
];

export default function ProjectsGrid() {
  return (
    <section style={{ backgroundColor: "#EFF3F8" }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-2">Lo que hacemos</p>
            <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold">
              Proyectos Destacados
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold rounded-full" />
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-teal transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
