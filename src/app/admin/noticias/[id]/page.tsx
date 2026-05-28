import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import NoticiaForm from "@/components/admin/NoticiaForm";
import { updateNoticia } from "@/actions/noticias";

export default async function EditNoticiaPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  let noticia;
  try {
    noticia = await prisma.noticia.findUnique({ where: { id } });
  } catch {
    return <div className="text-red-500 p-8">Error al cargar la noticia. Configura Supabase primero.</div>;
  }
  if (!noticia) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Editar Noticia</h1>
        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{noticia.titulo}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <NoticiaForm
          defaultValues={{ ...noticia, tags: noticia.tags.join(", "), id }}
          onSubmit={async (data) => {
            "use server";
            await updateNoticia(id, data);
          }}
          submitLabel="Guardar Cambios"
        />
      </div>
    </div>
  );
}
