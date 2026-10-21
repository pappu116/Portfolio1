import { describe, expect, it } from "vitest";
import {
  mapCategory,
  mapIcon,
  reposToProjectCards,
  type GitHubRepo,
} from "@/lib/github";
import { yearsSince } from "@/lib/profile";

function makeRepo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    id: 1,
    name: "sample-repo",
    html_url: "https://github.com/pappu116/sample-repo",
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    pushed_at: null,
    homepage: null,
    fork: false,
    archived: false,
    ...overrides,
  };
}

describe("mapCategory", () => {
  it("detects ecommerce repositories", () => {
    expect(
      mapCategory(makeRepo({ name: "my-shop", description: "An online store" }))
    ).toBe("ecommerce");
  });

  it("detects saas repositories", () => {
    expect(
      mapCategory(makeRepo({ name: "analytics", description: "SaaS dashboard" }))
    ).toBe("saas");
  });

  it("detects mobile repositories by language", () => {
    expect(
      mapCategory(makeRepo({ name: "reader", language: "Kotlin" }))
    ).toBe("mobile");
  });

  it("detects webapp repositories by language", () => {
    expect(
      mapCategory(makeRepo({ name: "site", language: "TypeScript" }))
    ).toBe("webapp");
  });

  it("falls back to project when nothing matches", () => {
    expect(
      mapCategory(makeRepo({ name: "notes", description: "Some notes" }))
    ).toBe("project");
  });
});

describe("mapIcon", () => {
  it("maps mobile languages to the mobile icon", () => {
    expect(mapIcon(makeRepo({ language: "Swift" }))).toBe("solid:mobile");
  });

  it("maps Python to the python brand icon", () => {
    expect(mapIcon(makeRepo({ language: "Python" }))).toBe("brand:python");
  });

  it("maps TypeScript to the code icon", () => {
    expect(mapIcon(makeRepo({ language: "TypeScript" }))).toBe("solid:code");
  });

  it("detects AI repositories by keyword", () => {
    expect(
      mapIcon(makeRepo({ name: "ml-tool", description: "A neural model" }))
    ).toBe("solid:brain");
  });

  it("falls back to the laptop icon", () => {
    expect(mapIcon(makeRepo({ name: "misc" }))).toBe("solid:laptop");
  });
});

describe("yearsSince", () => {
  const now = Date.parse("2024-01-01T00:00:00.000Z");

  it("counts whole years between two dates", () => {
    expect(yearsSince("2020-01-01T00:00:00.000Z", now)).toBe(4);
  });

  it("returns 0 for an invalid date", () => {
    expect(yearsSince("not-a-date", now)).toBe(0);
  });

  it("never returns a negative value for a future date", () => {
    expect(yearsSince("2030-01-01T00:00:00.000Z", now)).toBe(0);
  });
});

describe("reposToProjectCards", () => {
  it("titleizes the repository name", () => {
    const [card] = reposToProjectCards([
      makeRepo({ name: "my-awesome-project" }),
    ]);

    expect(card.title).toBe("My Awesome Project");
  });

  it("uses the repository name as a stable id", () => {
    const [card] = reposToProjectCards([makeRepo({ name: "my-repo" })]);

    expect(card.id).toBe("my-repo");
  });

  it("falls back to a placeholder description", () => {
    const [card] = reposToProjectCards([makeRepo({ description: null })]);

    expect(card.description).toContain("No description yet");
  });

  it("puts the language first in the tech list and caps it at five", () => {
    const [card] = reposToProjectCards([
      makeRepo({
        language: "TypeScript",
        topics: ["react", "next", "tailwind", "prisma", "postgres"],
      }),
    ]);

    expect(card.tech[0]).toBe("TypeScript");
    expect(card.tech).toHaveLength(5);
  });

  it("exposes the star count and language", () => {
    const [card] = reposToProjectCards([
      makeRepo({ stargazers_count: 12, language: "TypeScript" }),
    ]);

    expect(card.stars).toBe(12);
    expect(card.language).toBe("TypeScript");
  });

  it("keeps the demo link null when there is no homepage", () => {
    const [card] = reposToProjectCards([makeRepo({ homepage: null })]);

    expect(card.demo).toBeNull();
  });

  it("rotates the accent color across the card list", () => {
    const cards = reposToProjectCards([
      makeRepo({ name: "one" }),
      makeRepo({ name: "two" }),
    ]);

    expect(cards[0].accent).not.toBe(cards[1].accent);
  });
});
