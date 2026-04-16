"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HardDrive, Activity, Users, Clock } from "lucide-react";

// Mock Kafka data
const mockTopics = [
  { name: "user-events", partitions: 3, replication: 1, messagesPerSec: "245" },
  { name: "course-progress", partitions: 3, replication: 1, messagesPerSec: "128" },
  { name: "exam-submissions", partitions: 6, replication: 1, messagesPerSec: "52" },
  { name: "ai-analytics", partitions: 3, replication: 1, messagesPerSec: "18" },
  { name: "notifications", partitions: 3, replication: 1, messagesPerSec: "89" },
];

const mockConsumerGroups = [
  { group: "user-service", lag: 12, members: 2 },
  { group: "analytics-worker", lag: 45, members: 3 },
  { group: "notification-sender", lag: 0, members: 1 },
];

export function KafkaTopics() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState("user-events");

  // Fetch from API
  useEffect(() => {
    // TODO: Connect to Kafka REST Proxy
  }, []);

  const totalMessages = mockTopics.reduce((acc, t) => acc + parseInt(t.messagesPerSec), 0);

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Apache Kafka
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Event streaming & message queue"
              : "Event streaming & message queue"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{mockTopics.length}</div>
            <div className="text-xs text-gray-500">Topics</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{totalMessages}/s</div>
            <div className="text-xs text-gray-500">Msg Rate</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-gray-500">Brokers</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">57</div>
            <div className="text-xs text-gray-500">Total Lag</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topics */}
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Topics</span>
            </div>
            <div className="divide-y divide-gray-100">
              {mockTopics.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelected(topic.name)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between ${
                    selected === topic.name ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-mono">{topic.name}</div>
                  <div className={`text-xs ${selected === topic.name ? "text-gray-300" : "text-gray-500"}`}>
                    {topic.messagesPerSec}/s
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Consumer Groups */}
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Consumer Groups</span>
            </div>
            <div className="divide-y divide-gray-100">
              {mockConsumerGroups.map((cg) => (
                <div key={cg.group} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono">{cg.group}</span>
                    <span className={`text-xs px-2 py-0.5 ${cg.lag > 30 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {cg.lag} lag
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {cg.members} members
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}