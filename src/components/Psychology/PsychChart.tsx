import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, ScatterPlot } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";

interface Trade {
  status?: string;
  emotion_entry?: string;
  profit_loss?: number;
  ers?: number;
  pnl?: number;
}

interface Props {
  trades: Trade[];
}

const EmotionTooltip: React.FC<any> = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl p-3">
        <p className="text-white font-medium capitalize">{data.emotion}</p>
        <p className="text-slate-400 text-sm">{data.count} trades</p>
        <p
          className={`text-sm font-semibold ${
            data.winRate >= 50 ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {data.winRate.toFixed(1)}% win rate
        </p>
      </div>
    );
  }
  return null;
};

export default function PsychChart({ trades }: Props) {
  const [mode, setMode] = useState<"emotion" | "ers">("emotion");

  const closedTrades = trades.filter((t) => t.status === "closed");
  const emotionData = closedTrades.reduce((acc, trade) => {
    if (!trade.emotion_entry) return acc;
    if (!acc[trade.emotion_entry])
      acc[trade.emotion_entry] = { wins: 0, total: 0 };
    acc[trade.emotion_entry].total++;
    if ((trade.profit_loss || 0) > 0) acc[trade.emotion_entry].wins++;
    return acc;
  }, {} as Record<string, { wins: number; total: number }>);

  const emotionChartData = Object.entries(emotionData)
    .map(([emotion, data]) => ({
      emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      winRate: (data.wins / data.total) * 100,
      count: data.total,
    }))
    .sort((a, b) => b.winRate - a.winRate);

  const scatterData = trades
    .filter((t) => t.ers !== undefined && t.pnl !== undefined)
    .map((t) => ({ x: t.ers, y: t.pnl }));

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10">
          {mode === "emotion" ? (
            <Brain className="w-5 h-5 text-purple-400" />
          ) : (
            <ScatterPlot className="w-5 h-5 text-purple-400" />
          )}
        </div>
        <div>
          <h3 className="text-white font-semibold">
            {mode === "emotion" ? "Emotion Analysis" : "ERS vs P&L"}
          </h3>
          <p className="text-slate-400 text-sm">
            {mode === "emotion"
              ? "Win rate by emotional state"
              : "Performance by ERS"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("emotion")}
          className={`px-3 py-1 rounded ${
            mode === "emotion" ? "bg-purple-700" : "bg-gray-700"
          }`}
        >
          Emotion Chart
        </button>
        <button
          onClick={() => setMode("ers")}
          className={`px-3 py-1 rounded ${
            mode === "ers" ? "bg-purple-700" : "bg-gray-700"
          }`}
        >
          ERS Chart
        </button>
      </div>

      {mode === "emotion" ? (
        emotionChartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionChartData}>
                <XAxis
                  dataKey="emotion"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickFormatter={(v: any) => `${v}%`}
                />
                <Tooltip content={(<EmotionTooltip />) as any} />
                <Bar dataKey="winRate" radius={[4, 4, 0, 0]}>
                  {emotionChartData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.winRate >= 50 ? "#10b981" : "#f43f5e"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 rounded-lg bg-slate-800/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <p className="text-white font-medium">
                  Best Performing Emotion
                </p>
              </div>
              <p className="text-emerald-400 text-lg font-semibold capitalize">
                {emotionChartData[0].emotion} (
                {emotionChartData[0].winRate.toFixed(1)}% win rate)
              </p>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            <p>Track emotions on your trades to see insights</p>
          </div>
        )
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis type="number" dataKey="x" name="ERS" stroke="#fff" />
              <YAxis type="number" dataKey="y" name="P&L" stroke="#fff" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={scatterData} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
