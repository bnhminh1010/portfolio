import { NextResponse } from "next/server";
import costs from "@/data/costs.json";

export async function GET() {
  return NextResponse.json(costs);
}