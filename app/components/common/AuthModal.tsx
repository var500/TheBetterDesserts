import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import { useSendOtp, useVerifyOtp } from "~/hooks/useOtp";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { useNavigate } from "react-router";
import type { User } from "~/store/authStore";

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
  onSignIn: (user: Partial<User>, token: string) => void;
}) => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

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
          if (data?.user && data?.accessToken) {
            onSignIn(data.user, data.accessToken);
            toast.success("Successfully logged in!");
            onClose();
          } else {
            toast.error("Login failed: Invalid server response.");
          }
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/20 p-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="animate-fade-in-up border-primary-dark/10 relative w-full max-w-md rounded-2xl border bg-white p-8 shadow-2xl">
        {/* Fixed Cursor Pointer for Close Button */}
        <button
          onClick={onClose}
          className="text-primary-dark/40 hover:text-primary-dark absolute top-4 right-4 cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <Icons.X size={24} />
        </button>

        {user ? (
          // --- LOGGED IN VIEW ---
          <div className="space-y-6 text-center">
            <div className="text-primary-dark mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F0E6]">
              <Icons.User className="h-10 w-10" />
            </div>
            <div>
              <Text
                as="h2"
                className="text-primary-dark mb-1 text-3xl leading-tight"
              >
                Welcome Back!
              </Text>
              <Text as="p" className="text-primary-dark/70 text-sm">
                Logged in as:{" "}
                {user.name ? (
                  <span className="font-mono">
                    {user?.uid?.substring(0, 8)}...
                  </span>
                ) : (
                  <span className="font-mono">
                    {user?.uid?.substring(0, 8)}...
                  </span>
                )}
              </Text>
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
                className="flex h-12 w-full items-center justify-center gap-2 text-lg font-medium"
              >
                Order History <Icons.ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant={"destructive"}
                onClick={onSignOut}
                className="flex h-12 w-full items-center justify-center gap-2 text-lg font-medium"
              >
                Sign Out <Icons.LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // --- AUTHENTICATION FLOW ---
          <div className="space-y-6 text-center">
            <div>
              <Text
                as="h2"
                className="text-primary-dark mb-2 text-3xl leading-tight"
              >
                {step === "email" ? "Join the Club" : "Enter OTP"}
              </Text>
              <Text
                as="p"
                className="text-primary-dark/70 text-sm font-light md:text-base"
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
                    className="text-primary-dark/60 block text-xs font-bold tracking-wider uppercase"
                  >
                    Email Address
                  </Text>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-primary-dark/10 focus:ring-primary-dark w-full rounded-xl border bg-white/50 px-4 py-3 outline-none focus:ring-2"
                  />
                </div>

                {isSendError && (
                  <p className="text-left text-sm text-red-500">
                    Failed to send OTP. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSending}
                  className="flex h-12 w-full items-center justify-center gap-2 text-lg font-medium"
                >
                  {isSending ? "Sending..." : "Send Login Code"}
                  {!isSending && <Icons.ArrowRight className="h-4 w-4" />}
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
                    className="border-primary-dark/10 focus:ring-primary-dark text-primary-dark w-full rounded-xl border bg-white/50 py-3 text-center font-mono text-3xl tracking-[0.5em] outline-none focus:ring-2"
                    placeholder="••••••"
                  />
                </div>

                {isVerifyError && (
                  <p className="text-sm text-red-500">
                    Invalid or expired OTP. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className="h-12 w-full text-lg font-medium"
                >
                  {isVerifying ? "Verifying..." : "Verify & Login"}
                </Button>

                {/* Resend Logic */}
                <div className="text-primary-dark/70 pt-2 text-sm">
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
                      className={`text-primary-dark cursor-pointer bg-white font-bold shadow-none transition-all hover:underline ${
                        isSending ? "cursor-not-alowed opacity-50" : ""
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

            <div className="bg-primary-dark/5 border-primary-dark/5 mt-6 rounded-xl border p-4">
              <Text
                as="p"
                className="text-primary-dark/50 text-center text-[10px] leading-relaxed tracking-widest uppercase"
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
