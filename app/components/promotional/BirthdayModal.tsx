import React, { useEffect, useState } from "react";

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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem(
      "birthdayPromo",
      JSON.stringify({ email, dob }),
    );
    console.log("Submitting:", { email, dob });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors text-2xl leading-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-4xl block mb-3">🎁</span>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Make Your Birthday Month Even Better!
            </h2>
            <p className="text-gray-600 text-sm">
              Share your birthday and email to receive an exclusive discount
              code valid for your entire birthday month.
            </p>
          </div>

          {/* Form / Success State */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* DOB Input */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  required
                  max={today} // Native browser validation to prevent future dates
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm text-gray-700"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-2 shadow-md hover:shadow-lg"
              >
                Get My Birthday Treat
              </button>

              {/* Anti-Exploit Microcopy */}
              <div className="bg-gray-50 p-3 rounded-md mt-4 border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed text-center">
                  *To ensure fairness, dates of birth cannot be changed once
                  submitted. Sign-ups during your birthday month will activate
                  the following year. Codes are securely tied to your email
                  address.
                </p>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You're on the list!
              </h3>
              <p className="text-gray-600">
                Keep an eye on your inbox. We'll send you a verification link
                shortly to confirm your email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
