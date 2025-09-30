/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/ui/input-password";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterMutation } from "@/redux/features/auth.api";
import ButtonSubmit from "@/components/ui/button-submit";
import { useState } from "react";

// Zod schema
const registerZodSchema = z
  .object({
    // Name
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long." })
      .max(50, { error: "Name cannot exceed 50 characters." })
      .trim(),

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

      // Password complexity requirements
      .regex(/^(?=.*[A-Z])/, {
        error: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Password must contain at least 1 number.",
      })
      .trim(),

    // Confirm password
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password must be at least 8 characters long." })

      // Password complexity requirements
      .regex(/^(?=.*[A-Z])/, {
        error: "Confirm Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Confirm Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Confirm Password must contain at least 1 number.",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password's don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // RTK Query mutation hook
  const [register] = useRegisterMutation();

  // useForm hook
  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof registerZodSchema>) => {
    setIsloading(true);
    const { confirmPassword: _confirmPassword, ...userInfo } = data;

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("Account created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create new account
        </p>
      </div>

      {/* Form body */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your confirm password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit btn */}

            <ButtonSubmit
              isLoading={isLoading}
              value="Create Account"
              loadingValue="Creating Your Account..."
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
        <Button variant="outline" className="w-full cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
            <path
              fill="currentColor"
              d="M255.9 133.5c0-11.1-.9-22.2-2.7-32.8H130.5v62h70.5c-3 16.3-12.3 30.1-26.2 39.5v32.7h42.3c24.8-22.9 39.1-56.6 39.1-101.4zM130.5 261.8c35.4 0 65.1-11.7 86.7-31.8l-42.3-32.7c-11.8 7.9-27 12.5-44.4 12.5-34 0-62.8-22.9-73.1-53.8H13.8v33.7c21.9 43.2 67.4 72.1 116.7 72.1zM57.4 156c-5.6-16.6-5.6-34.7 0-51.3V71H13.8C4.9 89.2 0 110.4 0 132.9s4.9 43.7 13.8 61.9l43.6-33zM130.5 51.3c18.7-.3 36.8 6.5 50.4 18.9l37.7-37.7C196.5 11 165.7-1.3 130.5 0 81.2 0 35.7 28.9 13.8 72.1l43.6 33c10.3-30.9 39.1-53.8 73.1-53.8z"
            />
          </svg>
          Sign Up with Google
        </Button>
      </div>

      {/* Navigate to login */}
      <div className="text-center text-sm">
        Already have a account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
