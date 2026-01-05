import { useState } from 'react';
import { db } from '../db';

export default function TradeExit({ trade, onClose }: { trade: any; onClose: () => void }) {
  const [exit, setExit] = useState('');

  const closeTrade = async () => {
    if (!exit) return;
    const t: any = trade;
    const pnl = (parseFloat(exit) - (t.entry || 0)) * (t.side === 'long' ? 1 : -1) * (t.size || 0);
    await (db.trades as any).update(t.id, { exit: parseFloat(exit), closed: new Date(), pnl });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-4 rounded text-white">
        <h3 className="font-bold mb-2">
          Close {trade.market} {trade.side}
        </h3>
        <input
          className="text-black px-2 mb-2"
          placeholder="Exit price"
          value={exit}
          onChange={(e) => setExit(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="bg-green-600 px-3" onClick={closeTrade}>
            Close
          </button>
          <button className="bg-gray-600 px-3" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
