// Lightweight client-only Supabase shim backed by localStorage.
// Purpose: allow the app to run in demo mode without a real backend.

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
    return JSON.parse(raw) as DB;
  } catch (e) {
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
    this.filters.push((row: any) => row[field] === value);
    return this;
  }

  order(field: string, opts?: { ascending?: boolean }) {
    const asc = !opts || opts.ascending !== false;
    this.sorter = (a: any, b: any) => {
      if (a[field] === b[field]) return 0;
      return asc
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
    };
    return this;
  }

  async then(resolve: any) {
    const rows = (this.db as any)[this.table] || [];
    let out = rows.filter((r: any) => this.filters.every((f) => f(r)));
    if (this.sorter) out = out.slice().sort(this.sorter);
    return resolve({ data: out, error: null });
  }
}

// Prefer a real Supabase client in production using env vars; fallback to local shim.
let realSupabase: any = null;
try {
  // Only attempt to create a server client when env vars are provided at build/runtime
  // Vite exposes env variables prefixed with VITE_. For Netlify functions or server usage,
  // process.env.SUPABASE_URL / SUPABASE_KEY will be used.
  // We'll lazy-load the client when possible.
  const url =
    (globalThis as any).VITE_SUPABASE_URL ||
    (process && (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL));
  const key =
    (globalThis as any).VITE_SUPABASE_KEY ||
    (process && (process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_KEY));
  if (url && key) {
    // dynamic require to avoid breaking environments without @supabase/supabase-js

    const { createClient } = require("@supabase/supabase-js");
    realSupabase = createClient(url, key);
  }
} catch (e) {
  realSupabase = null;
}

export const supabase = realSupabase || {
  from(table: string) {
    const db = loadDB();
    return {
      select: () => new Query(table, db),
      insert: async (obj: any) => {
        const id = obj.id || Date.now().toString();
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
      if (raw) {
        try {
          const user = JSON.parse(raw);
          return { data: { user }, error: null };
        } catch (e) {
          // fall through
        }
      }
      const demo = {
        id: "demo-user",
        email: "demo@local",
        user_metadata: { name: "Demo User" },
      };
      return { data: { user: demo }, error: null };
    },
    user() {
      const raw = localStorage.getItem("demo_user");
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    },
  },
};

export default supabase;
