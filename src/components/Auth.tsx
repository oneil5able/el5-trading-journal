import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

/* ===========================
   PROVIDER
=========================== */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load session on refresh
  useEffect(() => {
    const stored = localStorage.getItem('el5_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string) => {
    const u = { id: crypto.randomUUID(), email };
    setUser(u);
    localStorage.setItem('el5_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('el5_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ===========================
   HOOK
=========================== */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
