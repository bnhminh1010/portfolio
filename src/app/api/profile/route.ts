import { NextResponse } from "next/server";
import profile from "@/data/profile.json";

export async function GET() {
  return NextResponse.json(profile);
}