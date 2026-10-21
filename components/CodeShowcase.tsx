"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleCheck, FaCodeBranch } from "react-icons/fa6";
import { HERO_TAB_DATA, type HeroTabId } from "@/lib/data";
import { escapeHtml } from "@/lib/html";
import type { HeroProfile } from "@/lib/types";

const TABS: { id: HeroTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "stack", label: "Tech Stack" },
  { id: "arch", label: "Architecture" },
];

export default function CodeShowcase({ profile }: { profile: HeroProfile }) {
  const [tab, setTab] = useState<HeroTabId>("overview");

  // The template is authored here, but the values substituted into it come
  // from the GitHub API. Escape the values only — escaping the finished
  // markup would break its own <span> tags.
  const html = HERO_TAB_DATA[tab].__html
    .replace("NAME_PLACEHOLDER", escapeHtml(profile.name))
    .replace("ROLE_PLACEHOLDER", escapeHtml(profile.role))
    .replace("LOCATION_PLACEHOLDER", escapeHtml(profile.location));

  return (
    <section id="hero-preview" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass-panel overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl"
      >
        {/* Tab Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/90 px-5 py-3.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-slate-400">DeveloperProfile.ts</span>
          </div>
          <div className="flex space-x-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={
                  tab === t.id
                    ? "rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-400"
                    : "rounded-lg px-3 py-1.5 font-mono text-xs text-slate-400 hover:text-white"
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Body Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="min-h-[220px] overflow-x-auto p-6 font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </AnimatePresence>

        {/* Tab Footer */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/70 px-5 py-3 font-mono text-xs text-slate-400">
          <span>
            <FaCodeBranch className="mr-1.5 text-cyan-400" />
            {" main*"}
          </span>
          <span className="text-emerald-400">
            <FaCircleCheck className="mr-1" />
            {" Tests Passing"}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
