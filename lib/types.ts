// Shared client/server-safe types for GitHub-derived content.

/**
 * The categories a GitHub repository can be bucketed into.
 *
 * This is the single source of truth for the list: `lib/github.ts` assigns
 * these values when mapping a repo, and `components/Projects.tsx` renders one
 * filter tab per value. Adding a category here without a matching tab (or the
 * other way round) is what previously left the "Machine Learning" tab
 * permanently unreachable.
 */
export type ProjectCategory =
  | "ecommerce"
  | "saas"
  | "mobile"
  | "webapp"
  | "project";

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  tech: string[];
  iconKey: string; // resolved by components/IconMap.tsx
  accent: string; // tailwind gradient stops
  github: string;
  demo: string | null;
  stars: number;
  language: string | null;
};

/**
 * The profile details shown across the hero, code showcase, terminal and
 * contact sections. Assembled from the GitHub API with sensible fallbacks in
 * `lib/profile.ts`.
 */
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
