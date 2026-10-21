import {
  getFeaturedProjects,
  getGitHubProfile,
  getGitHubUser,
  yearsSince,
} from "@/lib/github";
import { SKILLS, TIMELINE } from "@/lib/data";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero, { type HeroProfile } from "@/components/Hero";
import CodeShowcase from "@/components/CodeShowcase";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const FALLBACK_PROFILE: HeroProfile = {
  name: "Pappu Hasan",
  login: "pappu116",
  bio: "React Frontend Developer",
  role: "React Frontend Developer",
  avatar: "https://placehold.co/600x800/0f172a/00f0ff?text=Developer+Profile",
  profileUrl: "https://github.com/pappu116",
  followers: 0,
  publicRepos: 0,
  yearsOnGitHub: 0,
  location: "Bogura, Bangladesh",
  githubEmail: null,
  githubBlog: null,
  twitterUrl: null,
};

export default async function Home() {
  const [profile, projects] = await Promise.all([getGitHubProfile(), getFeaturedProjects(6)]);

  const name = profile?.name || FALLBACK_PROFILE.name;
  const clean = name.trim();
  const spaceIdx = clean.indexOf(" ");
  const brandMain = spaceIdx > 0 ? clean.slice(0, spaceIdx) : clean;
  const brandAccent = spaceIdx > 0 ? `.${clean.slice(spaceIdx + 1)}` : ".dev";

  // Short role derived from the GitHub bio ("Hi ... I am a React Frontend
  // Developer") — falls back to the longest trailing phrase or a generic role.
  const bio = (profile?.bio || "").trim().replace(/\s+/g, " ");
  const bioRole =
    bio
      .replace(/^(hi|hello)[^,.,]*[,.\s]+/i, "")
      .replace(/^my name is [^,.\s]*[^,.\s]*[,.\s]+/i, "")
      .replace(/^(i am a|i'm a|iam a) /i, "")
      .trim() || "Full-Stack Developer";

  const role = bio ? bioRole : FALLBACK_PROFILE.role;

  const heroProfile: HeroProfile = {
    name,
    login: profile?.login || getGitHubUser(),
    bio: bio || FALLBACK_PROFILE.bio,
    role,
    avatar: profile?.avatar_url || FALLBACK_PROFILE.avatar,
    profileUrl: profile?.html_url || FALLBACK_PROFILE.profileUrl,
    followers: profile?.followers ?? 0,
    publicRepos: profile?.public_repos ?? 0,
    yearsOnGitHub: profile ? yearsSince(profile.created_at) : FALLBACK_PROFILE.yearsOnGitHub,
    location: profile?.location || FALLBACK_PROFILE.location,
    githubEmail: profile?.email || null,
    githubBlog: profile?.blog || null,
    twitterUrl: profile?.twitter_username ? `https://x.com/${profile.twitter_username}` : null,
  };

  return (
    <>
      {/* Ambient Particle Canvas Background */}
      <ParticleBackground />

      {/* Top Scroll Progress Bar + Navigation */}
      <Navbar brandMain={brandMain} brandAccent={brandAccent} />

      <main className="relative z-10 pt-24">
        <Hero profile={heroProfile} />

        <CodeShowcase profile={heroProfile} />

        <About />

        <Skills skills={SKILLS} />

        <Projects projects={projects} />

        <Terminal profile={heroProfile} projects={projects} skills={SKILLS} />

        <Experience items={TIMELINE} />

        <Contact profile={heroProfile} />

        <Footer name={name} profileUrl={heroProfile.profileUrl} />
      </main>
    </>
  );
}
