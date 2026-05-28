import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProyectoForm from "@/components/admin/ProyectoForm";
import { updateProyecto } from "@/actions/proyectos";

export default async function EditProyectoPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  let proyecto;
  try {
    proyecto = await prisma.proyecto.findUnique({ where: { id } });
  } catch {
    return <div className="text-red-500 p-8">Error al cargar el proyecto. Configura Supabase primero.</div>;
  }
  if (!proyecto) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Editar Proyecto</h1>
        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{proyecto.titulo}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <ProyectoForm
          defaultValues={{ ...proyecto, videoUrl: proyecto.videoUrl ?? "", id }}
          onSubmit={async (data) => {
            "use server";
            await updateProyecto(id, data);
          }}
          submitLabel="Guardar Cambios"
        />
      </div>
    </div>
  );
}
