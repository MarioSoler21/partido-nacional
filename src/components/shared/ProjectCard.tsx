import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Infraestructura: "bg-blue-100 text-blue-800",
  Educación: "bg-purple-100 text-purple-800",
  Salud: "bg-red-100 text-red-800",
  Ambiente: "bg-blue-100 text-blue-800",
  Social: "bg-amber-100 text-amber-800",
};

interface ProjectCardProps {
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  creadoEn: Date | string;
}

export default function ProjectCard({
  slug,
  titulo,
  descripcion,
  imagen,
  categoria,
  creadoEn,
}: ProjectCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg news-card border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imagen || "/placeholder-project.jpg"}
          alt={titulo}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              categoryColors[categoria] ?? "bg-gray-100 text-gray-800"
            }`}
          >
            {categoria}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-teal text-xs mb-3">
          <Calendar size={12} />
          <span>{formatDateShort(creadoEn)}</span>
        </div>
        <h3 className="font-serif font-semibold text-text-dark text-base leading-snug mb-2 line-clamp-2">
          {titulo}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {descripcion}
        </p>
        <Link
          href={`/proyectos/${slug}`}
          className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
        >
          Ver Proyecto
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
