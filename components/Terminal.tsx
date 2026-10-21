"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/lib/data";
import type { HeroProfile, ProjectCard } from "@/lib/types";
import { escapeHtml } from "@/lib/html";
import MatrixRain from "@/components/MatrixRain";

type Line = { type: "cmd" | "out"; html: string };

export default function Terminal({
  profile,
  projects,
  skills,
}: {
  profile: HeroProfile;
  projects: ProjectCard[];
  skills: Skill[];
}) {
  const login = profile.login.toLowerCase() || "dev";
  const name = profile.name || "Developer";

  // The prompt is rendered as an HTML string, so the GitHub-sourced login
  // needs escaping there. In JSX, React escapes it automatically.
  const escapedLogin = escapeHtml(login);

  const [lines, setLines] = useState<Line[]>([
    {
      type: "out",
      html:
        `<span class="text-emerald-400">${escapedLogin}@${escapedLogin}</span>:<span class="text-violet-400">~</span>$ welcome-message<br>` +
        `<span class="text-cyan-300">Type <span class="text-yellow-400 underline font-bold">help</span> to list all available commands.</span>`,
    },
  ]);
  const [value, setValue] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const runCommand = (raw: string) => {
    const val = raw.trim().toLowerCase();
    if (!val) return;

    const cmdLine: Line = {
      type: "cmd",
      html:
        `<span class="text-emerald-400">${escapedLogin}@${escapedLogin}</span>:<span class="text-violet-400">~</span>$ ${escapeHtml(val)}`,
    };

    let out: Line | null = {
      type: "out",
      html: "",
    };

    switch (val) {
      case "help":
        out.html = `Available commands:<br>- <span class="text-cyan-400">skills</span>: Output core technical stack<br>- <span class="text-cyan-400">projects</span>: View recent software deployments<br>- <span class="text-cyan-400">experience</span>: Print career history<br>- <span class="text-cyan-400">contact</span>: Show email &amp; social platforms<br>- <span class="text-cyan-400">matrix</span>: Toggle digital rain easter egg<br>- <span class="text-cyan-400">clear</span>: Clear terminal console`;
        break;
      case "skills":
        out.html = skills
          .map(
            (s) =>
              `<span class="text-cyan-400">${escapeHtml(s.name)}</span> (${escapeHtml(s.category)}) - ${s.level}%`
          )
          .join("<br>");
        break;
      case "projects":
        out.html = projects
          .map(
            (p) =>
              `<span class="text-violet-400">${escapeHtml(p.title)}</span> - ${escapeHtml(p.description)} <span class="text-slate-500">+${p.stars}★</span>`
          )
          .join("<br>") || `<span class="text-slate-400">No public repositories right now.</span>`;
        break;
      case "experience":
        out.html = [
          `1. Open Source Builder @ GitHub (${profile.yearsOnGitHub}-present)`,
          `2. ${escapeHtml(profile.role)}`,
          `3. First deployment: speakIn — Android app-lock (2010)`,
        ].join("<br>");
        break;
      case "contact":
        out.html = `GitHub: <span class="text-cyan-400">${escapeHtml(profile.profileUrl)}</span><br>Email: ${escapeHtml(profile.githubEmail ? profile.githubEmail : "via GitHub profile")}<br>Name: ${escapeHtml(name)}`;
        break;
      case "matrix":
        setMatrixActive((v) => !v);
        out.html = `<span class="text-emerald-400">Matrix visual easter egg toggled!</span>`;
        break;
      case "clear":
        out = null;
        setLines([]);
        return;
      default:
        out.html = `<span class="text-red-400">Command not recognized: '${escapeHtml(val)}'. Type <span class="text-yellow-400">help</span>.</span>`;
    }

    setLines((prev) => (out ? [...prev, cmdLine, out] : [...prev, cmdLine]));
  };

  return (
    <section id="terminal" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
          CLI Interactive Interface
        </h2>
        <p className="text-3xl font-extrabold text-white">Developer Terminal</p>
        <p className="mt-2 text-sm text-slate-400">
          Type commands like <span className="font-mono text-cyan-400">help</span>,{" "}
          <span className="font-mono text-cyan-400">skills</span>,{" "}
          <span className="font-mono text-cyan-400">projects</span>, or{" "}
          <span className="font-mono text-cyan-400">matrix</span>.
        </p>
      </div>

      <div className="glass-panel overflow-hidden rounded-2xl border border-slate-700/80 font-mono shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-400">bash - {login}@{login}-workstation:~</span>
          </div>
          <span className="text-xs text-slate-500">v2.4.0-release</span>
        </div>

        {/* Terminal Body */}
        <div
          ref={bodyRef}
          className="min-h-[350px] max-h-[450px] space-y-3 overflow-y-auto p-6 text-sm text-slate-300"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) =>
            line.type === "cmd" ? (
              <div key={i} dangerouslySetInnerHTML={{ __html: line.html }} />
            ) : (
              <div key={i} className="pl-2 text-slate-300" dangerouslySetInnerHTML={{ __html: line.html }} />
            )
          )}
        </div>

        {/* Terminal Input Area */}
        <div className="flex items-center space-x-2 border-t border-slate-800 bg-slate-950/80 px-4 py-3">
          <span className="font-bold text-emerald-400">{login}@{login}:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                runCommand(value);
                setValue("");
              }
            }}
            className="flex-1 border-none bg-transparent font-mono text-sm text-white outline-none focus:ring-0"
            placeholder="Type command here..."
            autoComplete="off"
            aria-label="Terminal command input"
          />
        </div>
      </div>

      <MatrixRain active={matrixActive} />
    </section>
  );
}
