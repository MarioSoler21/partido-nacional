"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

export default function FileUpload({
  value,
  onChange,
  bucket = "media",
  folder = "uploads",
  label = "Subir imagen",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const ext = file.name.split(".").pop();
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, bucket, contentType: file.type }),
      });
      const { signedUrl, publicUrl } = await res.json();
      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      onChange(publicUrl);
    } catch {
      setError("Error al subir el archivo. Intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50 group">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer disabled:opacity-60"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm">Subiendo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-gray-400">PNG, JPG, WebP — máx 5MB</span>
            </div>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
