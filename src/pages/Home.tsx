import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>hello, {user?.id}</h1>
      <Button type="button" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
