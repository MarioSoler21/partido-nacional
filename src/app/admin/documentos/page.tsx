"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, FileText, Loader2, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Documento {
  id: number;
  nombre: string;
  url: string;
  categoria: string;
  creadoEn: string;
}

const CATEGORIAS = ["Presupuesto", "Informes", "Actas", "Otro"];

export default function AdminDocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocumentos();
  }, []);

  async function fetchDocumentos() {
    try {
      const res = await fetch("/api/admin/documentos");
      setDocumentos(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(file: File) {
    if (!nombre.trim()) {
      alert("Por favor ingresa un nombre para el documento.");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filename = `documentos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, bucket: "documentos", contentType: file.type }),
      });
      const { signedUrl, publicUrl } = await res.json();
      await fetch(signedUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      await fetch("/api/admin/documentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, url: publicUrl, categoria }),
      });
      setNombre("");
      await fetchDocumentos();
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/documentos/${id}`, { method: "DELETE" });
    setDocumentos((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Documentos</h1>
        <p className="text-gray-500 text-sm mt-1">{documentos.length} documentos subidos</p>
      </div>

      {/* Upload form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="font-semibold text-text-dark mb-4">Subir Nuevo Documento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Nombre del documento *</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Informe Anual 2024"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
            >
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${uploading ? "bg-gray-100 text-gray-400" : "bg-primary text-white hover:bg-teal"}`}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Subiendo..." : "Seleccionar PDF"}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="hidden"
            disabled={uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
          />
        </label>
      </div>

      {/* Documents list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : documentos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No hay documentos. Sube el primero.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Nombre</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Categoría</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Fecha</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <FileText size={14} className="text-red-500" />
                      </div>
                      <span className="font-medium text-text-dark">{doc.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{doc.categoria}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">{formatDate(doc.creadoEn)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a href={doc.url} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors">
                        <Download size={16} />
                      </a>
                      <button onClick={() => handleDelete(doc.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
