import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import TogglePublicadoButton from "@/components/admin/TogglePublicadoButton";
import { deleteNoticia, toggleNoticiaPublicado } from "@/actions/noticias";

async function getNoticias() {
  try {
    return await prisma.noticia.findMany({ orderBy: { creadoEn: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminNoticiasPage() {
  const noticias = await getNoticias();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-dark">Noticias</h1>
          <p className="text-gray-500 text-sm mt-1">{noticias.length} noticias registradas</p>
        </div>
        <Link
          href="/admin/noticias/nueva"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal transition-colors"
        >
          <Plus size={16} />
          Nueva Noticia
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {noticias.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No hay noticias</p>
            <Link href="/admin/noticias/nueva" className="text-primary font-medium hover:underline">
              Crear la primera noticia →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Título</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Tags</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Fecha</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Estado</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((noticia) => (
                <tr key={noticia.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-text-dark line-clamp-1">{noticia.titulo}</p>
                    <p className="text-gray-400 text-xs mt-0.5">/{noticia.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {noticia.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                    {formatDateShort(noticia.creadoEn)}
                  </td>
                  <td className="px-5 py-4">
                    <TogglePublicadoButton
                      id={noticia.id}
                      publicado={noticia.publicado}
                      onToggle={toggleNoticiaPublicado}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/noticias/${noticia.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors"
                        title="Ver en sitio"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/noticias/${noticia.id}`}
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteButton id={noticia.id} onDelete={deleteNoticia} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
