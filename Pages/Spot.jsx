import React from "react";
import FullTradeEntry from "../src/components/trades/FullTradeEntry";

export default function Spot() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spot Trading</h1>
      <FullTradeEntry
        market="spot"
        onSubmit={(t) => console.log("spot trade", t)}
      />
    </div>
  );
}
