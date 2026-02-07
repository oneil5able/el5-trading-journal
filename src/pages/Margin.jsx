import React from "react";
import FullTradeEntry from "../components/trades/FullTradeEntry";

export default function Margin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Margin Trading</h1>
      <FullTradeEntry
        market="margin"
        onSubmit={(t) => console.log("margin trade", t)}
      />
    </div>
  );
}
