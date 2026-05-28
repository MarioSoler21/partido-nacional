"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Check } from "lucide-react";

interface ConfigItem {
  clave: string;
  valor: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const CONFIG_FIELDS: ConfigItem[] = [
  { clave: "site_title", label: "Título del Sitio", valor: "Partido Nacional de Honduras", placeholder: "Partido Nacional de Honduras" },
  { clave: "hero_headline", label: "Titular del Hero", valor: "Con Dios, por la Patria, hacia la Libertad", placeholder: "Con Dios, por la Patria, hacia la Libertad" },
  { clave: "hero_tagline", label: "Descripción del Hero", valor: "Construyendo un Honduras próspero, seguro y libre.", placeholder: "Descripción breve..." },
  { clave: "social_facebook", label: "URL de Facebook", valor: "", placeholder: "https://facebook.com/...", type: "url" },
  { clave: "social_instagram", label: "URL de Instagram", valor: "", placeholder: "https://instagram.com/...", type: "url" },
  { clave: "social_twitter", label: "URL de Twitter/X", valor: "", placeholder: "https://twitter.com/...", type: "url" },
  { clave: "social_youtube", label: "URL de YouTube", valor: "", placeholder: "https://youtube.com/...", type: "url" },
  { clave: "contact_email", label: "Email de Contacto", valor: "", placeholder: "info@partidonacional.hn", type: "email" },
  { clave: "contact_phone", label: "Teléfono", valor: "", placeholder: "+504 22XX-XXXX", type: "tel" },
];

export default function ConfiguracionPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    try {
      const res = await fetch("/api/admin/configuracion");
      const data = await res.json();
      const map: Record<string, string> = {};
      CONFIG_FIELDS.forEach((f) => { map[f.clave] = f.valor; });
      data.forEach((item: { clave: string; valor: string }) => { map[item.clave] = item.valor; });
      setValues(map);
    } catch {
      const defaults: Record<string, string> = {};
      CONFIG_FIELDS.forEach((f) => { defaults[f.clave] = f.valor; });
      setValues(defaults);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/admin/configuracion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const siteFields = CONFIG_FIELDS.slice(0, 3);
  const socialFields = CONFIG_FIELDS.slice(3, 7);
  const contactFields = CONFIG_FIELDS.slice(7);

  function renderSection(title: string, fields: ConfigItem[]) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-serif font-semibold text-text-dark text-lg mb-5">{title}</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.clave}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
              <input
                type={field.type || "text"}
                value={values[field.clave] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.clave]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-dark">Configuración</h1>
          <p className="text-gray-500 text-sm mt-1">Ajustes globales del sitio web</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-6">
        {renderSection("Contenido del Sitio", siteFields)}
        {renderSection("Redes Sociales", socialFields)}
        {renderSection("Información de Contacto", contactFields)}
      </div>
    </div>
  );
}
