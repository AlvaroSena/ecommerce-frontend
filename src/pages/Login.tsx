import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-neutral-50">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
