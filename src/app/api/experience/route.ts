import { NextResponse } from "next/server";
import experiences from "@/data/experience.json";

export async function GET() {
  return NextResponse.json(experiences);
}