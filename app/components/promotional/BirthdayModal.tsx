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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-md">
      <div className="animate-fade-in-up border-primary-dark/10 relative max-h-[90%] w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="text-primary-dark/40 hover:text-primary-dark absolute top-4 right-4 cursor-pointer transition-colors"
        >
          <Icons.X size={24} />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center">
            <span className="mb-4 block text-4xl">🎁</span>
            <Text
              as="h2"
              className="text-primary-dark mb-3 text-3xl leading-tight"
            >
              Make Your Birthday Month Even Better!
            </Text>
            <Text
              as="p"
              className="text-primary-dark/70 text-sm font-light md:text-base"
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
                    className="text-primary-dark/60 block text-xs font-bold tracking-wider uppercase"
                  >
                    Email Address
                  </Text>
                  <input
                    type="email"
                    required
                    placeholder="sweets@mail.com"
                    className="border-primary-dark/10 focus:ring-primary-dark w-full rounded-xl border bg-white/50 px-4 py-3 outline-none focus:ring-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              {/* DOB Input[cite: 7] */}
              <div className="space-y-2">
                <Text
                  as="span"
                  className="text-primary-dark/60 block text-xs font-bold tracking-wider uppercase"
                >
                  Date of Birth
                </Text>
                <div className="relative w-full flex-1 sm:w-auto">
                  <input
                    type="date"
                    required
                    max={today}
                    className="border-primary-dark/10 focus:ring-primary-dark text-primary-dark w-full rounded-xl border bg-white/50 px-4 py-3 outline-none focus:ring-2"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <div className="text-primary-dark/50 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                    <Icons.Calendar className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {updateProfileMutation.isError && (
                <p className="text-center text-sm text-red-500">
                  Failed to save. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="h-12 w-full text-lg font-medium"
              >
                {updateProfileMutation.isPending
                  ? "Saving..."
                  : "Get My Birthday Treat"}
              </Button>

              <div className="bg-primary-dark/5 border-primary-dark/5 rounded-xl border p-4">
                <Text
                  as="p"
                  className="text-primary-dark/50 text-center text-[10px] leading-relaxed"
                >
                  *To ensure fairness, dates of birth cannot be changed once
                  submitted.
                </Text>
              </div>
            </form>
          ) : (
            // Success Message[cite: 7]
            <div className="animate-fade-in flex flex-col items-center py-10 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Icons.Check className="h-10 w-10 text-green-600" />
              </div>
              <Text as="h3" className="text-primary-dark mb-2 text-2xl">
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
