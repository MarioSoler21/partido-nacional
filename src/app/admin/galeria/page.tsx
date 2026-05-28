"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2 } from "lucide-react";

interface Foto {
  id: number;
  url: string;
  album: string;
  titulo: string | null;
  orden: number;
}

export default function AdminGaleriaPage() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [albums, setAlbums] = useState<string[]>([]);
  const [activeAlbum, setActiveAlbum] = useState<string>("all");
  const [newAlbum, setNewAlbum] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFotos();
  }, []);

  async function fetchFotos() {
    try {
      const res = await fetch("/api/admin/galeria");
      const data = await res.json();
      setFotos(data);
      const albumSet = new Set<string>();
      data.forEach((f: Foto) => albumSet.add(f.album));
      const uniqueAlbums = Array.from(albumSet);
      setAlbums(uniqueAlbums);
    } catch {
      setFotos([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(files: FileList, album: string) {
    if (!album) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        const ext = file.name.split(".").pop();
        const filename = `galeria/${album}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, bucket: "media", contentType: file.type }),
        });
        const { signedUrl, publicUrl } = await res.json();
        await fetch(signedUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
        await fetch("/api/admin/galeria", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: publicUrl, album }),
        });
      } catch {
        // continue
      }
    }
    await fetchFotos();
    setUploading(false);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/galeria/${id}`, { method: "DELETE" });
    setFotos((prev) => prev.filter((f) => f.id !== id));
  }

  const displayFotos = activeAlbum === "all"
    ? fotos
    : fotos.filter((f) => f.album === activeAlbum);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-text-dark">Galería</h1>
        <p className="text-gray-500 text-sm mt-1">{fotos.length} fotos en {albums.length} álbumes</p>
      </div>

      {/* New album + upload */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="font-semibold text-text-dark mb-4">Subir Fotos</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Álbum</label>
            <div className="flex gap-2">
              <select
                value={activeAlbum === "all" ? "" : activeAlbum}
                onChange={(e) => setActiveAlbum(e.target.value || "all")}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
              >
                <option value="">Seleccionar álbum existente</option>
                {albums.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="text-gray-400 text-sm self-center">o</span>
              <input
                value={newAlbum}
                onChange={(e) => setNewAlbum(e.target.value)}
                placeholder="Nuevo álbum..."
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary w-40"
              />
            </div>
          </div>
          <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${uploading ? "bg-gray-100 text-gray-400" : "bg-primary text-white hover:bg-teal"}`}>
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Subiendo..." : "Subir Fotos"}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const album = newAlbum || (activeAlbum !== "all" ? activeAlbum : "");
                if (e.target.files && album) handleUpload(e.target.files, album);
              }}
            />
          </label>
        </div>
      </div>

      {/* Album filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...albums].map((album) => (
          <button
            key={album}
            onClick={() => setActiveAlbum(album)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeAlbum === album ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {album === "all" ? "Todos" : album}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayFotos.map((foto) => (
            <div key={foto.id} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              <Image src={foto.url} alt="" fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <button
                onClick={() => handleDelete(foto.id)}
                className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 size={12} />
              </button>
              <p className="absolute bottom-1 left-1 right-1 text-white text-[10px] bg-black/50 rounded px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {foto.album}
              </p>
            </div>
          ))}
          {displayFotos.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              No hay fotos. Sube algunas usando el panel superior.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
