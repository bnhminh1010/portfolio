import { NextResponse } from "next/server";
import security from "@/data/security.json";

export async function GET() {
  return NextResponse.json(security);
}