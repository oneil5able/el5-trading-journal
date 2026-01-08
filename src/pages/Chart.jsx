import React from "react";
import PositionCalculator from "../src/components/calculator/PositionCalculator";

export default function Chart() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Charts</h1>
      <PositionCalculator />
    </div>
  );
}
