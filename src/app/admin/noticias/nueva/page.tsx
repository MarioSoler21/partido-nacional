import NoticiaForm from "@/components/admin/NoticiaForm";
import { createNoticia } from "@/actions/noticias";

export default function NuevanoticiaPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Nueva Noticia</h1>
        <p className="text-gray-500 text-sm mt-1">Crea una nueva noticia para el sitio</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <NoticiaForm
          onSubmit={async (data) => {
            "use server";
            await createNoticia(data);
          }}
          submitLabel="Crear Noticia"
        />
      </div>
    </div>
  );
}
