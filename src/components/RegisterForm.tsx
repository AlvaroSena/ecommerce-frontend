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

const registerFormSchema = z.object({
  name: z.string().min(3, {
    message: "Invalid name",
  }),
  email: z.email({ message: "Invalid e-mail" }),
  password: z.string().min(6, {
    message: "Invalid password",
  }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitingCredentials, setSubmitingCredentials] = useState(false);

  const handleLogin = async ({ email, password }: RegisterFormSchema) => {
    setSubmitingCredentials(true);
    await login(email, password);
    setSubmitingCredentials(false);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your name, email, and password below to register an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input id="name" type="text" placeholder="" {...register("name")} required />
                {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
              </div>
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
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
