import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ParsedContent {
  tipo: "noticia" | "proyecto";
  titulo: string;
  slug: string;
  resumen: string;
  categoria: string;
  tags: string[];
  cuerpo: string;
}

export async function parseQuickContent(rawText: string): Promise<ParsedContent> {
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Analiza el siguiente texto y extrae la información estructurada para el sitio web del Partido Nacional de Honduras.

Devuelve SOLO un objeto JSON válido con estos campos:
- tipo: "noticia" o "proyecto" (determina cuál es más apropiado)
- titulo: título conciso y descriptivo
- slug: versión URL-friendly del título (minúsculas, guiones, sin acentos)
- resumen: resumen de 1-2 oraciones
- categoria: una de estas opciones: "Infraestructura", "Educación", "Salud", "Ambiente", "Social", "Política", "Economía"
- tags: array de 3-5 etiquetas relevantes
- cuerpo: el texto formateado en HTML básico (párrafos con <p>)

Texto a analizar:
${rawText}

Responde ÚNICAMENTE con el JSON, sin explicaciones ni markdown.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  const cleaned = content.text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned) as ParsedContent;
}
