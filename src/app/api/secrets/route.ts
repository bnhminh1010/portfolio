import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockSecrets = [
  { key: "DATABASE_URL", status: "active", rotation: "90d", lastRotated: "2026-03-15" },
  { key: "JWT_SECRET", status: "active", rotation: "30d", lastRotated: "2026-04-01" },
  { key: "AWS_ACCESS_KEY", status: "pending", rotation: "30d", lastRotated: "2026-03-20" },
  { key: "REDIS_PASSWORD", status: "active", rotation: "60d", lastRotated: "2026-04-10" },
  { key: "OPENAI_API_KEY", status: "active", rotation: "90d", lastRotated: "2026-03-25" },
];

export async function GET() {
  const vaultEnabled =
    process.env.VAULT_ENABLED != null
      ? process.env.VAULT_ENABLED === "true"
      : config.vault?.enabled;
  const vaultUrl = process.env.VAULT_URL || config.vault?.url;
  const vaultToken = process.env.VAULT_TOKEN || config.vault?.token;

  if (vaultEnabled && vaultUrl && vaultToken) {
    try {
      const res = await fetch(`${vaultUrl}/v1/secret/data/portfolio`, {
        headers: { "X-Vault-Token": vaultToken },
      });
      const data = await res.json();

      if (data?.data?.data && typeof data.data.data === "object") {
        const secrets = Object.keys(data.data.data).map((key) => ({
          key,
          status: "active",
          rotation: "N/A",
          lastRotated: "N/A",
        }));
        return NextResponse.json({ source: "vault", data: secrets });
      }
    } catch (error) {
      console.error("Vault fetch error:", error);
    }
  }

  return NextResponse.json({ source: "mock", data: mockSecrets });
}
