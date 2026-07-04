"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "tenant" | "landlord" | "broker" | "enterprise" | "nri-owner";
  avatar?: string;
  verified: boolean;
  trustLevel: "bronze" | "silver" | "gold" | "platinum";
  onboardingComplete: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: User["role"];
}

const AUTH_KEY = "99tolet-auth-user";
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  // Persist user changes
  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
  }, []);

  // Mock login — simulates API call with 1s delay
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    // Mock: any email/password combo works
    const mockUser: User = {
      id: "usr_" + Date.now(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      email,
      phone: "+91 98765 43210",
      role: "tenant",
      verified: false,
      trustLevel: "bronze",
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };
    persistUser(mockUser);
    return true;
  }, [persistUser]);

  const loginWithPhone = useCallback(async (phone: string, otp: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    const mockUser: User = {
      id: "usr_" + Date.now(),
      name: "User",
      email: "",
      phone,
      role: "tenant",
      verified: false,
      trustLevel: "bronze",
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };
    persistUser(mockUser);
    return true;
  }, [persistUser]);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1500));
    const mockUser: User = {
      id: "usr_" + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      verified: false,
      trustLevel: "bronze",
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };
    persistUser(mockUser);
    return true;
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      loginWithPhone,
      signup,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
