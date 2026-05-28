"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => Promise<void>;
  label?: string;
}

export default function DeleteButton({ id, onDelete, label }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await onDelete(id);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : "Sí"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
      title={label ?? "Eliminar"}
    >
      <Trash2 size={16} />
    </button>
  );
}
