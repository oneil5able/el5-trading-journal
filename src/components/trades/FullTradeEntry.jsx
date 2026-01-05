import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SymbolPicker from "@/components/SymbolPicker";
import PositionCalculator from "@/components/calculator/PositionCalculator";
import LiveMarketWidget from "@/components/LiveMarketWidget";

export default function FullTradeEntry({ market = "spot", onSubmit } = {}) {
  const [symbol, setSymbol] = useState("");
  const [orderType, setOrderType] = useState("limit");
  const [side, setSide] = useState("long");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [leverage, setLeverage] = useState("1");
  const [expiry, setExpiry] = useState("");
  const [strike, setStrike] = useState("");

  const handleSubmit = () => {
    if (!symbol) return alert("Select a symbol");

    const payload = {
      market,
      symbol,
      orderType,
      side,
      entryPrice: entryPrice ? parseFloat(entryPrice) : null,
      quantity: quantity ? parseFloat(quantity) : null,
      leverage: parseFloat(leverage),
      strike: strike || null,
      expiry: expiry || null,
      created_at: new Date().toISOString(),
    };

    if (onSubmit) onSubmit(payload);
    else console.log("trade submit", payload);
    setSymbol("");
    setEntryPrice("");
    setQuantity("");
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl p-6">
      <h3 className="text-white font-semibold mb-4">
        New Trade — {market.toUpperCase()}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="text-slate-400 text-sm">Symbol</label>
          <div className="mt-2">
            <SymbolPicker market={market} onSelect={setSymbol} />
            <div className="mt-2 text-white font-medium">
              Selected: {symbol}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <label className="text-slate-400 text-sm">Order Type</label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full mt-1 bg-slate-800 border-slate-700 text-white p-2"
              >
                <option value="limit">Limit</option>
                <option value="market">Market</option>
                <option value="stop">Stop</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm">Side</label>
              <select
                value={side}
                onChange={(e) => setSide(e.target.value)}
                className="w-full mt-1 bg-slate-800 border-slate-700 text-white p-2"
              >
                <option value="long">Long / Buy</option>
                <option value="short">Short / Sell</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <Input
              type="number"
              placeholder="Entry price"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
            <Input
              type="number"
              placeholder="Leverage"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          {market === "options" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Input
                placeholder="Strike"
                value={strike}
                onChange={(e) => setStrike(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
              <Input
                placeholder="Expiry (YYYY-MM-DD)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          )}

          {market === "nft" && (
            <div className="mt-4">
              <Input
                placeholder="Token ID / Listing"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSubmit}
            >
              Submit Trade
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSymbol("");
                setEntryPrice("");
                setQuantity("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <aside className="col-span-1 space-y-4">
          <PositionCalculator />
          <div className="hidden md:block">
            <LiveMarketWidget symbol={symbol || "BTCUSDT"} height={260} />
          </div>
        </aside>
      </div>
    </Card>
  );
}
