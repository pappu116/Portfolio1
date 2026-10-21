"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub, FaXmark } from "react-icons/fa6";
import Icon from "@/components/IconMap";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import type { ProjectCard } from "@/lib/types";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "saas", label: "SaaS" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "ml", label: "Machine Learning" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "webapp", label: "Web Apps" },
];

export default function Projects({ projects }: { projects: ProjectCard[] }) {
  const builtIn = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["all", ...FILTERS.slice(1).map((f) => f.id)].filter(
      (id) => id === "all" || set.has(id)
    );
  }, [projects]);

  const [category, setCategory] = useState<string>("all");
  const [openProject, setOpenProject] = useState<ProjectCard | null>(null);

  const filtered = category === "all" ? projects : projects.filter((p) => p.category === category);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <h2 className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Portfolio Showcase
          </h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl">Featured Projects</p>
        </div>
        {/* Project Filter */}
        <div className="mt-6 flex flex-wrap gap-2 md:mt-0">
          {builtIn.map((id) => {
            const label = FILTERS.find((f) => f.id === id)?.label || id.toUpperCase();
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={
                  active
                    ? "rounded-lg border border-cyan-500 bg-cyan-500/20 px-4 py-2 font-mono text-xs text-cyan-300"
                    : "glass-card rounded-lg px-4 py-2 font-mono text-xs text-slate-400 hover:text-white"
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards Grid */}
      <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              layout
              key={project.github + project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 hover:border-cyan-500/40"
            >
              <div>
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br p-6 transition-opacity group-hover:opacity-100 opacity-80 ${project.accent}`}
                >
                  <Icon
                    iconKey={project.iconKey}
                    className="text-6xl text-white/30 transition-transform duration-500 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <span className="absolute top-4 left-4 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 font-mono text-xs text-cyan-300 uppercase">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-4 p-6">
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setOpenProject(project)}
                  className="flex items-center space-x-1.5 font-mono text-xs font-bold text-cyan-400 hover:text-white"
                >
                  <span>Details &amp; Architecture</span>
                  <FaArrowRight className="text-xs" />
                </button>
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white"
                    aria-label={`${project.title} source code`}
                  >
                    <FaGithub className="text-lg" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-cyan-400"
                      aria-label={`${project.title} live demo`}
                    >
                      <FaArrowUpRightFromSquare className="text-lg" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* PROJECT DETAILS MODAL */}
      <Dialog open={openProject !== null} onOpenChange={(v) => !v && setOpenProject(null)}>
        {openProject && (
          <DialogContent className="glass-panel w-full max-w-3xl overflow-hidden rounded-3xl border border-cyan-500/25 bg-slate-950/90 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
              <div className="flex items-center space-x-3">
                <span className="inline-block h-3 w-3 rounded-full bg-cyan-400" />
                <h3 className="font-mono text-lg font-bold text-white">{openProject.title}</h3>
              </div>
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
                  aria-label="Close"
                >
                  <FaXmark className="text-xl" />
                </button>
              </DialogClose>
            </div>

            {/* Modal Content */}
            <div className="max-h-[80vh] space-y-6 overflow-y-auto p-6 sm:p-8">
              <div
                className={`relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 sm:h-72 bg-gradient-to-br ${openProject.accent}`}
              >
                <Icon
                  iconKey={openProject.iconKey}
                  className="text-8xl text-white/40"
                />
                <div className="absolute inset-0 bg-slate-950/30" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span>
                  stars: <span className="text-cyan-300">{openProject.stars}</span>
                </span>
                {openProject.language && (
                  <span>
                    language: <span className="text-cyan-300">{openProject.language}</span>
                  </span>
                )}
                <span>
                  category: <span className="text-cyan-300">{openProject.category}</span>
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
                  Overview &amp; Key Architecture
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">{openProject.fullDescription}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="mb-1 font-mono text-xs text-slate-400">TECH STACK</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {openProject.tech.length > 0 ? (
                      openProject.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-slate-800 px-2.5 py-1 font-mono text-xs text-cyan-300"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-slate-500">
                        No explicit languages/topics detected — see repo.
                      </span>
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="mb-1 font-mono text-xs text-slate-400">REPOSITORY</div>
                  <p className="mt-2 font-mono text-xs break-all text-slate-300">
                    {openProject.github}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 border-t border-slate-800 pt-4">
                <a
                  href={openProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card flex items-center space-x-2 rounded-xl border border-slate-700 px-5 py-2.5 font-mono text-xs font-bold text-slate-200 hover:text-white"
                >
                  <FaGithub />
                  <span>Source Code</span>
                </a>
                <a
                  href={openProject.demo || openProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-btn flex items-center space-x-2 rounded-xl border border-cyan-500/50 bg-slate-900 px-5 py-2.5 font-mono text-xs font-bold text-white"
                >
                  <FaArrowUpRightFromSquare className="text-cyan-400" />
                  <span>{openProject.demo ? "Live Demo" : "View on GitHub"}</span>
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
