"use client";

import { motion } from "framer-motion";
import { FaCloudArrowUp, FaLayerGroup, FaServer } from "react-icons/fa6";

const CARDS = [
  {
    icon: <FaLayerGroup />,
    color: "text-cyan-400",
    iconBox: "bg-cyan-500/10 border-cyan-500/30 group-hover:bg-cyan-500/20",
    title: "Modern Frontend",
    text: "Crafting reactive web apps using React, Next.js, and TypeScript paired with atomic CSS architecture for smooth 60fps user interactions.",
  },
  {
    icon: <FaServer />,
    color: "text-violet-400",
    iconBox: "bg-violet-500/10 border-violet-500/30 group-hover:bg-violet-500/20",
    title: "Robust Backend",
    text: "Designing RESTful & GraphQL APIs, microservices with Node.js, Express, Python, and robust database layers with PostgreSQL and Redis cache strategies.",
  },
  {
    icon: <FaCloudArrowUp />,
    color: "text-pink-400",
    iconBox: "bg-pink-500/10 border-pink-500/30 group-hover:bg-pink-500/20",
    title: "Cloud & DevOps",
    text: "Containerizing microservices with Docker, orchestration via Kubernetes, and continuous delivery deployment pipelines across AWS and Vercel.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase"
        >
          Architectural Philosophy
        </motion.h2>
        <p className="text-3xl font-extrabold text-white sm:text-4xl">
          Engineered for Scalability &amp; Speed
        </p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass-card group relative overflow-hidden rounded-2xl p-8"
          >
            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl border text-2xl transition-all group-hover:scale-110 ${card.iconBox} ${card.color}`}
            >
              {card.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{card.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
