import { describe, expect, it } from "vitest";
import {
  buildHeroProfile,
  deriveRoleFromBio,
  FALLBACK_PROFILE,
  splitBrandName,
} from "@/lib/profile";
import type { GitHubProfile } from "@/lib/github";

function makeProfile(overrides: Partial<GitHubProfile> = {}): GitHubProfile {
  return {
    login: "pappu116",
    name: "Pappu Hasan",
    avatar_url: "https://avatars.githubusercontent.com/u/1",
    bio: "React Frontend Developer",
    followers: 10,
    following: 5,
    public_repos: 25,
    html_url: "https://github.com/pappu116",
    created_at: "2019-06-01T00:00:00.000Z",
    blog: null,
    location: "Bogura, Bangladesh",
    email: null,
    twitter_username: null,
    ...overrides,
  };
}

describe("splitBrandName", () => {
  it("splits a full name into a main brand and an accent", () => {
    expect(splitBrandName("Pappu Hasan")).toEqual({
      brandMain: "Pappu",
      brandAccent: ".Hasan",
    });
  });

  it("gives a single-word name a generic accent", () => {
    expect(splitBrandName("Pappu")).toEqual({
      brandMain: "Pappu",
      brandAccent: ".dev",
    });
  });

  it("trims surrounding whitespace", () => {
    expect(splitBrandName("  Pappu Hasan  ").brandMain).toBe("Pappu");
  });

  it("keeps everything after the first space in the accent", () => {
    expect(splitBrandName("Pappu Hasan Mahmud").brandAccent).toBe(
      ".Hasan Mahmud"
    );
  });
});

describe("deriveRoleFromBio", () => {
  it("strips a greeting and self-introduction", () => {
    expect(deriveRoleFromBio("Hi there, I am a React Frontend Developer")).toBe(
      "React Frontend Developer"
    );
  });

  it("strips an 'I am a' prefix", () => {
    expect(deriveRoleFromBio("I'm a UI/UX Architect")).toBe("UI/UX Architect");
  });

  it("strips a 'my name is' prefix along with the name that follows it", () => {
    // The strip pattern consumes the name as well as the prefix, so
    // "My name is Pappu, a Developer" leaves just the role description.
    expect(deriveRoleFromBio("My name is Pappu, a Developer")).toBe(
      "a Developer"
    );
  });

  it("falls back to the default role for an empty bio", () => {
    expect(deriveRoleFromBio("")).toBe(FALLBACK_PROFILE.role);
    expect(deriveRoleFromBio(null)).toBe(FALLBACK_PROFILE.role);
    expect(deriveRoleFromBio(undefined)).toBe(FALLBACK_PROFILE.role);
  });

  it("falls back to a generic role when stripping leaves nothing behind", () => {
    expect(deriveRoleFromBio("Hi,")).toBe("Full-Stack Developer");
  });

  it("collapses runs of whitespace", () => {
    expect(deriveRoleFromBio("  React    Frontend   Developer  ")).toBe(
      "React Frontend Developer"
    );
  });

  it("handles the live GitHub bio format", () => {
    // The bio as the GitHub API currently returns it: greeting, name, then
    // the role — all with irregular spacing.
    expect(
      deriveRoleFromBio(
        "Hi My Name is Pappu Hasan , I am a React  Frontend Developer"
      )
    ).toBe("React Frontend Developer");
  });
});

describe("buildHeroProfile", () => {
  it("uses the GitHub values when the API responds", () => {
    const profile = buildHeroProfile(
      makeProfile({ followers: 42, public_repos: 7 }),
      "pappu116"
    );

    expect(profile.name).toBe("Pappu Hasan");
    expect(profile.followers).toBe(42);
    expect(profile.publicRepos).toBe(7);
    expect(profile.location).toBe("Bogura, Bangladesh");
  });

  it("falls back to the static profile when the API is unavailable", () => {
    const profile = buildHeroProfile(null, "pappu116");

    expect(profile.name).toBe(FALLBACK_PROFILE.name);
    expect(profile.role).toBe(FALLBACK_PROFILE.role);
    expect(profile.followers).toBe(0);
  });

  it("uses the supplied login when the profile has none", () => {
    const profile = buildHeroProfile(
      makeProfile({ login: "" }),
      "configured-user"
    );

    expect(profile.login).toBe("configured-user");
  });

  it("builds the twitter URL from the username", () => {
    const profile = buildHeroProfile(
      makeProfile({ twitter_username: "pappu" }),
      "pappu116"
    );

    expect(profile.twitterUrl).toBe("https://x.com/pappu");
  });

  it("leaves the twitter URL null when there is no username", () => {
    const profile = buildHeroProfile(makeProfile(), "pappu116");

    expect(profile.twitterUrl).toBeNull();
  });

  it("derives the role from the bio", () => {
    const profile = buildHeroProfile(
      makeProfile({ bio: "Hi, I am a Cloud Solutions Engineer" }),
      "pappu116"
    );

    expect(profile.role).toBe("Cloud Solutions Engineer");
  });

  it("keeps null optional fields null", () => {
    const profile = buildHeroProfile(
      makeProfile({ email: null, blog: null }),
      "pappu116"
    );

    expect(profile.githubEmail).toBeNull();
    expect(profile.githubBlog).toBeNull();
  });
});
