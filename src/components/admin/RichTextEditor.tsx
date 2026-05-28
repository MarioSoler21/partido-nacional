"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold, Italic, List, ListOrdered, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "Escribe el contenido aquí..." }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "tiptap-content min-h-[300px] p-4 focus:outline-none text-gray-700",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external value changes into editor without triggering onChange loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "p-1.5 rounded text-sm transition-colors",
        active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border-b border-gray-200">
        <ToolbarButton title="Negrita" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton title="Cursiva" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <Italic size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton title="Título 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton title="Título 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          <Heading3 size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton title="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton title="Lista numerada" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton title="Cita" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          <Quote size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          title="Enlace"
          onClick={() => {
            const url = prompt("URL del enlace:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Imagen"
          onClick={() => {
            const url = prompt("URL de la imagen:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImageIcon size={16} />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
