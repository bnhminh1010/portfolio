import { NextResponse } from "next/server";
import learning from "@/data/learning.json";

export async function GET() {
  return NextResponse.json(learning);
}