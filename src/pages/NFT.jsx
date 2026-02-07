import React from "react";
import FullTradeEntry from "../components/trades/FullTradeEntry";

export default function NFT() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">NFT Marketplace</h1>
      <FullTradeEntry
        market="nft"
        onSubmit={(t) => console.log("nft listing", t)}
      />
    </div>
  );
}
