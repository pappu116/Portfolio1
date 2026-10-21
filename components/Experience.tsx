"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaLaptopCode } from "react-icons/fa6";
import type { TimelineItem } from "@/lib/data";

const DOT: Record<TimelineItem["accent"], { border: string; text: string; shadow: string }> = {
  cyan: {
    border: "border-cyan-400",
    text: "text-cyan-400",
    shadow: "shadow-cyan-500/30",
  },
  violet: {
    border: "border-violet-400",
    text: "text-violet-400",
    shadow: "shadow-violet-500/30",
  },
  pink: {
    border: "border-pink-400",
    text: "text-pink-400",
    shadow: "shadow-pink-500/30",
  },
};

function TimelineIcon({ icon, className }: { icon: TimelineItem["icon"]; className?: string }) {
  if (icon === "briefcase") return <FaBriefcase className={className} />;
  if (icon === "code") return <FaCode className={className} />;
  return <FaLaptopCode className={className} />;
}

export default function Experience({ items }: { items: TimelineItem[] }) {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
          Career Journey
        </h2>
        <p className="text-3xl font-extrabold text-white sm:text-4xl">Experience &amp; Milestones</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
      </div>

      {/* Timeline Container */}
      <div className="relative ml-4 space-y-12 border-l-2 border-slate-800 md:ml-32">
        {items.map((item, i) => {
          const dot = DOT[item.accent];
          return (
            <motion.div
              key={`${item.title}-${item.period}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative pl-8 md:pl-10"
            >
              <div
                className={`absolute top-1.5 -left-[17px] flex h-8 w-8 items-center justify-center rounded-full border-2 bg-slate-900 transition-transform group-hover:scale-110 ${dot.border} ${dot.text} shadow-lg ${dot.shadow}`}
              >
                <TimelineIcon icon={item.icon} className="text-xs" />
              </div>
              <div className="absolute top-2 -left-32 hidden w-24 text-right md:block">
                <span className={`text-xs font-mono font-bold ${dot.text}`}>{item.period}</span>
              </div>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <span className={`${item.textColor} font-mono ${i === 0 ? "" : ""}`}>{item.period}</span>
                </div>
                <p className={`mb-4 text-sm font-semibold ${item.orgColor}`}>{item.org}</p>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded bg-slate-800 px-2.5 py-1 font-mono text-xs ${tag.text}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
