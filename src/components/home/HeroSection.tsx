"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay } },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/publico.jpg')" }}
      />
      {/* Dark blue overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(0,21,64,0.88) 0%, rgba(0,53,128,0.82) 50%, rgba(0,105,148,0.75) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn(0)}
        >
          <motion.img
            src="/PNHBLANCO.png"
            alt="Partido Nacional de Honduras"
            className="h-32 md:h-44 w-auto object-contain drop-shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-serif text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.25)}
        >
          Con Dios, por la Patria,
          <span className="block text-gold-light">hacia la Libertad</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.45)}
        >
          Construyendo un Honduras próspero, seguro y libre para todas las familias hondureñas.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.6)}
        >
          <Link
            href="/partido"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#003580" }}
          >
            Conoce al Partido
          </Link>
          <Link
            href="/proyectos"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white border-2 border-white/60 backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Ver Proyectos
          </Link>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.9)}
        >
          <div className="h-px w-16 bg-gold/40" />
          <div className="w-2 h-2 rounded-full bg-gold/60" />
          <div className="h-px w-16 bg-gold/40" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,53,128,0.3))" }}
      />
    </section>
  );
}
