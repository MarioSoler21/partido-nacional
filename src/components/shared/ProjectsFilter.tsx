"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProjectsFilterProps {
  categories: string[];
  active: string;
}

export default function ProjectsFilter({ categories, active }: ProjectsFilterProps) {
  const router = useRouter();

  function handleSelect(cat: string) {
    const params = cat === "Todos" ? "" : `?categoria=${encodeURIComponent(cat)}`;
    router.push(`/proyectos${params}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            active === cat
              ? "bg-primary text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
