import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, ScatterPlot } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, CartesianGrid,
} from 'recharts';

interface Trade {
  status?: string;
  emotion_entry?: string;
  profit_loss?: number;
  ers?: number;
  pnl?: number;
export { default } from './PsychChart.tsx';

