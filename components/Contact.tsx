"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCircleCheck,
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaLocationDot,
  FaPaperPlane,
  FaSpinner,
  FaXTwitter,
} from "react-icons/fa6";
import type { HeroProfile } from "@/components/Hero";

type Toast = { id: number; message: string; ok: boolean };

export default function Contact({ profile }: { profile: HeroProfile }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, ok = true) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, ok }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        showToast("Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        showToast("Could not send the message right now. Please try again.", false);
      }
    } catch {
      showToast("Network error — please try again.", false);
    } finally {
      setSending(false);
      setTimeout(() => setSent(false), 3000);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400";

  const socials = [
    <FaGithub key="gh" className="text-xl" />,
    <FaLinkedinIn key="li" className="text-xl" />,
    <FaXTwitter key="x" className="text-xl" />,
    <FaDiscord key="dc" className="text-xl" />,
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Contact Info */}
        <div className="space-y-8 lg:col-span-5">
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Get In Touch
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              Let&apos;s Build Something Great Together
            </p>
          </div>

          <p className="text-base leading-relaxed text-slate-400">
            Have a project in mind, need technical consulting, or looking to collaborate?
            The fastest way to reach me is always GitHub.
          </p>

          <div className="space-y-4">
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center space-x-4 rounded-xl p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xl text-cyan-400">
                <FaGithub />
              </div>
              <div>
                <div className="font-mono text-xs text-slate-400">GITHUB PROFILE</div>
                <div className="font-medium text-white">@{profile.login}</div>
              </div>
            </a>

            {profile.githubBlog ? (
              <a
                href={profile.githubBlog}
                target="_blank"
                rel="noreferrer"
                className="glass-card flex items-center space-x-4 rounded-xl p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-xl text-violet-400">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-400">PORTFOLIO / WEBSITE</div>
                  <div className="font-medium text-white">{profile.githubBlog}</div>
                </div>
              </a>
            ) : (
              <div className="glass-card flex items-center space-x-4 rounded-xl p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-xl text-violet-400">
                  <FaLocationDot />
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-400">LOCATION</div>
                  <div className="font-medium text-white">
                    {profile.location} / Open to Remote
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Glowing Social Links */}
          <div className="pt-4">
            <div className="mb-3 font-mono text-xs text-slate-400 uppercase">Connect on Social</div>
            <div className="flex space-x-4">
              {socials.map((icon, i) => {
                const href =
                  i === 0 ? profile.profileUrl : i === 2 ? profile.twitterUrl || "#" : "#";
                return (
                  <a
                    key={i}
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel={href !== "#" ? "noreferrer" : undefined}
                    className="glass-card flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition-all hover:scale-110 hover:border-cyan-500/50 hover:text-cyan-400"
                    aria-label={["GitHub", "LinkedIn", "X", "Discord"][i]}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass-panel relative rounded-3xl border border-slate-700/80 p-8 shadow-2xl sm:p-10"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-xs text-slate-400 uppercase"
                  >
                    Your Name
                  </label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-xs text-slate-400 uppercase"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-mono text-xs text-slate-400 uppercase"
                >
                  Project Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Web Application Development / Consulting"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs text-slate-400 uppercase"
                >
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project goals, timelines, and scope..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="glow-btn flex w-full items-center justify-center space-x-3 rounded-xl border border-cyan-500/50 bg-slate-900 py-4 font-bold text-white transition-all hover:scale-[1.01] disabled:opacity-70"
              >
                <span>{sent ? "Message Sent!" : sending ? "Sending..." : "Send Message"}</span>
                {sending ? (
                  <FaSpinner className="animate-spin text-sm text-cyan-400" />
                ) : sent ? (
                  <FaCircleCheck className="text-sm text-emerald-400" />
                ) : (
                  <FaPaperPlane className="text-sm text-cyan-400" />
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* TOAST NOTIFICATION CONTAINER */}
      <div className="pointer-events-none fixed right-6 bottom-6 z-50 flex flex-col space-y-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className={`glass-panel pointer-events-auto flex items-center space-x-3 rounded-xl border px-5 py-3.5 shadow-xl ${
                t.ok ? "border-emerald-500/50 text-emerald-300" : "border-cyan-500/50 text-cyan-300"
              }`}
            >
              <FaCircleCheck className="text-lg" />
              <span className="font-mono text-xs font-bold">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
