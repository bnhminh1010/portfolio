import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockTopics = [
  { name: "user-events", partitions: 3, replicationFactor: 1, messagesPerSec: "150" },
  { name: "order-created", partitions: 6, replicationFactor: 1, messagesPerSec: "89" },
  { name: "payment-processed", partitions: 3, replicationFactor: 1, messagesPerSec: "42" },
];

const mockConsumerGroups = [
  { group: "user-service", lag: 12, members: 2 },
  { group: "analytics-worker", lag: 45, members: 3 },
  { group: "notification-sender", lag: 0, members: 1 },
];

type KafkaTopicInfo = {
  partitions?: Array<{
    replicas?: unknown[];
  }>;
  messagesPerSec?: number | string;
};

export async function GET() {
  const kafkaEnabled =
    process.env.KAFKA_ENABLED != null
      ? process.env.KAFKA_ENABLED === "true"
      : config.kafka?.enabled;
  const kafkaUrl = process.env.KAFKA_URL || config.kafka?.url;

  if (kafkaEnabled && kafkaUrl) {
    try {
      const res = await fetch(`${kafkaUrl}/topics`);
      const data = await res.json();

      if (data) {
        const topics = Array.isArray(data)
          ? data.map((name: string) => ({
              name,
              partitions: 1,
              replicationFactor: 1,
              messagesPerSec: "N/A",
            }))
          : Object.entries(data as Record<string, KafkaTopicInfo>).map(([name, info]) => ({
              name,
              partitions: info?.partitions?.length || 1,
              replicationFactor: info?.partitions?.[0]?.replicas?.length || 1,
              messagesPerSec: String(info?.messagesPerSec ?? "N/A"),
            }));

        if (topics.length > 0) {
          return NextResponse.json({ source: "kafka", data: { topics, consumerGroups: mockConsumerGroups } });
        }
      }
    } catch (error) {
      console.error("Kafka fetch error:", error);
    }
  }

  return NextResponse.json({
    source: "mock",
    data: {
      topics: mockTopics,
      consumerGroups: mockConsumerGroups,
    },
  });
}
