import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const loginFormSchema = z.object({
  email: z.email({ message: "Invalid e-mail" }),
  password: z.string().min(6, {
    message: "Invalid password",
  }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitingCredentials, setSubmitingCredentials] = useState(false);

  const handleLogin = async ({ email, password }: LoginFormSchema) => {
    setSubmitingCredentials(true);
    await login(email, password);
    setSubmitingCredentials(false);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required />
                {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" {...register("password")} required />
                {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {submitingCredentials && <LoaderCircle className="animate-spin text-white" />}
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
