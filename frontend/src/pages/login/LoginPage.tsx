import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as z from "zod";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user, error, login, loading } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    try {
      login({ email: data.email, password: data.password });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };
  return (
    <main className="container flex max-w-[1024px] flex-col justify-center py-20">
      <h1 className="mb-4 text-center text-4xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className={cn(
                      form.formState.errors.email &&
                        "border-red-400 focus-visible:ring-red-400",
                      "pr-8",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className={cn(
                        form.formState.errors.password &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    />
                    <div
                      className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer hover:opacity-80"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex items-center justify-between">
            <Link
              className="rounded-md border-[1px] border-gray-300 px-3 py-2 text-sm transition-all duration-150 hover:bg-blue-100/20"
              to="/sign-up"
            >
              Create account
            </Link>
            <Button type="submit" disabled={loading}>
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
