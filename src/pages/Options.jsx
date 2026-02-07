import React from "react";
import FullTradeEntry from "../components/trades/FullTradeEntry";

export default function Options() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Options Trading</h1>
      <FullTradeEntry
        market="options"
        onSubmit={(t) => console.log("options trade", t)}
      />
    </div>
  );
}
