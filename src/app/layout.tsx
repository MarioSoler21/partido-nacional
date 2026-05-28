import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Partido Nacional de Honduras",
    template: "%s | Partido Nacional de Honduras",
  },
  description: "Con Dios, por la Patria, hacia la Libertad",
  openGraph: {
    siteName: "Partido Nacional de Honduras",
    locale: "es_HN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
