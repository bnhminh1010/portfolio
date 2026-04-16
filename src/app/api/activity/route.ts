import { NextResponse } from "next/server";
import activity from "@/data/activity.json";
import config from "@/data/config.json";

export async function GET() {
  // Nếu có GitHub token và enable, fetch từ GitHub API
  // Nếu không, return local data
  const githubConfig = config.github;

  // TODO: Khi có token, uncomment để fetch từ GitHub
  // if (githubConfig.token && githubConfig.username) {
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/users/${githubConfig.username}/events`,
  //       {
  //         headers: {
  //           Authorization: `token ${githubConfig.token}`,
  //           Accept: "application/vnd.github.v3+json",
  //         },
  //       }
  //     );
  //     const events = await response.json();
  //     // Transform GitHub events thành activity format
  //     const contributions = events
  //       .filter((e: any) => e.type === "PushEvent")
  //       .slice(0, 50)
  //       .map((e: any) => ({
  //         date: e.created_at.split("T")[0],
  //         count: e.payload.commits?.length || 1,
  //       }));
  //     return NextResponse.json(contributions);
  //   } catch (error) {
  //     console.error("GitHub API error:", error);
  //   }
  // }

  // Fallback: return local data
  return NextResponse.json(activity);
}