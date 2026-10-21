// Shared client/server-safe types for GitHub-derived content.

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  tech: string[];
  iconKey: string; // resolved by components/IconMap.tsx
  accent: string; // tailwind gradient stops
  github: string;
  demo: string | null;
  stars: number;
  language: string | null;
};
