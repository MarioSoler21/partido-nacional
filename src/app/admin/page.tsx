import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Newspaper, FolderOpen, Image, FileText, Plus, TrendingUp } from "lucide-react";

async function getStats() {
  try {
    const [noticias, proyectos, fotos, documentos] = await Promise.all([
      prisma.noticia.count(),
      prisma.proyecto.count(),
      prisma.foto.count(),
      prisma.documento.count(),
    ]);
    return { noticias, proyectos, fotos, documentos };
  } catch {
    return { noticias: 0, proyectos: 0, fotos: 0, documentos: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Noticias", value: stats.noticias, icon: Newspaper, href: "/admin/noticias", color: "bg-blue-50 text-blue-600" },
    { label: "Proyectos", value: stats.proyectos, icon: FolderOpen, href: "/admin/proyectos", color: "bg-green-50 text-green-600" },
    { label: "Fotos", value: stats.fotos, icon: Image, href: "/admin/galeria", color: "bg-purple-50 text-purple-600" },
    { label: "Documentos", value: stats.documentos, icon: FileText, href: "/admin/documentos", color: "bg-amber-50 text-amber-600" },
  ];

  const quickActions = [
    { label: "Nueva Noticia", href: "/admin/noticias/nueva", icon: Plus },
    { label: "Nuevo Proyecto", href: "/admin/proyectos/nuevo", icon: Plus },
    { label: "Subir Fotos", href: "/admin/galeria", icon: Image },
    { label: "Contenido IA", href: "/admin/contenido-rapido", icon: TrendingUp },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenido al panel de administración del Partido Nacional</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <p className="text-3xl font-bold text-text-dark font-serif">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="font-serif font-semibold text-text-dark text-lg mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all text-center"
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-gradient-to-r from-primary to-teal rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <TrendingUp size={28} className="flex-shrink-0 mt-1 text-gold" />
          <div>
            <h3 className="font-serif font-bold text-lg mb-1">Función de Contenido IA</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Pega texto de redes sociales o comunicados y el sistema usará IA para crear automáticamente
              noticias y proyectos. Accede desde{" "}
              <Link href="/admin/contenido-rapido" className="text-gold font-semibold underline">
                Contenido IA
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
