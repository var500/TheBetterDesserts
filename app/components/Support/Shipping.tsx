import React from "react";
import { Icons } from "../icons";
import { Text } from "../ui/text";

export default function Shipping() {
  return (
    <div className="bg-[#F5F0E6] text-primary-dark min-h-screen py-24 px-4 md:px-8 lg:px-12 font-satoshi selection:bg-primary-dark selection:text-[#F5F0E6]">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Page Header */}
        <header className="text-center space-y-6">
          <Text
            as="h1"
            className="text-5xl md:text-7xl font-frista tracking-wide uppercase text-primary-dark"
          >
            Shipping Policy
          </Text>
          <div className="w-24 h-1 bg-primary-dark/20 rounded-full mx-auto"></div>
          <Text
            as="p"
            className="text-lg md:text-xl font-medium opacity-80 max-w-2xl mx-auto"
          >
            From our oven to your doorstep—here is everything you need to know
            about how we handle your treats.
          </Text>
        </header>

        {/* Policy Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-dark/5 p-8 md:p-16 space-y-12">
          {/* Main Statement */}
          <section className="text-center md:text-left border-b border-primary-dark/5 pb-12">
            <Text
              as="p"
              className="text-xl md:text-2xl leading-relaxed text-primary-dark/90 font-medium italic"
            >
              &quot;At The Better Desserts, we take great care in delivering
              your products to you. We partner only with reputed national
              couriers to ensure your treats arrive in perfect condition.&quot;
            </Text>
          </section>

          {/* Core Policies Grid */}
          <div className="grid grid-cols-1  gap-x-12 gap-y-10">
            {/* Payment Policy */}
            <div className="flex gap-4">
              <Icons.ShieldCheck className="w-6 h-6 shrink-0 text-primary-dark/60" />
              <div>
                <Text
                  as="h3"
                  className="font-bold text-lg mb-2 uppercase tracking-wider"
                >
                  Secure Payments
                </Text>
                <Text as="p" className="text-primary-dark/70 leading-relaxed">
                  All treats are baked fresh on order, hence we do not offer
                  Cash on Delivery (COD) options.
                </Text>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex gap-4">
              <Icons.Clock className="w-6 h-6 shrink-0 text-primary-dark/60" />
              <div>
                <Text
                  as="h3"
                  className="font-bold text-lg mb-2 uppercase tracking-wider"
                >
                  Delivery Timeline
                </Text>
                <Text as="p" className="text-primary-dark/70 leading-relaxed">
                  Pan India Orders are shipped within 48 hours. You would
                  receive your order in 3-5 days depending upon your location.
                </Text>
              </div>
            </div>
          </div>

          {/* International Policy Footer */}
          <div className="bg-[#F5F0E6] p-6 rounded-2xl text-center border border-primary-dark/10">
            <Text
              as="p"
              className="text-sm font-bold uppercase tracking-widest text-primary-dark/60 flex items-center justify-center gap-2"
            >
              <Icons.Globe className="w-4 h-4" />
              Note: We currently do not ship outside India.
            </Text>
          </div>
        </div>

        {/* Quick Links / CTA */}
        <div className="text-center space-y-4">
          <Text as="p" className="text-primary-dark/60 font-medium">
            Have more questions?
          </Text>
          <div className="flex justify-center gap-6">
            <a
              href="/contact"
              className="text-primary-dark font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="text-primary-dark font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
