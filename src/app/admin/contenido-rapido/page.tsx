import QuickContentForm from "@/components/admin/QuickContentForm";

export default function ContenidoRapidoPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Contenido Rápido con IA</h1>
        <p className="text-gray-500 text-sm mt-1">
          Pega texto de redes sociales o comunicados y la IA lo convierte automáticamente
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-gradient-to-r from-primary to-teal text-white rounded-2xl p-5 mb-8">
        <h3 className="font-semibold mb-1">¿Cómo funciona?</h3>
        <ol className="text-sm text-blue-100 space-y-1 list-decimal ml-4">
          <li>Pega el texto de una publicación de Facebook, Instagram, Twitter o un comunicado de prensa</li>
          <li>Haz clic en <strong>&ldquo;Procesar con IA&rdquo;</strong></li>
          <li>La IA detecta si es una noticia o proyecto y llena automáticamente el formulario</li>
          <li>Revisa los datos, edita si es necesario, y publica</li>
        </ol>
      </div>

      <QuickContentForm />
    </div>
  );
}
