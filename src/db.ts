// Minimal local DB shim used in the demo app.
export interface ITrade {
  id?: string;
  symbol?: string;
  entry?: number;
  exit?: number;
  pnl?: number;
  opened?: Date;
}

export const db = {
  trades: {
    toArray: async () => [] as ITrade[],
    add: async (_: ITrade) => undefined,
  },
};

export function calculateERS() { return 0; }

export default db;
