import { Shield, MapPin, Users, Star } from "lucide-react";

const stats = [
  { icon: Star, value: "130+", label: "Años de Historia", color: "#C9A84C" },
  { icon: MapPin, value: "298", label: "Municipios en Honduras", color: "#C9A84C" },
  { icon: Users, value: "128", label: "Diputados Nacionales", color: "#C9A84C" },
  { icon: Shield, value: "15", label: "Departamentos", color: "#C9A84C" },
];

export default function StatsStrip() {
  return (
    <section className="bg-primary py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-2">
            Partido Nacional de Honduras
          </p>
          <h2 className="text-white font-serif text-3xl font-bold">
            Nuestra Presencia Nacional
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-center mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(201, 168, 76, 0.15)" }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
              </div>
              <p className="text-gold text-3xl font-bold font-serif mb-1">{value}</p>
              <p className="text-blue-100 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
