/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonSubmit from "@/components/ui/button-submit";
import InputPassword from "@/components/ui/input-password";
import { useLoginMutation } from "@/redux/features/auth.api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import envVars from "@/config/env";

// Zod schema
const loginZodSchema = z.object({
  // Email
  email: z
    .email()
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(100, { error: "Email cannot exceed 100 characters." })
    .trim(),

  // Password
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .trim(),
});

const LoginForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hook
  const [login] = useLoginMutation();

  // useForm hook
  const form = useForm<z.infer<typeof loginZodSchema>>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credentials login
  const credentialsLogin = async (data: z.infer<typeof loginZodSchema>) => {
    setIsloading(true);

    try {
      const result = await login(data).unwrap();
      console.log(result);
      toast.success(result.message || "Logged in successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");

      // Redirect to verify if not verified
      if (
        error.status === 401 &&
        error.data.message ===
          "User is not verified. Please verify your email to proceed."
      ) {
        navigate("/verify", { state: data.email });
      }
    } finally {
      setIsloading(false);
    }
  };

  // Handle goole login
  const googleLogin = async () => {
    window.location.href = `${envVars.BASE_URL}/auth/google`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form body */}
      <div className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(credentialsLogin)}
            className="space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@email.com" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit btn */}
            <ButtonSubmit
              isLoading={isLoading}
              value="Login"
              loadingValue="Logging in"
            />
          </form>
        </Form>

        {/* Divider */}
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        {/* Google register */}
        <Button
          onClick={googleLogin}
          variant="outline"
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
            <path
              fill="currentColor"
              d="M255.9 133.5c0-11.1-.9-22.2-2.7-32.8H130.5v62h70.5c-3 16.3-12.3 30.1-26.2 39.5v32.7h42.3c24.8-22.9 39.1-56.6 39.1-101.4zM130.5 261.8c35.4 0 65.1-11.7 86.7-31.8l-42.3-32.7c-11.8 7.9-27 12.5-44.4 12.5-34 0-62.8-22.9-73.1-53.8H13.8v33.7c21.9 43.2 67.4 72.1 116.7 72.1zM57.4 156c-5.6-16.6-5.6-34.7 0-51.3V71H13.8C4.9 89.2 0 110.4 0 132.9s4.9 43.7 13.8 61.9l43.6-33zM130.5 51.3c18.7-.3 36.8 6.5 50.4 18.9l37.7-37.7C196.5 11 165.7-1.3 130.5 0 81.2 0 35.7 28.9 13.8 72.1l43.6 33c10.3-30.9 39.1-53.8 73.1-53.8z"
            />
          </svg>
          Login with Google
        </Button>
      </div>

      {/* Navigate to register */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
