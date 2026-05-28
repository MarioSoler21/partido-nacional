import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const mockNews: Record<string, {
  id: number; slug: string; titulo: string; resumen: string;
  cuerpo: string; imagen: string; tags: string[]; creadoEn: Date;
}> = {
  "asamblea-nacional-partido-2024": {
    id: 1,
    slug: "asamblea-nacional-partido-2024",
    titulo: "Partido Nacional celebra Asamblea Nacional con récord de participación",
    resumen: "Más de 5,000 delegados de los 18 departamentos del país se reunieron para definir la agenda política.",
    cuerpo: `<p>La Asamblea Nacional del Partido Nacional de Honduras se celebró con una participación sin precedentes. Más de 5,000 delegados de los 18 departamentos del país se reunieron en el estadio Nacional de Tegucigalpa para definir la agenda política y los lineamientos estratégicos del partido.</p>
<p>Durante el evento, se aprobaron los principales ejes programáticos que guiarán las acciones del partido en los próximos años, enfocados en seguridad, empleo, educación y desarrollo rural.</p>
<h2>Acuerdos Principales</h2>
<p>Los delegados aprobaron por unanimidad el plan de trabajo para 2025-2030, que incluye 150 proyectos de infraestructura, 200 programas sociales y la creación de 50,000 empleos directos.</p>`,
    imagen: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80",
    tags: ["Política", "Asamblea"],
    creadoEn: new Date("2024-03-18"),
  },
};

async function getNoticia(slug: string) {
  try {
    return await prisma.noticia.findUnique({ where: { slug, publicado: true } });
  } catch {
    return mockNews[slug] ?? null;
  }
}

export default async function NoticiaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const noticia = await getNoticia(params.slug);
  if (!noticia) notFound();

  return (
    <article>
      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[280px] bg-gray-900">
        <Image
          src={noticia.imagen || "/placeholder-news.jpg"}
          alt={noticia.titulo}
          fill
          className="object-cover opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-teal mb-6"
        >
          <ArrowLeft size={16} /> Volver a Noticias
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar size={14} />
            {formatDate(noticia.creadoEn)}
          </span>
          {noticia.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-primary text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-serif text-text-dark text-3xl md:text-4xl font-bold leading-tight mb-4">
          {noticia.titulo}
        </h1>

        <p className="text-gray-500 text-lg italic border-l-4 border-gold pl-4 mb-8">
          {noticia.resumen}
        </p>

        {/* Body */}
        <div
          className="tiptap-content prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: noticia.cuerpo }}
        />
      </div>
    </article>
  );
}
