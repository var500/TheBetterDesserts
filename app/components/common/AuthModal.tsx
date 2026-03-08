import React, { useState, useEffect } from "react";
import { Icons } from "../icons";
import { useSendOtp, useVerifyOtp } from "~/hooks/useOtp";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setOtp("");
        setTimer(0);
      }, 200);
    }
  }, [isOpen]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sendOtp(email, {
      onSuccess: () => {
        setStep("otp");
        setTimer(30);
      },
      onError: (err) => {
        toast.error((err as Error).message);
      },
    });
  };

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
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <Icons.X className="w-6 h-6" />
        </button>

        {user ? (
          // --- LOGGED IN VIEW ---
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#F5F0E6] rounded-full flex items-center justify-center mx-auto text-primary-dark">
              <Icons.User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">
                Welcome Back!
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Logged in as:{" "}
                <span className="font-mono">
                  {user?.uid?.substring(0, 8)}...
                </span>
              </p>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-6 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-primary-dark">
                Order History <Icons.ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSignOut}
                className="w-full py-3 px-6 text-red-600 font-bold hover:bg-red-50 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Sign Out <Icons.LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // --- AUTHENTICATION FLOW ---
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-serif text-primary-dark">
                {step === "email" ? "Join the Club" : "Enter OTP"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {step === "email"
                  ? "Enter your email to receive a secure login code."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all"
                />
                {isSendError && (
                  <p className="text-red-500 text-sm text-left">
                    Failed to send OTP. Please try again.
                  </p>
                )}
                <Button type="submit" disabled={isSending} variant={"rounded"}>
                  {isSending ? "Sending..." : "Send Login Code"}
                  {!isSending && <Icons.ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  pattern="\d*"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center text-3xl tracking-[0.5em] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark outline-none font-mono"
                  placeholder="••••••"
                />
                {isVerifyError && (
                  <p className="text-red-500 text-sm">
                    Invalid or expired OTP. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className="w-full bg-primary-dark text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isVerifying ? "Verifying..." : "Verify & Login"}
                </button>

                <div className="text-sm text-gray-500 pt-2">
                  {timer > 0 ? (
                    <p>
                      Resend code in <span className="font-bold">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => sendOtp(email)}
                      className="text-primary-dark font-bold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            )}

            <p className="text-[10px] text-gray-400 uppercase tracking-widest pt-4">
              Secure session management enabled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
