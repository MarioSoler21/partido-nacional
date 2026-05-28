"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FileUpload from "./FileUpload";
import { slugify } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

interface NoticiaFormData {
  titulo: string;
  resumen: string;
  cuerpo: string;
  imagen: string;
  tags: string;
  publicado: boolean;
}

interface NoticiaFormProps {
  defaultValues?: Partial<NoticiaFormData> & { id?: number };
  onSubmit: (data: Omit<NoticiaFormData, "tags"> & { tags: string[] }) => Promise<void>;
  submitLabel?: string;
}

export default function NoticiaForm({ defaultValues, onSubmit, submitLabel = "Guardar" }: NoticiaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<NoticiaFormData>({
    titulo: defaultValues?.titulo ?? "",
    resumen: defaultValues?.resumen ?? "",
    cuerpo: defaultValues?.cuerpo ?? "",
    imagen: defaultValues?.imagen ?? "",
    tags: defaultValues?.tags ?? "",
    publicado: defaultValues?.publicado ?? false,
  });

  const slug = slugify(form.titulo);

  function handleChange(field: keyof NoticiaFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      router.push("/admin/noticias");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
          <input
            value={form.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Título de la noticia"
          />
          {slug && <p className="text-xs text-gray-400 mt-1">Slug: /{slug}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
          <input
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Política, Economía, Social"
          />
          <p className="text-xs text-gray-400 mt-1">Separados por coma</p>
        </div>
      </div>

      {/* Resumen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Resumen *</label>
        <textarea
          value={form.resumen}
          onChange={(e) => handleChange("resumen", e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          placeholder="Breve descripción de la noticia (1-2 oraciones)"
        />
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Imagen Principal</label>
        <FileUpload
          value={form.imagen}
          onChange={(url) => handleChange("imagen", url)}
          folder="noticias"
          label="Subir imagen de la noticia"
        />
      </div>

      {/* Cuerpo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenido *</label>
        <RichTextEditor
          value={form.cuerpo}
          onChange={(val) => handleChange("cuerpo", val)}
          placeholder="Escribe el contenido completo de la noticia..."
        />
      </div>

      {/* Publicado toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="publicado"
          checked={form.publicado}
          onChange={(e) => handleChange("publicado", e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="publicado" className="text-sm font-medium text-gray-700">
          Publicar noticia (visible en el sitio)
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/noticias")}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
