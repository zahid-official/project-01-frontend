import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputOtp from "@/components/ui/input-otp";
import { Link } from "react-router";

// Zod schema
const otpZodSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Verify = () => {
  // Navigation and location hooks
  //! const navigate = useNavigate();
  // const location = useLocation();

  // State for email from location state
  //! const [email] = useState(location.state);

  // Redirect to home if no email in state
  //! useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  // useForm hook
  const form = useForm<z.infer<typeof otpZodSchema>>({
    resolver: zodResolver(otpZodSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle onSubmit
  const onSubmit = (data: z.infer<typeof otpZodSchema>) => {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border rounded-2xl p-9 text-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Heading */}
            <div>
              <h3 className="text-xl font-bold">Enter confirmation code</h3>
              <p className="text-sm">
                Check your email and enter the verification code
              </p>
            </div>

            {/* Input field */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOtp {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Verify btn */}
            <Button type="submit" className="w-full text-base">
              Verify
            </Button>

            {/* Resend otp */}
            <div className="text-center text-sm">
              Not receive a code?{" "}
              <Link to="" className="underline underline-offset-4">
                Resend code
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Verify;
