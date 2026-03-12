"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GitCommit, CheckCircle2 } from "lucide-react";

type CommitData = {
  sha: string;
  message: string;
  author: string;
  date: string;
};

export function GitOpsStatus() {
  const { t } = useLanguage();
  const [commit, setCommit] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/bnhminh1010/portfolio/commits/main");
        if (response.ok) {
          const data = await response.json();
          setCommit({
            sha: data.sha.substring(0, 7),
            message: data.commit.message.split("\n")[0],
            author: data.commit.author.name,
            date: new Date(data.commit.author.date).toLocaleString(),
          });
        }
      } catch (error) {
        console.error("Failed to fetch commit", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCommit();
  }, []);

  return (
    <div className="w-full border-t border-black bg-[#fafafa] py-1.5 px-4 font-mono text-[10px] sm:text-xs text-black/70 flexitems-center justify-between sm:justify-start gap-4 overflow-hidden whitespace-nowrap">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2 truncate">
          <GitCommit className="h-3.5 w-3.5 shrink-0 text-gray-500" />
          <span className="font-bold hidden sm:inline-block">{t("gitops", "latestCommit")}:</span>
          
          {loading ? (
            <span className="animate-pulse">{t("gitops", "fetching")}</span>
          ) : commit ? (
            <span className="truncate">
              <a 
                href={`https://github.com/bnhminh1010/portfolio/commit/${commit.sha}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:underline cursor-pointer transition-all"
                title="View commit on GitHub"
              >
                {commit.sha}
              </a>
              {" "}— {commit.message} <span className="hidden md:inline-block opacity-60">({commit.author}, {commit.date})</span>
            </span>
          ) : (
            <span>Could not fetch Git data.</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:inline-block uppercase tracking-wider">{t("gitops", "status")}:</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            {t("gitops", "success")}
            <CheckCircle2 className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
