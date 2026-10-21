"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaArrowRight,
  FaEnvelope,
  FaMicrochip,
  FaNodeJs,
  FaReact,
  FaShieldHalved,
} from "react-icons/fa6";
import { TYPEWRITER_ROLES } from "@/lib/data";

export type HeroProfile = {
  name: string;
  login: string;
  bio: string | null;
  role: string;
  avatar: string;
  profileUrl: string;
  followers: number;
  publicRepos: number;
  yearsOnGitHub: number;
  location: string;
  githubEmail: string | null;
  githubBlog: string | null;
  twitterUrl: string | null;
};

// --- Typewriter (exact algorithm port) ---
function Typewriter({ values }: { values: string[] }) {
  const [text, setText] = useState(values[0] || "");

  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = values[index];
      if (isDeleting) {
        setText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % values.length;
        speed = 500;
      }

      timer = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.join("|")]);

  return <span>{text}</span>;
}

// --- Count-up stat ---
function Stat({
  target,
  suffix,
  label,
  colorClass,
}: {
  target: number;
  suffix: string;
  label: string;
  colorClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [display, setDisplay] = useState(`${suffix}`);

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const step = Math.ceil(target / 40) || 1;
    const update = () => {
      count += step;
      if (count > target) count = target;
      setDisplay(`${count}${suffix}`);
      if (count < target) setTimeout(update, 30);
    };
    update();
  }, [inView, suffix, target]);

  return (
    <div ref={ref}>
      <div className={`font-mono text-3xl font-extrabold sm:text-4xl ${colorClass}`}>
        {display}
      </div>
      <div className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</div>
    </div>
  );
}

// --- 3D tilt profile card ---
function ProfileCard({
  profile,
  portraitSrc,
}: {
  profile: HeroProfile;
  portraitSrc: string | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className="relative perspective-1200 flex items-center justify-center py-6">
      {/* Backdrop Glowing Orbs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-80 w-80 animate-glow-pulse rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-80 w-80 animate-glow-pulse rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-2xl" />

      {/* Main 3D Tilted Card Container */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="glass-panel group relative w-full max-w-lg cursor-pointer animate-float rounded-3xl border border-cyan-500/40 p-2.5 shadow-2xl"
      >
        {/* Mouse Spotlight Highlight */}
        <div className="spotlight-overlay absolute inset-0 z-20 rounded-3xl opacity-80 transition-opacity duration-300" />

        {/* Card Inner Viewport Wrapper */}
        <div className="relative flex h-[460px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:h-[520px]">
          {/* Image Background Layer */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSrc || profile.avatar}
              alt="Profile Showcase"
              className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating Header Badges (3D Depth Layer) */}
          <div className="relative z-10 flex items-center justify-between translate-z-50">
            <div className="glass-panel flex items-center space-x-2 rounded-full border border-cyan-400/40 px-3 py-1.5 font-mono text-xs text-cyan-300">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
              <span>OPEN SOURCE DEVELOPER</span>
            </div>
            <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/40 text-lg text-violet-400 shadow-lg">
              <FaMicrochip />
            </div>
          </div>

          {/* Floating Code Visual Overlay */}
          <div className="relative z-10 my-auto hidden translate-z-70 sm:block">
            <div className="glass-panel max-w-xs space-y-1 rounded-xl border border-slate-700/80 bg-slate-900/80 p-4 font-mono text-xs shadow-2xl backdrop-blur-xl">
              <div className="text-cyan-400">{"> "}{profile.login.toLowerCase()}.getStatus()</div>
              <div className="pl-2 text-slate-300">
                status: <span className="text-emerald-400">&apos;Ready to collaborate&apos;</span>
              </div>
              <div className="pl-2 text-slate-300">
                repos: [#{" "}
                <span className="text-violet-300">{profile.publicRepos}</span>,{" "}
                <span className="text-pink-300">{profile.yearsOnGitHub}y</span>,{" "}
                <span className="text-cyan-300">{profile.followers} fol.</span>]
              </div>
            </div>
          </div>

          {/* Floating Bottom Details Card (3D Depth Layer) */}
          <div className="relative z-10 space-y-3 translate-z-50 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-white">{profile.name}</h3>
                <p className="font-mono text-xs text-slate-400">{profile.role}</p>
              </div>
              <div className="flex space-x-2">
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
                <span className="h-3 w-3 rounded-full bg-violet-500" />
                <span className="h-3 w-3 rounded-full bg-pink-500" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 font-mono text-xs text-slate-300">
              <span className="flex items-center text-emerald-400">
                <FaShieldHalved className="mr-1.5" /> {"Clean Code"}
              </span>
              <span className="text-slate-400">{profile.location}</span>
            </div>
          </div>

          {/* Decorative Floating Glowing Dots */}
          <div className="glass-panel absolute top-1/4 -right-4 z-30 flex h-12 w-12 translate-z-70 animate-float-delayed items-center justify-center rounded-2xl border border-pink-500/50 text-xl text-pink-400 shadow-xl">
            <FaReact />
          </div>
          <div className="glass-panel absolute bottom-1/3 -left-4 z-30 flex h-12 w-12 translate-z-70 animate-float items-center justify-center rounded-2xl border border-cyan-500/50 text-xl text-cyan-400 shadow-xl">
            <FaNodeJs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  profile,
  portraitSrc,
}: {
  profile: HeroProfile;
  portraitSrc: string | null;
}) {
  const stats = [
    {
      target: profile.yearsOnGitHub,
      suffix: "+",
      label: "Years on GitHub",
      colorClass: "text-cyan-400",
    },
    {
      target: profile.publicRepos,
      suffix: "+",
      label: "Public Repositories",
      colorClass: "text-violet-400",
    },
    {
      target: profile.followers,
      suffix: "+",
      label: "Open Source Followers",
      colorClass: "text-pink-400",
    },
  ];

  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 gap-12 lg:grid-cols-12">
        {/* Left Column: Bio & Intro Text */}
        <div className="z-20 space-y-8 text-center lg:col-span-6 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel inline-flex items-center space-x-3 rounded-full border border-cyan-500/30 px-4 py-2"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Available for New Projects &amp; Roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            Crafting High Performance <br />
            <span className="text-gradient">Digital Architectures</span>
          </motion.h1>

          {/* Dynamic Typewriter Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex h-10 items-center justify-center space-x-2 font-mono text-xl text-slate-300 sm:text-2xl lg:justify-start"
          >
            <span className="text-cyan-400">{">"}</span>
            <span className="font-semibold text-slate-100">
              <Typewriter values={TYPEWRITER_ROLES} />
            </span>
            <span className="cursor-blink inline-block h-6 w-2.5 bg-cyan-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
          >
            Full-stack developer specializing in distributed cloud microservices,
            reactive frontend web applications, and ultra-fluid user interfaces.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start"
          >
            <a
              href="#projects"
              className="glow-btn flex items-center space-x-3 rounded-xl border border-cyan-500/50 bg-slate-900 px-8 py-4 font-bold text-white transition-transform hover:scale-105"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-sm text-cyan-400" />
            </a>
            <a
              href="#contact"
              className="glass-card flex items-center space-x-3 rounded-xl border border-slate-700 px-8 py-4 font-bold text-slate-200 transition-all hover:scale-105 hover:border-violet-500 hover:text-white"
            >
              <FaEnvelope className="text-violet-400" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Quick Stats Counters */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 text-center lg:text-left">
            {stats.map((s) => (
              <Stat
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                colorClass={s.colorClass}
              />
            ))}
          </div>
        </div>

        {/* Right Column: LARGE INTERACTIVE 3D FLOATING PROFILE SHOWCASE CARD */}
        <div className="lg:col-span-6">
          <ProfileCard profile={profile} portraitSrc={portraitSrc} />
        </div>
      </div>
    </section>
  );
}
