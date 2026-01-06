// Lightweight client-only Supabase shim backed by localStorage.
// Allows demo mode without a real backend.

import { createClient } from "@supabase/supabase-js";

export type Note = {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  trade_id?: string | null;
  user_id?: string;
  created_at?: string;
};

const STORAGE_KEY = "eternum_demo_db_v1";

type DB = {
  notes: Note[];
  trades: any[];
  users: any[];
};

function loadDB(): DB {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { notes: [], trades: [], users: [] };
    return JSON.parse(raw);
  } catch {
    return { notes: [], trades: [], users: [] };
  }
}

function saveDB(db: DB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

class Query {
  table: string;
  db: DB;
  filters: Array<(row: any) => boolean> = [];
  sorter: ((a: any, b: any) => number) | null = null;

  constructor(table: string, db: DB) {
    this.table = table;
    this.db = db;
  }

  select() {
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push((row) => row[field] === value);
    return this;
  }

  order(field: string, opts?: { ascending?: boolean }) {
    const asc = opts?.ascending !== false;
    this.sorter = (a, b) =>
      a[field] === b[field]
        ? 0
        : asc
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
    return this;
  }

  async then(resolve: any) {
    let rows = (this.db as any)[this.table] || [];
    rows = rows.filter((r: any) => this.filters.every((f) => f(r)));
    if (this.sorter) rows = rows.slice().sort(this.sorter);
    return resolve({ data: rows, error: null });
  }
}

/* ============================
   REAL SUPABASE (if env exists)
   ============================ */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const realSupabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

/* ============================
   DEMO FALLBACK
   ============================ */

export const supabase =
  realSupabase ??
  ({
    from(table: string) {
      const db = loadDB();
      return {
        select: () => new Query(table, db),
        insert: async (obj: any) => {
          const id = obj.id || crypto.randomUUID();
          const row = { ...obj, id };
          (db as any)[table] = [...((db as any)[table] || []), row];
          saveDB(db);
          return { data: [row], error: null };
        },
        delete: () => ({
          eq: async (field: string, value: any) => {
            (db as any)[table] = ((db as any)[table] || []).filter(
              (r: any) => r[field] !== value
            );
            saveDB(db);
            return { data: null, error: null };
          },
        }),
        update: async (changes: any) => {
          (db as any)[table] = ((db as any)[table] || []).map((r: any) =>
            r.id === changes.id ? { ...r, ...changes } : r
          );
          saveDB(db);
          return { data: changes, error: null };
        },
      };
    },
    auth: {
      async getUser() {
        const raw = localStorage.getItem("demo_user");
        if (raw) return { data: { user: JSON.parse(raw) }, error: null };
        return {
          data: {
            user: {
              id: "demo-user",
              email: "demo@local",
              user_metadata: { name: "Demo User" },
            },
          },
          error: null,
        };
      },
    },
  } as any);

export default supabase;
