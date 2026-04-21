import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || "https://api.thinkai.id.vn";

  try {
    const response = await fetch(`${backendUrl}/api/public/system/status`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) throw new Error("Backend unreachable");

    const data = await response.json();

    const services = Object.entries(data.components).map(([name, status]) => ({
      name,
      status: status === "UP" ? "healthy" : "down",
      uptime: "99.9%",
      latency: `${data.response_time_ms}ms`
    }));

    return NextResponse.json({
      source: "backend",
      data: {
        timestamp: new Date().toISOString(),
        services,
        alerts: []
      }
    });
  } catch (error) {
    console.error("Live monitoring fetch error:", error);
    return NextResponse.json({
      source: "error",
      data: {
        timestamp: new Date().toISOString(),
        services: [],
        alerts: [{ severity: "error", message: "Failed to fetch real-time data" }]
      }
    });
  }
}
