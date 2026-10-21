// Server-side GitHub data layer: cached fetches against the GitHub REST API
// for the configured GITHUB_USER. Falls back gracefully so the site always
// renders, even if GitHub is unreachable or rate-limits us.

import { PROJECT_ACCENTS } from "@/lib/data";
import type { ProjectCard } from "@/lib/types";

const GITHUB_USER = process.env.GITHUB_USER || "pappu116";
const API = "https://api.github.com";

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-app",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

export type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  created_at: string;
  blog: string | null;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string | null;
  homepage: string | null;
  size?: number;
  fork: boolean;
  archived: boolean;
};

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers,
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function getGitHubUser(): string {
  return GITHUB_USER;
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  return githubFetch<GitHubProfile>(`/users/${GITHUB_USER}`);
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USER}/repos?sort=stars&per_page=100&direction=desc`
  );
  if (!repos) return [];
  return sortRepos(repos);
}

function sortRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter(
      (r) =>
        !r.fork &&
        !r.archived &&
        r.name.toLowerCase() !== GITHUB_USER.toLowerCase() &&
        (r.size ?? 0) > 0
    )
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        String(b.pushed_at || "").localeCompare(String(a.pushed_at || ""))
    );
}

// Featured picks for the showcase grid: deployed projects first, then the
// most recently pushed, capped to `limit` so the grid stays curated.
function selectFeatured(repos: GitHubRepo[], limit: number): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => {
      const aScore = (a.homepage ? 2 : 0) + (a.description ? 1 : 0);
      const bScore = (b.homepage ? 2 : 0) + (b.description ? 1 : 0);
      if (aScore !== bScore) return bScore - aScore;
      return String(b.pushed_at || "").localeCompare(String(a.pushed_at || ""));
    })
    .slice(0, limit);
}

export async function getFeaturedProjects(limit = 6): Promise<ProjectCard[]> {
  const repos = await getGitHubRepos();
  return reposToProjectCards(selectFeatured(repos, limit));
}

export function yearsSince(dateIso: string, now = Date.now()): number {
  const then = new Date(dateIso).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((now - then) / (365.25 * 24 * 3600 * 1000)));
}

// --- ProjectCard mapping -----------------------------------------------------

function titleize(name: string): string {
  return name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function mapCategory(repo: GitHubRepo): string {
  const haystack = [
    repo.name,
    repo.description || "",
    repo.language || "",
    ...(repo.topics || []),
  ]
    .join(" ")
    .toLowerCase();

  if (/\b(shop|store|commerce|e-?commerce|product|pay)\b/.test(haystack)) return "ecommerce";
  if (/\b(saas|platform|dashboard|api|service|monitor|analytics)\b/.test(haystack)) return "saas";
  if (
    /\b(android|ios|flutter|mobile|app[- ]?lock|phone)\b/.test(haystack) ||
    repo.language === "Kotlin" ||
    repo.language === "Swift" ||
    repo.language === "Dart"
  ) {
    return "mobile";
  }
  if (
    ["JavaScript", "TypeScript", "HTML", "CSS", "Vue"].includes(repo.language || "") ||
    /\b(react|web|website|landing|blog|template|login|chat)\b/.test(haystack)
  ) {
    return "webapp";
  }
  return "project";
}

function mapIcon(repo: GitHubRepo): string {
  const lower = `${repo.description || ""} ${repo.name}`;
  switch (repo.language) {
    case "Kotlin":
    case "Swift":
    case "Dart":
      return "solid:mobile";
    case "Python":
      return "brand:python";
    case "Vue":
      return "brand:vue";
    case "TypeScript":
      return "solid:code";
  }
  if (/\b(android|phone|mobile)\b/i.test(lower)) return "solid:mobile";
  if (/\b(ai|ml|model|neural)\b/i.test(lower)) return "solid:brain";
  return "solid:laptop";
}

function mapFullDescription(repo: GitHubRepo, title: string): string {
  const parts: string[] = [];
  if (repo.description) parts.push(`${repo.description}`);
  parts.push(
    `${repo.name} is public on GitHub${repo.stargazers_count > 0 ? ` with ${repo.stargazers_count} star${repo.stargazers_count === 1 ? "" : "s"}` : ""}${repo.language ? ` and is written primarily in ${repo.language}` : ""}.`
  );
  if (repo.topics && repo.topics.length > 0) {
    parts.push(`Topic areas: ${repo.topics.join(", ")}.`);
  }
  parts.push(
    `Source, issues and releases for ${title} are hosted under ${repo.html_url} on GitHub.`
  );
  return parts.join(" ");
}

export function reposToProjectCards(repos: GitHubRepo[]): ProjectCard[] {
  return repos.map((repo, index) => ({
    id: repo.name,
    title: titleize(repo.name),
    description: repo.description || "No description yet — check the repository for details.",
    fullDescription: mapFullDescription(repo, titleize(repo.name)),
    category: mapCategory(repo),
    tech: [...(repo.language ? [repo.language] : []), ...(repo.topics || [])].slice(0, 5),
    iconKey: mapIcon(repo),
    accent: PROJECT_ACCENTS[index % PROJECT_ACCENTS.length],
    github: repo.html_url,
    demo: repo.homepage || null,
    stars: repo.stargazers_count,
    language: repo.language,
  }));
}
