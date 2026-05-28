"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FileUpload from "./FileUpload";
import { slugify } from "@/lib/utils";
import { Loader2, X } from "lucide-react";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

const CATEGORIAS = ["Infraestructura", "Educación", "Salud", "Ambiente", "Social"];

interface ProyectoFormData {
  titulo: string;
  descripcion: string;
  cuerpo: string;
  categoria: string;
  imagen: string;
  galeria: string[];
  videoUrl: string;
  publicado: boolean;
}

interface ProyectoFormProps {
  defaultValues?: Partial<ProyectoFormData> & { id?: number };
  onSubmit: (data: Omit<ProyectoFormData, "videoUrl"> & { videoUrl?: string }) => Promise<void>;
  submitLabel?: string;
}

export default function ProyectoForm({ defaultValues, onSubmit, submitLabel = "Guardar" }: ProyectoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProyectoFormData>({
    titulo: defaultValues?.titulo ?? "",
    descripcion: defaultValues?.descripcion ?? "",
    cuerpo: defaultValues?.cuerpo ?? "",
    categoria: defaultValues?.categoria ?? CATEGORIAS[0],
    imagen: defaultValues?.imagen ?? "",
    galeria: defaultValues?.galeria ?? [],
    videoUrl: defaultValues?.videoUrl ?? "",
    publicado: defaultValues?.publicado ?? false,
  });

  const slug = slugify(form.titulo);

  function handleChange(field: keyof ProyectoFormData, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addGaleria(url: string) {
    handleChange("galeria", [...form.galeria, url]);
  }

  function removeGaleria(index: number) {
    handleChange("galeria", form.galeria.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        videoUrl: form.videoUrl || undefined,
      });
      router.push("/admin/proyectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título + Categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
          <input
            value={form.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Título del proyecto"
          />
          {slug && <p className="text-xs text-gray-400 mt-1">Slug: /{slug}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría *</label>
          <select
            value={form.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Descripción corta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción Corta *</label>
        <textarea
          value={form.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          placeholder="Breve descripción del proyecto (aparece en las tarjetas)"
        />
      </div>

      {/* Imagen principal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Imagen Principal</label>
        <FileUpload
          value={form.imagen}
          onChange={(url) => handleChange("imagen", url)}
          folder="proyectos"
          label="Subir imagen del proyecto"
        />
      </div>

      {/* Cuerpo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenido Completo *</label>
        <RichTextEditor
          value={form.cuerpo}
          onChange={(val) => handleChange("cuerpo", val)}
          placeholder="Describe el proyecto en detalle..."
        />
      </div>

      {/* Galería */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Galería de Fotos ({form.galeria.length} fotos)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {form.galeria.map((url, i) => (
            <div key={i} className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeGaleria(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <FileUpload
            value=""
            onChange={addGaleria}
            folder="proyectos/galeria"
            label="+ Añadir"
          />
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          URL de Video (YouTube/Vimeo — opcional)
        </label>
        <input
          value={form.videoUrl}
          onChange={(e) => handleChange("videoUrl", e.target.value)}
          type="url"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      {/* Publicado */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="publicado"
          checked={form.publicado}
          onChange={(e) => handleChange("publicado", e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="publicado" className="text-sm font-medium text-gray-700">
          Publicar proyecto (visible en el sitio)
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
          onClick={() => router.push("/admin/proyectos")}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
