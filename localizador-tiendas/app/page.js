"use client";
import Mapa from "@/componentes/Mapa";
import { motion } from "framer-motion";

export default function Home() {
  return (
<main className="flex flex-col items-center justify-center min-h-screen p-6" style={{ background: "linear-gradient(to right, #0000FF, #00FF00)" }}>      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl bg-lime-500 font-bold text-center mb-4">🗺 Localizador de Tiendas</h1>
        <p className="text-center text-gray-600 mb-6">
          Encuentra las tiendas cercanas en La Maná, Ecuador.
        </p>
        <Mapa />
      </motion.div>
    </main>
  );
}
