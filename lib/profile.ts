// Pure, isomorphic helpers that turn a GitHub profile into the data the UI
// renders. Everything here is a plain function with no I/O, so it can run in
// a server component, a client component, or a unit test.
//
// The caller supplies the raw GitHub profile (or null, when the API was
// unreachable) and the login to fall back to, which is the configured
// GITHUB_USER rather than a hardcoded name.

import type { GitHubProfile } from "@/lib/github";
import type { HeroProfile } from "@/lib/types";

/**
 * Shown whenever GitHub cannot be reached, so the site still renders with a
 * complete, coherent profile instead of empty fields.
 */
export const FALLBACK_PROFILE: HeroProfile = {
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

/**
 * Splits a full name into the navbar brand: "Pappu Hasan" becomes
 * "Pappu" + ".Hasan". A single-word name gets a generic ".dev" accent.
 */
export function splitBrandName(fullName: string): {
  brandMain: string;
  brandAccent: string;
} {
  const trimmed = fullName.trim();
  const firstSpace = trimmed.indexOf(" ");

  if (firstSpace <= 0) {
    return { brandMain: trimmed, brandAccent: ".dev" };
  }

  return {
    brandMain: trimmed.slice(0, firstSpace),
    brandAccent: `.${trimmed.slice(firstSpace + 1)}`,
  };
}

/**
 * Derives a short job title from a GitHub bio.
 *
 * Bios commonly open with a greeting and a self-introduction
 * ("Hi there, I am a React Frontend Developer"), which reads awkwardly as a
 * headline. This strips those lead-ins and keeps the part that names the role.
 */
export function deriveRoleFromBio(bio: string | null | undefined): string {
  const normalized = (bio ?? "").trim().replace(/\s+/g, " ");

  if (!normalized) {
    return FALLBACK_PROFILE.role;
  }

  const withoutGreeting = normalized
    .replace(/^(hi|hello)[^,.,]*[,.\s]+/i, "")
    .replace(/^my name is [^,.\s]*[^,.\s]*[,.\s]+/i, "")
    .replace(/^(i am a|i'm a|iam a) /i, "")
    .trim();

  return withoutGreeting || "Full-Stack Developer";
}

/**
 * Whole years between an ISO timestamp and now, floored at zero.
 */
export function yearsSince(dateIso: string, now = Date.now()): number {
  const then = new Date(dateIso).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((now - then) / (365.25 * 24 * 3600 * 1000)));
}

/**
 * Assembles the profile consumed by the hero, code showcase, terminal and
 * contact sections. A null GitHub profile yields the fallback values.
 */
export function buildHeroProfile(
  profile: GitHubProfile | null,
  fallbackLogin: string
): HeroProfile {
  const name = profile?.name || FALLBACK_PROFILE.name;
  const bio = (profile?.bio || "").trim().replace(/\s+/g, " ");

  return {
    name,
    login: profile?.login || fallbackLogin,
    bio: bio || FALLBACK_PROFILE.bio,
    role: deriveRoleFromBio(bio),
    avatar: profile?.avatar_url || FALLBACK_PROFILE.avatar,
    profileUrl: profile?.html_url || FALLBACK_PROFILE.profileUrl,
    followers: profile?.followers ?? 0,
    publicRepos: profile?.public_repos ?? 0,
    yearsOnGitHub: profile
      ? yearsSince(profile.created_at)
      : FALLBACK_PROFILE.yearsOnGitHub,
    location: profile?.location || FALLBACK_PROFILE.location,
    githubEmail: profile?.email || null,
    githubBlog: profile?.blog || null,
    twitterUrl: profile?.twitter_username
      ? `https://x.com/${profile.twitter_username}`
      : null,
  };
}
