import { NextResponse } from "next/server";
import { getGitHubProfile, getGitHubUser } from "@/lib/github";
import { yearsSince } from "@/lib/profile";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getGitHubProfile();

  if (!profile) {
    return NextResponse.json(
      { error: "GitHub profile unavailable (rate limit or network error)." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    user: getGitHubUser(),
    login: profile.login,
    name: profile.name || profile.login,
    avatar: profile.avatar_url,
    bio: profile.bio,
    followers: profile.followers,
    following: profile.following,
    public_repos: profile.public_repos,
    profile_url: profile.html_url,
    location: profile.location,
    blog: profile.blog,
    email: profile.email,
    twitter_url: profile.twitter_username ? `https://x.com/${profile.twitter_username}` : null,
    member_since: profile.created_at,
    years_on_github: yearsSince(profile.created_at),
  });
}
