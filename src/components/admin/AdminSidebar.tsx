"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderOpen,
  Image,
  FileText,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/proyectos", label: "Proyectos", icon: FolderOpen },
  { href: "/admin/galeria", label: "Galería", icon: Image },
  { href: "/admin/documentos", label: "Documentos", icon: FileText },
  { href: "/admin/contenido-rapido", label: "Contenido IA", icon: Zap },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src="/PNH_2016_logo.svg"
            alt="Partido Nacional de Honduras"
            className="h-8 w-auto object-contain"
          />
          <div>
            <p className="font-bold text-sm text-text-dark">Panel Admin</p>
            <p className="text-xs text-gray-400">Partido Nacional</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors mb-1"
        >
          <LayoutDashboard size={16} />
          Ver Sitio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
