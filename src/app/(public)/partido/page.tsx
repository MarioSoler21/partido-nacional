import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import { Shield, Star, Heart, Users, Target, BookOpen } from "lucide-react";

const valores = [
  { icon: Shield, titulo: "Seguridad", desc: "Garantizar la paz y seguridad de todos los hondureños." },
  { icon: Star, titulo: "Integridad", desc: "Actuar con honestidad y transparencia en cada acción." },
  { icon: Heart, titulo: "Solidaridad", desc: "Trabajar por los más vulnerables de nuestra sociedad." },
  { icon: Users, titulo: "Unidad", desc: "Construir juntos un Honduras para todos." },
  { icon: Target, titulo: "Progreso", desc: "Impulsar el desarrollo económico y social de la nación." },
  { icon: BookOpen, titulo: "Tradición", desc: "Honrar el legado histórico del nacionalismo hondureño." },
];

const estructura = [
  { cargo: "Presidencia", descripcion: "Máxima autoridad ejecutiva del partido" },
  { cargo: "Comité Central Ejecutivo", descripcion: "Órgano directivo principal" },
  { cargo: "Consejo Central", descripcion: "Órgano deliberativo nacional" },
  { cargo: "Convención Nacional", descripcion: "Máximo órgano de decisión" },
  { cargo: "Secretarías", descripcion: "Organización temática por áreas" },
  { cargo: "Organizaciones Departamentales", descripcion: "Presencia en los 18 departamentos" },
];

export default function PartidoPage() {
  return (
    <>
      <PageHero
        title="El Partido Nacional"
        subtitle="Más de 130 años sirviendo a Honduras con fe, patriotismo y compromiso"
      />

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-2">Quiénes somos</p>
              <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold mb-6">
                Nuestra Historia
              </h2>
              <div className="h-1 w-16 bg-gold rounded-full mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  El Partido Nacional de Honduras es una de las instituciones políticas más antiguas y arraigadas del país. Fundado a principios del siglo XX, ha sido protagonista fundamental en la construcción de la democracia hondureña.
                </p>
                <p>
                  Con una ideología de centro-derecha, el partido defiende los valores de la familia, la propiedad privada, la libertad individual y el desarrollo económico basado en la libre empresa.
                </p>
                <p>
                  A lo largo de su historia, el Partido Nacional ha gobernado Honduras en múltiples ocasiones, dejando un legado de obras de infraestructura, desarrollo social y apertura económica que han transformado el país.
                </p>
                <p className="font-semibold text-primary italic font-serif text-lg">
                  &ldquo;Con Dios, por la Patria, hacia la Libertad.&rdquo;
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80"
                  alt="Historia del Partido Nacional"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gold accent box */}
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl opacity-20"
                style={{ backgroundColor: "#C9A84C" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section style={{ backgroundColor: "#EFF3F8" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Lo que nos guía</p>
            <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold">
              Nuestros Valores
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map(({ icon: Icon, titulo, desc }) => (
              <div
                key={titulo}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-serif font-bold text-text-dark text-xl mb-2">{titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estructura */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Organización</p>
            <h2 className="font-serif text-text-dark text-3xl md:text-4xl font-bold">
              Estructura del Partido
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold rounded-full mx-auto" />
          </div>
          <div className="space-y-3">
            {estructura.map(({ cargo, descripcion }, i) => (
              <div
                key={cargo}
                className="flex items-center gap-4 p-5 bg-section-bg rounded-xl border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-text-dark">{cargo}</p>
                  <p className="text-sm text-gray-500">{descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
