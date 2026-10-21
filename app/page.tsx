import {
  getFeaturedProjects,
  getGitHubProfile,
  getGitHubUser,
} from "@/lib/github";
import { buildHeroProfile, splitBrandName } from "@/lib/profile";
import { resolvePortraitSrc } from "@/lib/portrait";
import { SKILLS, TIMELINE } from "@/lib/data";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CodeShowcase from "@/components/CodeShowcase";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const [profile, projects] = await Promise.all([
    getGitHubProfile(),
    getFeaturedProjects(6),
  ]);

  const heroProfile = buildHeroProfile(profile, getGitHubUser());
  const { brandMain, brandAccent } = splitBrandName(heroProfile.name);
  const portraitSrc = resolvePortraitSrc();

  return (
    <>
      {/* Ambient Particle Canvas Background */}
      <ParticleBackground />

      {/* Top Scroll Progress Bar + Navigation */}
      <Navbar brandMain={brandMain} brandAccent={brandAccent} />

      <main className="relative z-10 pt-24">
        <Hero profile={heroProfile} portraitSrc={portraitSrc} />

        <CodeShowcase profile={heroProfile} />

        <About />

        <Skills skills={SKILLS} />

        <Projects projects={projects} />

        <Terminal profile={heroProfile} projects={projects} skills={SKILLS} />

        <Experience items={TIMELINE} />

        <Contact profile={heroProfile} />

        <Footer name={heroProfile.name} profileUrl={heroProfile.profileUrl} />
      </main>
    </>
  );
}
