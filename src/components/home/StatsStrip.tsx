"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Shield, MapPin, Users, Star } from "lucide-react";

const stats = [
  { icon: Star,   end: 130, suffix: "+", label: "Años de Historia",      color: "#C9A84C" },
  { icon: MapPin, end: 298, suffix: "",  label: "Municipios en Honduras", color: "#C9A84C" },
  { icon: Users,  end: 128, suffix: "",  label: "Diputados Nacionales",   color: "#C9A84C" },
  { icon: Shield, end: 15,  suffix: "",  label: "Departamentos",          color: "#C9A84C" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-primary py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-2">
            Partido Nacional de Honduras
          </p>
          <h2 className="text-white font-serif text-3xl font-bold">
            Nuestra Presencia Nacional
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stats.map(({ icon: Icon, end, suffix, label, color }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-default"
            >
              <div className="flex justify-center mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
              </div>
              <p className="text-gold text-3xl font-bold font-serif mb-1">
                {inView ? (
                  <CountUp
                    start={0}
                    end={end}
                    duration={2.2}
                    suffix={suffix}
                    useEasing
                    easingFn={(t, b, c, d) => {
                      t /= d;
                      return c * t * t * t + b;
                    }}
                  />
                ) : (
                  `0${suffix}`
                )}
              </p>
              <p className="text-blue-100 text-sm">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
