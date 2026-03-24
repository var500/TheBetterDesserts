import React from "react";
import { Text } from "../ui/text";

import { Link } from "react-router";

export default function Privacy() {
  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] px-4 py-24 selection:text-[#F5F0E6] md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Page Header */}
        <header className="space-y-6 text-center">
          <Text
            as="h1"
            className="text-primary-dark text-5xl tracking-wide uppercase md:text-7xl"
          >
            Privacy Policy
          </Text>
          <div className="bg-primary-dark/20 mx-auto h-1 w-24 rounded-full"></div>
        </header>

        {/* Policy Content Card */}
        <div className="flex flex-col items-center gap-4">
          <Text variant={"primary"} className="text-center text-xl">
            The Better Desserts which sometimes refers to itself as “we” or “us”
            in this Privacy Policy, is committed to protecting your privacy.
            This Privacy Policy explains our data collection and processing
            practices and your options regarding the use of your personal data.
            If you have any requests or questions concerning your personal
            information, please contact us at
          </Text>

          <Link
            to="mailto:thebetterdesserts.com"
            className="text-primary-dark text-xl underline"
          >
            info@thebetterdesserts.com
          </Link>
        </div>
      </div>
    </div>
  );
}
