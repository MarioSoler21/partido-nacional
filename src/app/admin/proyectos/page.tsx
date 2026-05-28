import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import TogglePublicadoButton from "@/components/admin/TogglePublicadoButton";
import { deleteProyecto } from "@/actions/proyectos";

async function getProyectos() {
  try {
    return await prisma.proyecto.findMany({ orderBy: { creadoEn: "desc" } });
  } catch {
    return [];
  }
}

const categoryColors: Record<string, string> = {
  Infraestructura: "bg-blue-50 text-blue-700",
  Educación: "bg-purple-50 text-purple-700",
  Salud: "bg-red-50 text-red-700",
  Ambiente: "bg-green-50 text-green-700",
  Social: "bg-amber-50 text-amber-700",
};

export default async function AdminProyectosPage() {
  const proyectos = await getProyectos();

  async function toggleProyecto(id: number, publicado: boolean) {
    "use server";
    const { prisma } = await import("@/lib/prisma");
    const { revalidatePath } = await import("next/cache");
    await prisma.proyecto.update({ where: { id }, data: { publicado } });
    revalidatePath("/proyectos");
    revalidatePath("/admin/proyectos");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-dark">Proyectos</h1>
          <p className="text-gray-500 text-sm mt-1">{proyectos.length} proyectos registrados</p>
        </div>
        <Link
          href="/admin/proyectos/nuevo"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal transition-colors"
        >
          <Plus size={16} />
          Nuevo Proyecto
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {proyectos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No hay proyectos</p>
            <Link href="/admin/proyectos/nuevo" className="text-primary font-medium hover:underline">
              Crear el primer proyecto →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Título</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Categoría</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Fecha</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Estado</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-text-dark line-clamp-1">{proyecto.titulo}</p>
                    <p className="text-gray-400 text-xs mt-0.5">/{proyecto.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[proyecto.categoria] ?? "bg-gray-100 text-gray-600"}`}>
                      {proyecto.categoria}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                    {formatDateShort(proyecto.creadoEn)}
                  </td>
                  <td className="px-5 py-4">
                    <TogglePublicadoButton
                      id={proyecto.id}
                      publicado={proyecto.publicado}
                      onToggle={toggleProyecto}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/proyectos/${proyecto.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors"
                        title="Ver en sitio"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/proyectos/${proyecto.id}`}
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteButton id={proyecto.id} onDelete={deleteProyecto} />
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
