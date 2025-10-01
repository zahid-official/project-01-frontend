/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputOtp from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const otpZodSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Verify = () => {
  // Navigation and location hooks
  //! const navigate = useNavigate();
  const location = useLocation();

  // State for email from location state
  const [email] = useState(location.state);

  // State for confirm and loading
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  // RTK Query mutation hook
  const [otpSend] = useSendOtpMutation();

  // useForm hook
  const form = useForm<z.infer<typeof otpZodSchema>>({
    resolver: zodResolver(otpZodSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle confirmation
  const handleConfirm = async () => {
    setIsloading(true);

    const otpInfo = { email };

    try {
      const result = await otpSend(otpInfo).unwrap();
      console.log(result);
      toast.success(result.message || "OTP sent successfully");
      setConfirm(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof otpZodSchema>) => {
    const otpInfo = { ...data, email };
    console.log(otpInfo);
  };

  // Redirect to home if no email in state
  //! useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  return (
    <>
      {confirm ? (
        <div className="min-h-screen flex justify-center items-center">
          <div className="border rounded-2xl p-9 text-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                  {isLoading ? (
                    <span className="underline underline-offset-4 cursor-pointer">
                      Resending<span className="loader">...</span>
                    </span>
                  ) : (
                    <span
                      onClick={handleConfirm}
                      className="underline underline-offset-4 cursor-pointer"
                    >
                      Resend code
                    </span>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <div className="border max-w-sm rounded-2xl p-9 text-center">
            <h3 className="text-xl font-bold">Verify your email</h3>
            <p className="text-sm pt-2 pb-4">
              We’ll send a verification code to your email {email}
            </p>

            {/* Confirm btn */}
            <div onClick={handleConfirm}>
              <ButtonSubmit
                isLoading={isLoading}
                value="Confirm to proceed"
                loadingValue="Sending otp"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Verify;
