import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, TrendingUp, TrendingDown, Briefcase, Trash2, Edit2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-slate-400 text-sm">{payload[0].payload.percentage}% of portfolio</p>
        <p className="text-emerald-400 text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Portfolio() {
  const [showForm, setShowForm] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    shares: '',
    avg_cost: '',
    current_price: '',
    sector: ''
  });
  const queryClient = useQueryClient();

  const { data: portfolio = [], isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => base44.entities.Portfolio.list()
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Portfolio.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      setShowForm(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Portfolio.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      setShowForm(false);
      setSelectedHolding(null);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Portfolio.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] })
  });

  const resetForm = () => {
    setFormData({ symbol: '', name: '', shares: '', avg_cost: '', current_price: '', sector: '' });
  };

  const handleEdit = (holding) => {
    setSelectedHolding(holding);
    setFormData({
      symbol: holding.symbol || '',
      name: holding.name || '',
      shares: holding.shares?.toString() || '',
      avg_cost: holding.avg_cost?.toString() || '',
      current_price: holding.current_price?.toString() || '',
      sector: holding.sector || ''
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const data = {
      ...formData,
      shares: parseFloat(formData.shares),
      avg_cost: parseFloat(formData.avg_cost),
      current_price: formData.current_price ? parseFloat(formData.current_price) : parseFloat(formData.avg_cost)
    };

    if (selectedHolding) {
      updateMutation.mutate({ id: selectedHolding.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Calculate totals
  const totalValue = portfolio.reduce((sum, h) => sum + (h.shares * (h.current_price || h.avg_cost)), 0);
  const totalCost = portfolio.reduce((sum, h) => sum + (h.shares * h.avg_cost), 0);
  const totalPL = totalValue - totalCost;
  const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

  // Pie chart data
  const chartData = portfolio.map((h, i) => ({
    name: h.symbol,
    value: h.shares * (h.current_price || h.avg_cost),
    percentage: ((h.shares * (h.current_price || h.avg_cost) / totalValue) * 100).toFixed(1)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Portfolio</h1>
              <p className="text-slate-400 mt-1">Your current holdings</p>
            </div>
          </div>
          <Button 
            onClick={() => { setSelectedHolding(null); resetForm(); setShowForm(true); }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Holding
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl p-6">
              <p className="text-slate-400 text-sm">Total Value</p>
              <p className="text-3xl font-bold text-white mt-1">
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </Card>
          </motion.div>
*** End of File