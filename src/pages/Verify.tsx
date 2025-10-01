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
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const location = useLocation();

  // State for email from location state
  const [email] = useState(location.state);

  // State for confirm and loading
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [resending, setResending] = useState(false);

  // RTK Query mutation hook
  const [otpSend] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

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

  // Handle resend otp
  const handleResendOtp = async () => {
    setResending(true);
    const otpInfo = { email };

    try {
      const result = await otpSend(otpInfo).unwrap();
      console.log(result);
      toast.success(result.message || "OTP sent successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    } finally {
      setResending(false);
    }
  };

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof otpZodSchema>) => {
    setIsloading(true);
    const otpInfo = { ...data, email };

    try {
      const result = await verifyOtp(otpInfo).unwrap();
      console.log(result);
      toast.success(result.message || "OTP sent successfully");
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  // Redirect to home if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <>
      {confirm ? (
        <div className="min-h-screen flex justify-center items-center">
          <div className="border rounded-2xl px-8 py-10 text-center">
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
                <ButtonSubmit
                  isLoading={isLoading}
                  value="Verify Code"
                  loadingValue="Verifing"
                />

                {/* Resend otp */}
                <div className="text-center text-sm">
                  Not receive a code?{" "}
                  {resending ? (
                    <span className="underline underline-offset-4 cursor-pointer">
                      Resending<span className="loader">...</span>
                    </span>
                  ) : (
                    <span
                      onClick={handleResendOtp}
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
          <div className="border max-w-sm rounded-2xl px-8 py-12  text-center">
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
