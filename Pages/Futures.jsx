import React from "react";
import FullTradeEntry from "../src/components/trades/FullTradeEntry";

export default function Futures() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Futures Trading</h1>
      <FullTradeEntry
        market="futures"
        onSubmit={(t) => console.log("futures trade", t)}
      />
    </div>
  );
}
