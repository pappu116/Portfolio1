"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/IconMap";
import { SKILL_CATEGORIES, type Skill } from "@/lib/data";

export default function Skills({ skills }: { skills: Skill[] }) {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
          Technical Expertise
        </h2>
        <p className="text-3xl font-extrabold text-white sm:text-4xl">Skills &amp; Tech Stack</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {SKILL_CATEGORIES.map((cat) => {
          const active = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={
                active
                  ? "relative rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                  : "glass-card rounded-full px-6 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-500/40 hover:text-white"
              }
            >
              {active && (
                <motion.span
                  layoutId="skill-filter-active"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Skill Cards Grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="glass-card group relative rounded-2xl border border-slate-800 p-6 transition-all hover:border-cyan-500/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-lg"
                    style={{ color: skill.color }}
                  >
                    <Icon iconKey={skill.icon} />
                  </div>
                  <span className="text-base font-bold text-white">{skill.name}</span>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">{skill.level}%</span>
              </div>

              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, #00f0ff)`,
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-slate-800 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
