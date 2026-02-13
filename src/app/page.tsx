'use client';

import { useEffect, useState } from "react";
import { Activity, Server, Cpu, GitBranch, Github } from "lucide-react";
import { DashboardCard } from "@/src/components/DashboardCard";

interface Metrics {
  memoryUsage: string;
  uptime: number;
  platform: string;
  cpuCount: number;
}

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ${(seconds % 3600 / 60).toFixed(0)}m`;
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 flex items-center justify-between border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            DevOps Dashboard
          </h1>
          <p className="text-gray-400 mt-2">System Monitoring & CI/CD Status</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono text-gray-300">SYSTEM ONLINE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Memory Usage"
          value={metrics ? `${metrics.memoryUsage}%` : 'Loading...'}
          icon={Activity}
          status={metrics && parseFloat(metrics.memoryUsage) > 80 ? 'warning' : 'success'}
        />
        <DashboardCard
          title="System Uptime"
          value={metrics ? formatUptime(metrics.uptime) : 'Loading...'}
          icon={Server}
          status="neutral"
        />
        <DashboardCard
          title="CPU Cores"
          value={metrics ? metrics.cpuCount : '--'}
          icon={Cpu}
          status="neutral"
        />
        <DashboardCard
          title="OS Platform"
          value={metrics ? metrics.platform : '--'}
          icon={Github}
          status="neutral"
        />
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-2">
        <GitBranch className="text-purple-400" />
        Recent Deployments
      </h2>

      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-950 p-4 text-sm font-medium text-gray-400 border-b border-gray-800">
          <div>Commit</div>
          <div>Status</div>
          <div>Branch</div>
          <div>Duration</div>
        </div>
        {/* Mock Rows */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-4 p-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="font-mono text-blue-400">abc123{i}</div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-900">
                Success
              </span>
            </div>
            <div className="font-mono text-gray-300">main</div>
            <div className="text-gray-400">1m 24s</div>
          </div>
        ))}
      </div>
    </main>
  );
}