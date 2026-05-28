import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";
import PhotoGallery from "@/components/shared/PhotoGallery";

const mockProjects: Record<string, {
  id: number; slug: string; titulo: string; descripcion: string;
  cuerpo: string; imagen: string; galeria: string[]; categoria: string;
  videoUrl?: string | null; creadoEn: Date;
}> = {
  "construccion-parque-central": {
    id: 1,
    slug: "construccion-parque-central",
    titulo: "Construcción del Parque Central de Tegucigalpa",
    descripcion: "Renovación completa del parque central.",
    cuerpo: `<p>El proyecto de renovación del Parque Central de Tegucigalpa representa una de las inversiones más importantes en infraestructura urbana de los últimos años. Con una inversión de 50 millones de lempiras, este proyecto transformará el corazón de la capital hondureña.</p>
<p>Las obras incluyen la renovación completa de las áreas verdes, instalación de iluminación LED de última tecnología, nuevas fuentes ornamentales, áreas de juego para niños, y espacios de recreación para toda la familia.</p>
<h2>Beneficios del Proyecto</h2>
<p>Más de 200,000 ciudadanos se beneficiarán directamente de esta renovación, que incluye nuevas zonas de descanso, cafeterías al aire libre y espacios culturales.</p>`,
    imagen: "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=70",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=70",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=70",
    ],
    categoria: "Infraestructura",
    videoUrl: null,
    creadoEn: new Date("2024-03-15"),
  },
};

async function getProject(slug: string) {
  try {
    return await prisma.proyecto.findUnique({ where: { slug, publicado: true } });
  } catch {
    return mockProjects[slug] ?? null;
  }
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <article>
      {/* Full-width hero image */}
      <div className="relative h-[50vh] min-h-[320px] bg-gray-900">
        <Image
          src={project.imagen || "/placeholder-project.jpg"}
          alt={project.titulo}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {project.categoria}
          </span>
          <h1 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            {project.titulo}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link + meta */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-teal"
          >
            <ArrowLeft size={16} /> Volver a Proyectos
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(project.creadoEn)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          className="tiptap-content prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: project.cuerpo }}
        />

        {/* Video embed */}
        {project.videoUrl && (
          <div className="mt-10 aspect-video">
            <iframe
              src={project.videoUrl.replace("watch?v=", "embed/")}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        )}

        {/* Gallery */}
        {project.galeria && project.galeria.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-text-dark mb-6">
              Galería del Proyecto
            </h2>
            <PhotoGallery images={project.galeria} />
          </div>
        )}
      </div>
    </article>
  );
}
