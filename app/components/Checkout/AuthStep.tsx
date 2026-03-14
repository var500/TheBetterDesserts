import React, { useState } from "react";
import { useCheckoutStore } from "~/store/checkoutStore";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useSendOtp, useVerifyOtp } from "~/hooks/useOtp";
import { toast } from "react-toastify";

// --- STEP 1: Email Collection ---
export function ContactStep() {
  const { setStep, setContactEmail, contactEmail } = useCheckoutStore();

  const { mutate: sendOtp, isPending: isSending } = useSendOtp();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    // TODO: Call your actual backend API to send the OTP email here
    // await sendOtpEmailMutation({ email: contactEmail });
    sendOtp(contactEmail, {
      onSuccess: () => {
        setStep("OTP_VERIFICATION");
        toast.success("Login code sent!");
      },
      onError: (err) => {
        toast.error((err as Error).message);
      },
    });
  };

  return (
    <div className="border-primary-dark/10 animate-in fade-in mb-8 rounded-2xl border bg-white p-6 shadow-sm">
      <Text as="h2" className="text-primary-dark mb-2 text-2xl">
        Contact Information
      </Text>
      <Text as="p" className="text-primary-dark/60 mb-6 text-sm">
        Where should we send your order confirmation?
      </Text>

      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Enter your email"
            className="border-primary-dark/20 focus:border-primary-dark w-full rounded-xl border p-3 focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl"
          disabled={isSending || !contactEmail}
        >
          {isSending ? "Sending Code..." : "Continue to Delivery"}
        </Button>
      </form>
    </div>
  );
}

// --- STEP 2: OTP Verification ---
export function OtpVerificationStep() {
  const { setStep, contactEmail } = useCheckoutStore();
  const [otp, setOtp] = useState("");

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    verifyOtp(
      { email: contactEmail, otp },
      {
        onSuccess: () => {
          setStep("DELIVERY_AND_PAYMENT");
        },
      },
    );
  };

  return (
    <div className="border-primary-dark/10 animate-in fade-in slide-in-from-right-4 mb-8 rounded-2xl border bg-white p-6 shadow-sm">
      <Text as="h2" className="text-primary-dark mb-2 text-2xl">
        Verify your Email
      </Text>
      <Text as="p" className="text-primary-dark/60 mb-6 text-sm">
        We sent a quick verification code to{" "}
        <span className="font-bold">{contactEmail}</span>.
        <button
          type="button"
          onClick={() => setStep("CONTACT")}
          className="ml-2 text-blue-500 hover:underline"
        >
          Edit
        </button>
      </Text>

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <input
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="6-digit code"
            className="border-primary-dark/20 focus:border-primary-dark w-full rounded-xl border p-3 text-center text-xl tracking-widest focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl"
          disabled={isVerifying || otp.length < 6}
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </Button>
      </form>
    </div>
  );
}
