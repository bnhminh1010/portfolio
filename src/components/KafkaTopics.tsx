"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, Users } from "lucide-react";

type Topic = {
  name: string;
  partitions: number;
  replicationFactor?: number;
  replication?: number;
  messagesPerSec: string;
};

type ConsumerGroup = {
  group: string;
  lag: number;
  members: number;
};

export function KafkaTopics() {
  const { language } = useLanguage();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [consumerGroups, setConsumerGroups] = useState<ConsumerGroup[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/topics")
      .then((res) => res.json())
      .then((payload) => {
        if (!mounted) return;
        const apiTopics = Array.isArray(payload?.data?.topics) ? payload.data.topics : [];
        const apiGroups = Array.isArray(payload?.data?.consumerGroups) ? payload.data.consumerGroups : [];

        setTopics(apiTopics);
        setConsumerGroups(apiGroups);
        if (apiTopics[0]?.name) setSelected(apiTopics[0].name);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const totalMessages = topics.reduce((acc, t) => {
    const parsed = Number.parseInt(String(t.messagesPerSec).replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(parsed) ? acc + parsed : acc;
  }, 0);

  const totalLag = consumerGroups.reduce((acc, group) => acc + group.lag, 0);

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Apache Kafka
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi" ? "Event streaming & message queue" : "Event streaming & message queue"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : topics.length}</div>
            <div className="text-xs text-gray-500">Topics</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : `${totalMessages}/s`}</div>
            <div className="text-xs text-gray-500">Msg Rate</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-gray-500">Brokers</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : totalLag}</div>
            <div className="text-xs text-gray-500">Total Lag</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Topics</span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading && <div className="px-4 py-3 text-sm text-gray-400">Loading topics...</div>}
              {!loading && topics.length === 0 && <div className="px-4 py-3 text-sm text-gray-400">No topics available</div>}
              {topics.map((topic) => (
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

          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Consumer Groups</span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading && <div className="px-4 py-3 text-sm text-gray-400">Loading consumer groups...</div>}
              {!loading && consumerGroups.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400">No consumer groups available</div>
              )}
              {consumerGroups.map((cg) => (
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
