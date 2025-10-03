import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextProviderProps {
  children?: ReactNode;
}

interface AuthContextType {
  user: { id: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) =>
        setUser({
          id: "sdadasd",
          email: res.data.user.email,
        }),
      )
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      return;
    }

    try {
      await api.post("/auth/login", { email, password });
      const res = await api.get("/auth/me");
      setUser({
        id: "sdadasd",
        email: res.data.user.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return <AuthContext.Provider value={{ login, logout, user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
