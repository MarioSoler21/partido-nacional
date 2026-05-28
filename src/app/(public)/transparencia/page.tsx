import { prisma } from "@/lib/prisma";
import PageHero from "@/components/shared/PageHero";
import { FileText, Download, Folder } from "lucide-react";
import { formatDate } from "@/lib/utils";

const mockDocs = [
  { id: 1, nombre: "Presupuesto Anual 2024", url: "#", categoria: "Presupuesto", creadoEn: new Date("2024-01-15") },
  { id: 2, nombre: "Informe de Gestión Q1 2024", url: "#", categoria: "Informes", creadoEn: new Date("2024-04-10") },
  { id: 3, nombre: "Actas Asamblea Nacional 2024", url: "#", categoria: "Actas", creadoEn: new Date("2024-03-20") },
  { id: 4, nombre: "Declaración Patrimonial 2023", url: "#", categoria: "Presupuesto", creadoEn: new Date("2023-12-30") },
  { id: 5, nombre: "Informe de Auditoría 2023", url: "#", categoria: "Informes", creadoEn: new Date("2024-02-05") },
  { id: 6, nombre: "Actas Directiva Nacional - Febrero 2024", url: "#", categoria: "Actas", creadoEn: new Date("2024-02-28") },
];

const CATEGORIAS = ["Todos", "Presupuesto", "Informes", "Actas"];

const catColors: Record<string, string> = {
  Presupuesto: "bg-blue-50 text-blue-700",
  Informes: "bg-purple-50 text-purple-700",
  Actas: "bg-amber-50 text-amber-700",
};

async function getDocumentos() {
  try {
    return await prisma.documento.findMany({ orderBy: { creadoEn: "desc" } });
  } catch {
    return mockDocs;
  }
}

export default async function TransparenciaPage() {
  const documentos = await getDocumentos();

  const grouped = CATEGORIAS.slice(1).reduce<Record<string, typeof mockDocs>>((acc, cat) => {
    acc[cat] = documentos.filter((d) => d.categoria === cat);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        title="Transparencia"
        subtitle="Accede a nuestros documentos públicos, informes y actas oficiales"
      />
      <section className="py-16 bg-section-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped).map(([categoria, docs]) => (
            <div key={categoria} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Folder size={20} className="text-gold" />
                <h2 className="font-serif text-2xl font-bold text-text-dark">{categoria}</h2>
                <span className="text-sm text-gray-400">({docs.length} documentos)</span>
              </div>
              <div className="space-y-3">
                {docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                        <FileText size={18} className="text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-text-dark text-sm">{doc.nombre}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[doc.categoria] ?? "bg-gray-100 text-gray-600"}`}>
                            {doc.categoria}
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(doc.creadoEn)}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-teal transition-colors"
                    >
                      <Download size={14} />
                      Descargar
                    </a>
                  </div>
                ))}
                {docs.length === 0 && (
                  <p className="text-gray-400 text-sm py-4">No hay documentos en esta categoría.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
