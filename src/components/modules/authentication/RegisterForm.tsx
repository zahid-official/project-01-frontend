import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create new account
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>

        {/* Submin btn */}
        <Button type="submit" className="w-full">
          Register
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        {/* Google register */}
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
            <path
              fill="currentColor"
              d="M255.9 133.5c0-11.1-.9-22.2-2.7-32.8H130.5v62h70.5c-3 16.3-12.3 30.1-26.2 39.5v32.7h42.3c24.8-22.9 39.1-56.6 39.1-101.4zM130.5 261.8c35.4 0 65.1-11.7 86.7-31.8l-42.3-32.7c-11.8 7.9-27 12.5-44.4 12.5-34 0-62.8-22.9-73.1-53.8H13.8v33.7c21.9 43.2 67.4 72.1 116.7 72.1zM57.4 156c-5.6-16.6-5.6-34.7 0-51.3V71H13.8C4.9 89.2 0 110.4 0 132.9s4.9 43.7 13.8 61.9l43.6-33zM130.5 51.3c18.7-.3 36.8 6.5 50.4 18.9l37.7-37.7C196.5 11 165.7-1.3 130.5 0 81.2 0 35.7 28.9 13.8 72.1l43.6 33c10.3-30.9 39.1-53.8 73.1-53.8z"
            />
          </svg>
          Register with Google
        </Button>
      </div>

      {/* Navigate to login */}
      <div className="text-center text-sm">
        Already have a account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
