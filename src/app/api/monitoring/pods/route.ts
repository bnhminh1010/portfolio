import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || "https://api.thinkai.id.vn";

  try {
    const response = await fetch(`${backendUrl}/api/public/system/pods`, {
      next: { revalidate: 30 }
    });

    if (!response.ok) throw new Error("Backend pods API unreachable");

    const data = await response.json();

    return NextResponse.json({
      source: "backend",
      data: data
    });
  } catch (error) {
    console.error("Pods monitoring fetch error:", error);
    return NextResponse.json({
      source: "empty",
      data: []
    });
  }
}
