import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useAuthStore } from "~/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_API_URL } from "~/lib/utils";
import Cookies from "js-cookie";

export const BirthdayModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, updateUser } = useAuthStore();

  // If logged in, we don't need them to type their email
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Auto-close after success[cite: 7]
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  // React Query Mutation to update profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { dob: string; email?: string }) => {
      // If user is logged in, send PATCH to DB
      if (user) {
        const res = await fetch(`${BACKEND_API_URL}/users/profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({ dob: data.dob }),
        });
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      } else {
        const res = await fetch(`${BACKEND_API_URL}/marketing/birthday`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, dob: data.dob }),
        });
        if (!res.ok) throw new Error("Failed to save guest data");
        return res.json();
      }
    },
    onSuccess: () => {
      if (user) {
        updateUser({ ...user, dob });
      }
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ dob, email: user ? undefined : email });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90%] overflow-hidden relative animate-fade-in-up border border-primary-dark/10">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-primary-dark/40 hover:text-primary-dark transition-colors"
        >
          <Icons.X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-4">🎁</span>
            <Text
              as="h2"
              className="text-3xl font-frista text-primary-dark leading-tight mb-3"
            >
              Make Your Birthday Month Even Better!
            </Text>
            <Text
              as="p"
              className="text-primary-dark/70 font-satoshi text-sm md:text-base font-light"
            >
              Share your birthday to receive an exclusive discount code valid
              for your entire birthday month.
            </Text>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ONLY show email if user is NOT logged in */}
              {!user && (
                <div className="space-y-2">
                  <Text
                    as="span"
                    className="block text-xs font-bold uppercase tracking-wider text-primary-dark/60 font-satoshi"
                  >
                    Email Address
                  </Text>
                  <input
                    type="email"
                    required
                    placeholder="sweets@mail.com"
                    className="w-full px-4 py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark outline-none font-satoshi"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              {/* DOB Input[cite: 7] */}
              <div className="space-y-2">
                <Text
                  as="span"
                  className="block text-xs font-bold uppercase tracking-wider text-primary-dark/60 font-satoshi"
                >
                  Date of Birth
                </Text>
                <div className="relative w-full sm:w-auto flex-1">
                  <input
                    type="date"
                    required
                    max={today}
                    className="w-full px-4 py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark outline-none font-satoshi text-primary-dark"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-dark/50">
                    <Icons.Calendar className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {updateProfileMutation.isError && (
                <p className="text-red-500 text-sm text-center">
                  Failed to save. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full h-12 text-lg font-satoshi font-medium"
              >
                {updateProfileMutation.isPending
                  ? "Saving..."
                  : "Get My Birthday Treat"}
              </Button>

              <div className="bg-primary-dark/5 p-4 rounded-xl border border-primary-dark/5">
                <Text
                  as="p"
                  className="text-[10px] text-primary-dark/50 leading-relaxed text-center font-satoshi"
                >
                  *To ensure fairness, dates of birth cannot be changed once
                  submitted.
                </Text>
              </div>
            </form>
          ) : (
            // Success Message[cite: 7]
            <div className="text-center py-10 animate-fade-in flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Icons.Check className="w-10 h-10 text-green-600" />
              </div>
              <Text
                as="h3"
                className="text-2xl font-frista text-primary-dark mb-2"
              >
                You&apos;re on the list!
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
