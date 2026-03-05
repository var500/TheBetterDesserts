import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export const BirthdayModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem(
      "birthdayPromo",
      JSON.stringify({ email, dob }),
    );
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90%] overflow-hidden relative animate-fade-in-up border border-primary-dark/10">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-primary-dark/40 hover:text-primary-dark transition-colors"
          aria-label="Close modal"
        >
          <Icons.X size={24} />
        </button>

        <div className="p-8">
          {/* Header */}
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
              Share your birthday and email to receive an exclusive discount
              code valid for your entire birthday month.
            </Text>
          </div>

          {/* Form / Success State */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
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
                  className="w-full px-4 py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all font-satoshi"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* DOB Input */}
              <div className="space-y-2">
                <Text
                  as="span"
                  className="block text-xs font-bold uppercase tracking-wider text-primary-dark/60 font-satoshi"
                >
                  Date of Birth
                </Text>
                <input
                  type="date"
                  required
                  max={today}
                  className="w-full px-4 py-3 bg-white/50 border border-primary-dark/10 rounded-xl focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all font-satoshi text-primary-dark"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                className="w-full h-12 text-lg font-satoshi font-medium"
              >
                Get My Birthday Treat
              </Button>

              {/* Anti-Exploit Microcopy */}
              <div className="bg-primary-dark/5 p-4 rounded-xl border border-primary-dark/5">
                <Text
                  as="p"
                  className="text-[10px] text-primary-dark/50 leading-relaxed text-center font-satoshi"
                >
                  *To ensure fairness, dates of birth cannot be changed once
                  submitted. Sign-ups during your birthday month will activate
                  the following year.
                </Text>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-10 animate-fade-in flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Text
                as="h3"
                className="text-2xl font-frista text-primary-dark mb-2"
              >
                You're on the list!
              </Text>
              <Text
                as="p"
                className="text-primary-dark/70 font-satoshi font-light"
              >
                Keep an eye on your inbox. We'll send your treat shortly.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
