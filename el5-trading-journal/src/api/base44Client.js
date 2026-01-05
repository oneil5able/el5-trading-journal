// Minimal stub of base44 client for builds/tests.
export const base44 = {
  entities: {
    Portfolio: {
      list: async () => [],
      create: async (data) => ({ id: Date.now(), ...data }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    },
    Trade: {
      list: async () => [],
      create: async (data) => ({ id: Date.now(), ...data }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    },
    Watchlist: {
      list: async () => [],
      create: async (data) => ({ id: Date.now(), ...data }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => ({ id }),
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => ({ file_url: '' })
    }
  },
  auth: {
    me: async () => null,
    logout: async () => true
  }
};
