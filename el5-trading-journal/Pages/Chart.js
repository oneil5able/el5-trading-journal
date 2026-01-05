import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import LiveChart from '../components/charts/LiveChart';
import TradeEntry from '../components/trades/TradeEntry';
import PositionCalculator from '../components/calculator/PositionCalculator';

export default function Charts() {
  const [symbol, setSymbol] = useState('AAPL');
  const [marketType, setMarketType] = useState('stocks');
  const [timeframe, setTimeframe] = useState('1D');

  const { data: trades = [] } = useQuery({
    queryKey: ['trades'],
    queryFn: () => base44.entities.Trade.list('-entry_date', 10)
  });

  const recentSymbols = [...new Set(trades.map(t => t.symbol).filter(Boolean))].slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Live Charts</h1>
            <p className="text-slate-400 mt-1">Real-time market analysis and quick trade entry</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 mb-4 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger className="w-40 bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {recentSymbols.map(sym => (
                      <SelectItem key={sym} value={sym}>{sym}</SelectItem>
                    ))}
                    <SelectItem value="AAPL">AAPL</SelectItem>
                    <SelectItem value="TSLA">TSLA</SelectItem>
                    <SelectItem value="NVDA">NVDA</SelectItem>
                    <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                    <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                    <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={marketType} onValueChange={setMarketType}>
                  <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="stocks">Stocks</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="indices">Indices</SelectItem>
                    <SelectItem value="commodities">Commodities</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-24 bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="1">1m</SelectItem>
                    <SelectItem value="5">5m</SelectItem>
                    <SelectItem value="15">15m</SelectItem>
                    <SelectItem value="30">30m</SelectItem>
                    <SelectItem value="60">1h</SelectItem>
                    <SelectItem value="240">4h</SelectItem>
                    <SelectItem value="1D">1D</SelectItem>
                    <SelectItem value="1W">1W</SelectItem>
                    <SelectItem value="1M">1M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <LiveChart symbol={symbol} timeframe={timeframe} marketType={marketType} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <PositionCalculator />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TradeEntry 
            onSubmit={(trade) => {
              base44.entities.Trade.create(trade);
            }} 
          />
        </motion.div>
      </div>
    </div>
  );
}