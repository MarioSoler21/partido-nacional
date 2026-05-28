import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatDateShort, truncate } from "@/lib/utils";

interface NewsCardProps {
  slug: string;
  titulo: string;
  resumen: string;
  imagen: string;
  creadoEn: Date | string;
  tags?: string[];
}

export default function NewsCard({
  slug,
  titulo,
  resumen,
  imagen,
  creadoEn,
  tags,
}: NewsCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg news-card border border-gray-100 group">
      {/* Image with slight upward overlap effect */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <Image
          src={imagen || "/placeholder-news.jpg"}
          alt={titulo}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5 -mt-4 relative">
        {/* White card body */}
        <div className="bg-white rounded-xl pt-4">
          <div className="flex items-center gap-2 text-green-accent text-xs font-medium mb-3">
            <Calendar size={12} />
            <span>{formatDateShort(creadoEn)}</span>
            {tags && tags[0] && (
              <>
                <span className="text-gray-300">·</span>
                <span className="bg-blue-50 text-primary px-2 py-0.5 rounded-full text-xs">
                  {tags[0]}
                </span>
              </>
            )}
          </div>

          <h3 className="font-serif font-semibold text-text-dark text-base leading-snug mb-2">
            {truncate(titulo, 72)}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {resumen}
          </p>

          <Link
            href={`/noticias/${slug}`}
            className="inline-flex items-center gap-1 text-green-cta font-semibold text-sm hover:gap-2 transition-all"
          >
            Leer Más
            <span className="text-green-cta">{">>"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
