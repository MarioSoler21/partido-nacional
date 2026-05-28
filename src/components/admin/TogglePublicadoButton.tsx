"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TogglePublicadoButtonProps {
  id: number;
  publicado: boolean;
  onToggle: (id: number, publicado: boolean) => Promise<void>;
}

export default function TogglePublicadoButton({
  id,
  publicado,
  onToggle,
}: TogglePublicadoButtonProps) {
  const [current, setCurrent] = useState(publicado);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const next = !current;
    setCurrent(next);
    try {
      await onToggle(id, next);
    } catch {
      setCurrent(!next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        current
          ? "bg-green-50 text-green-700 hover:bg-green-100"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {current ? <Eye size={11} /> : <EyeOff size={11} />}
      {current ? "Publicado" : "Borrador"}
    </button>
  );
}
