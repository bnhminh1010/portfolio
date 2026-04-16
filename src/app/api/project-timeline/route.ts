import { NextResponse } from "next/server";
import projectTimeline from "@/data/project-timeline.json";

export async function GET() {
  return NextResponse.json(projectTimeline);
}