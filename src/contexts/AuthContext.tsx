import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextProviderProps {
  children?: ReactNode;
}

interface AuthContextType {
  user: { id: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [, setAccessToken] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await api.post("/auth/refresh");
      setAccessToken(res.data.accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
      await fetchMe();
    } catch {
      setUser(null);
      setAccessToken(null);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;
      setAccessToken(data.accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

      await fetchMe();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser({ id: res.data.user });
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return <AuthContext.Provider value={{ login, logout, user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
