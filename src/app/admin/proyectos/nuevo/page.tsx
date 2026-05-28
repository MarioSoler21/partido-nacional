import ProyectoForm from "@/components/admin/ProyectoForm";
import { createProyecto } from "@/actions/proyectos";

export default function NuevoProyectoPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Nuevo Proyecto</h1>
        <p className="text-gray-500 text-sm mt-1">Crea un nuevo proyecto para el sitio</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <ProyectoForm
          onSubmit={async (data) => {
            "use server";
            await createProyecto(data);
          }}
          submitLabel="Crear Proyecto"
        />
      </div>
    </div>
  );
}
