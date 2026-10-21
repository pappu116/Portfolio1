import { NextResponse } from "next/server";
import { getGitHubRepos, reposToProjectCards } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const repos = await getGitHubRepos();
  return NextResponse.json({ projects: reposToProjectCards(repos) });
}
