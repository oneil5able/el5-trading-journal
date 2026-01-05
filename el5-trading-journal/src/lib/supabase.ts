// Minimal supabase stub to satisfy imports in the journal app.
export type Note = {
  id?: string;
  title?: string;
  body?: string;
  created_at?: string;
};

export const supabase = {
  from: (_: string) => ({ select: async () => ({ data: [], error: null }) }),
  auth: {
    user: () => null,
  },
};

export default supabase;
