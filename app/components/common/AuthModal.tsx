import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import { useSendOtp, useVerifyOtp } from "~/hooks/useOtp";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export const AuthModal = ({
  isOpen,
  onClose,
  user,
  onSignOut,
  onSignIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; uid: string } | null;
  onSignOut: () => void;
  onSignIn: (user: { name: string; uid: string }) => void;
}) => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  // Track resend attempts to prevent spam
  const [resendCount, setResendCount] = useState(0);
  const MAX_RESENDS = 5;

  const {
    mutate: sendOtp,
    isPending: isSending,
    isError: isSendError,
  } = useSendOtp();
  const {
    mutate: verifyOtp,
    isPending: isVerifying,
    isError: isVerifyError,
  } = useVerifyOtp();

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Reset everything when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setOtp("");
        setTimer(0);
        setResendCount(0); // Reset the count on close
      }, 200);
    }
  }, [isOpen]);

  // Handler for the initial OTP send
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sendOtp(email, {
      onSuccess: () => {
        setStep("otp");
        setTimer(30);
        toast.success("Login code sent!");
      },
      onError: (err) => {
        toast.error((err as Error).message);
      },
    });
  };

  // Handler explicitly for Resending
  const handleResendOtp = () => {
    if (resendCount >= MAX_RESENDS) return;

    sendOtp(email, {
      onSuccess: () => {
        setTimer(30); // Restart the timer
        setResendCount((prev) => prev + 1); // Increment attempt count
        toast.success("New code sent to your email.");
      },
      onError: () => {
        toast.error("Failed to resend. Please try again.");
      },
    });
  };

  // Handler for Verifying
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    verifyOtp(
      { email, otp },
      {
        onSuccess: (data) => {
          if (data?.user) {
            onSignIn(data.user);
          }
          toast.success("Successfully logged in!");
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-fade-in-up border border-primary-dark/10">
        {/* Fixed Cursor Pointer for Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-primary-dark/40 hover:text-primary-dark transition-colors"
          aria-label="Close modal"
        >
          <Icons.X size={24} />
        </button>

        {user ? (
          // --- LOGGED IN VIEW ---
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#F5F0E6] rounded-full flex items-center justify-center mx-auto text-primary-dark">
              <Icons.User className="w-10 h-10" />
            </div>
            <div>
              <Text
                as="h2"
                className="text-3xl font-frista text-primary-dark leading-tight mb-1"
              >
                Welcome Back!
              </Text>
              <Text
                as="p"
                className="text-primary-dark/70 font-satoshi text-sm"
              >
                Logged in as:{" "}
                <span className="font-mono">
                  {user?.uid?.substring(0, 8)}...
                </span>
              </Text>
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 text-lg font-satoshi font-medium flex items-center justify-center gap-2"
              >
                Order History <Icons.ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant={"destructive"}
                onClick={onSignOut}
                className="w-full h-12 text-lg font-satoshi font-medium flex items-center justify-center gap-2"
              >
                Sign Out <Icons.LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          // --- AUTHENTICATION FLOW ---
          <div className="text-center space-y-6">
            <div>
              <Text
                as="h2"
                className="text-3xl font-frista text-primary-dark leading-tight mb-2"
              >
                {step === "email" ? "Join the Club" : "Enter OTP"}
              </Text>
              <Text
                as="p"
                className="text-primary-dark/70 font-satoshi text-sm md:text-base font-light"
              >
                {step === "email"
                  ? "Enter your email to receive a secure login code."
                  : `We sent a 6-digit code to ${email}`}
              </Text>
            </div>

            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2 text-left">
                  <Text
                    as="span"
                    className="block text-xs font-bold uppercase tracking-wider text-primary-dark/60 font-satoshi"
                  >
                    Email Address
                  </Text>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark outline-none font-satoshi"
                  />
                </div>

                {isSendError && (
                  <p className="text-red-500 text-sm text-left">
                    Failed to send OTP. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 text-lg font-satoshi font-medium flex justify-center items-center gap-2"
                >
                  {isSending ? "Sending..." : "Send Login Code"}
                  {!isSending && <Icons.ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    pattern="\d*"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center text-3xl tracking-[0.5em] py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark outline-none font-mono text-primary-dark"
                    placeholder="••••••"
                  />
                </div>

                {isVerifyError && (
                  <p className="text-red-500 text-sm">
                    Invalid or expired OTP. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className="w-full h-12 text-lg font-satoshi font-medium"
                >
                  {isVerifying ? "Verifying..." : "Verify & Login"}
                </Button>

                {/* Resend Logic */}
                <div className="text-sm text-primary-dark/70 pt-2 font-satoshi">
                  {timer > 0 ? (
                    <p>
                      Resend code in <span className="font-bold">{timer}s</span>
                    </p>
                  ) : resendCount >= MAX_RESENDS ? (
                    <p className="text-red-500">
                      Too many attempts. Please try again later.
                    </p>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSending}
                      className={`cursor-pointer bg-white shadow-none text-primary-dark font-bold hover:underline transition-all ${
                        isSending ? "opacity-50 cursor-not-alowed" : ""
                      }`}
                    >
                      {isSending ? "Sending..." : "Resend OTP"}{" "}
                      {resendCount > 0 &&
                        !isSending &&
                        `(${resendCount}/${MAX_RESENDS})`}
                    </Button>
                  )}
                </div>
              </form>
            )}

            <div className="bg-primary-dark/5 p-4 rounded-xl border border-primary-dark/5 mt-6">
              <Text
                as="p"
                className="text-[10px] text-primary-dark/50 leading-relaxed text-center font-satoshi uppercase tracking-widest"
              >
                Secure session management enabled
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
