import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp } from "lucide-react";

/* ===========================
   STATIC POPULAR SYMBOLS
=========================== */
export const POPULAR_SYMBOLS = {
  stocks: [
    "AAPL","TSLA","NVDA","MSFT","GOOGL","AMZN","META","NFLX","AMD","INTC","DIS",
    "SHOP","SQ","PYPL","UBER","NKE","V","MA","SPY","QQQ","IWM","DIA","ARKK"
  ],
  crypto: [
    "BTC/USD","ETH/USD","SOL/USD","BNB/USD","XRP/USD","ADA/USD","DOGE/USD","LTC/USD",
    "DOT/USD","AVAX/USD","SHIB/USD","MATIC/USD","LINK/USD","UNI/USD"
  ],
  forex: [
    "EUR/USD","GBP/USD","USD/JPY","AUD/USD","USD/CAD","NZD/USD","USD/CHF",
    "EUR/GBP","EUR/JPY","GBP/JPY","AUD/JPY","EUR/CHF","GBP/CHF","NZD/JPY"
  ],
  options: ["AAPL","TSLA","SPY","QQQ","IWM","MSFT","AMZN","NVDA","META","GOOGL","NFLX","AMD","DIS"],
  futures: ["ES","NQ","YM","CL","GC","SI","NG","HG","BTC","ETH"],
  commodities: ["CL","GC","SI","NG","HG","ZC","ZW","ZS","CC","SB"],
};

/* ===========================
   COMPONENT
=========================== */
export default function SymbolPicker({
  marketType = "stocks",     // fallback market
  market,                    // optional alias for tests, e.g., "spot"
  dynamicSymbols = [],       // optional external symbols (MARKETS)
  value,
  onSelect,
}) {
  const selectedMarketType = market || marketType;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const SPOT_SYMBOLS = [
    "BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","ADAUSDT","DOGEUSDT",
    "LTCUSDT","DOTUSDT","AVAXUSDT","SHIBUSDT","MATICUSDT","LINKUSDT","UNIUSDT"
  ];

  const baseSymbols =
    dynamicSymbols.length > 0
      ? dynamicSymbols
      : selectedMarketType === "spot"
      ? SPOT_SYMBOLS
      : POPULAR_SYMBOLS[selectedMarketType] || POPULAR_SYMBOLS.stocks;

  const filteredSymbols = search
    ? baseSymbols.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
    : baseSymbols;

  return (
    <div className="relative space-y-3">
      {/* SEARCH INPUT */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          placeholder="Search symbol or type..."
          className="pl-10 bg-slate-800 border-slate-700"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value.toUpperCase());
            setOpen(true);
          }}
        />
      </div>

      {/* DROPDOWN LIST */}
      {open && filteredSymbols.length > 0 && (
        <div className="absolute top-12 left-0 z-20 w-full max-h-48 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
          {filteredSymbols.map((symbol) => (
            <div
              key={symbol}
              onClick={() => {
                onSelect(symbol);
                setSearch("");
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-slate-200 hover:bg-slate-800"
            >
              {symbol}
            </div>
          ))}
        </div>
      )}

      {/* POPULAR BADGES */}
      {!search && (
        <div>
          <p className="text-slate-400 text-xs mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Popular
          </p>
          <div className="flex flex-wrap gap-2">
            {baseSymbols.slice(0, 20).map((symbol) => (
              <Badge
                key={symbol}
                variant={value === symbol ? "default" : "outline"}
                className={`cursor-pointer ${
                  value === symbol
                    ? "bg-emerald-600"
                    : "border-slate-700 hover:bg-slate-800"
                }`}
                onClick={() => {
                  onSelect(symbol);
                  setSearch("");
                  setOpen(false);
                }}
              >
                {symbol}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}