"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Loader2, Wand2, Check, AlertCircle } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { ParsedContent } from "@/lib/anthropic";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

const CATEGORIAS = ["Infraestructura", "Educación", "Salud", "Ambiente", "Social", "Política", "Economía"];

export default function QuickContentForm() {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [parsed, setParsed] = useState<ParsedContent | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Editable form state after parsing
  const [form, setForm] = useState<Partial<ParsedContent> & { publicado: boolean }>({ publicado: false });

  async function handleParse() {
    if (!rawText.trim()) return;
    setParsing(true);
    setError("");
    setParsed(null);
    try {
      const res = await fetch("/api/admin/parse-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });
      if (!res.ok) throw new Error("Error en la API");
      const data: ParsedContent = await res.json();
      setParsed(data);
      setForm({ ...data, publicado: false });
    } catch {
      setError("Error al procesar el texto. Verifica tu ANTHROPIC_API_KEY.");
    } finally {
      setParsing(false);
    }
  }

  async function handlePublish() {
    if (!parsed) return;
    setSaving(true);
    try {
      const endpoint = form.tipo === "proyecto" ? "/api/admin/proyectos" : "/api/admin/noticias";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug: slugify(form.titulo ?? ""),
          imagen: "",
          galeria: [],
          publicado: form.publicado,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setTimeout(() => {
        router.push(form.tipo === "proyecto" ? "/admin/proyectos" : "/admin/noticias");
      }, 1500);
    } catch {
      setError("Error al guardar. Verifica la conexión con Supabase.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Input area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Pega aquí tu texto
        </label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono"
          placeholder={`Ejemplo:\nProyecto: Construcción de parque en Tegucigalpa. Categoría: Social. Descripción: Se inauguró el parque central...\n\nO pega directamente una publicación de Facebook/Instagram.`}
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">{rawText.length} caracteres</p>
          <button
            onClick={handleParse}
            disabled={parsing || !rawText.trim()}
            className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {parsing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
            {parsing ? "Procesando..." : "Procesar con IA"}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-xl px-4 py-3 text-sm">
          <Check size={16} />
          ¡Contenido publicado exitosamente! Redirigiendo...
        </div>
      )}

      {/* Parsed result form */}
      {parsed && !success && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-xl px-3 py-2 text-sm w-fit">
            <Check size={14} />
            IA procesó el texto correctamente — revisa y ajusta antes de publicar
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tipo</label>
            <div className="flex gap-3">
              {["noticia", "proyecto"].map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, tipo: tipo as "noticia" | "proyecto" }))}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${form.tipo === tipo ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título</label>
            <input
              value={form.titulo ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-gray-400 mt-1">Slug: /{slugify(form.titulo ?? "")}</p>
          </div>

          {/* Resumen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {form.tipo === "proyecto" ? "Descripción" : "Resumen"}
            </label>
            <textarea
              value={form.resumen ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, resumen: e.target.value }))}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</label>
            <select
              value={form.categoria ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags sugeridos</label>
            <div className="flex flex-wrap gap-2">
              {(form.tags ?? []).map((tag) => (
                <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Cuerpo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenido</label>
            <RichTextEditor
              value={form.cuerpo ?? ""}
              onChange={(val) => setForm((f) => ({ ...f, cuerpo: val }))}
            />
          </div>

          {/* Publicado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="qc-publicado"
              checked={form.publicado}
              onChange={(e) => setForm((f) => ({ ...f, publicado: e.target.checked }))}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="qc-publicado" className="text-sm font-medium text-gray-700">
              Publicar inmediatamente
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center gap-2 bg-green-cta text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-accent transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {saving ? "Publicando..." : "Publicar Contenido"}
            </button>
            <button
              onClick={() => setParsed(null)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50"
            >
              Descartar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
