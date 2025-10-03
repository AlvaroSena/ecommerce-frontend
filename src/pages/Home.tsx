import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>hello, {user.email}</h1>
      <Button type="button" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
