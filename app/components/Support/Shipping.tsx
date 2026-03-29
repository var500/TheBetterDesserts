import React from "react";
import { Icons } from "../icons";
import { Text } from "../ui/text";

export default function Shipping() {
  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] px-4 py-24 selection:text-[#F5F0E6] md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Page Header */}
        <header className="space-y-6 text-center">
          <Text
            as="h1"
            className="text-primary-dark text-5xl tracking-wide uppercase md:text-7xl"
          >
            Shipping Policy
          </Text>
          <div className="bg-primary-dark/20 mx-auto h-1 w-24 rounded-full"></div>
          <Text
            as="p"
            className="mx-auto max-w-2xl text-lg font-medium opacity-80 md:text-xl"
          >
            From our oven to your doorstep—here is everything you need to know
            about how we handle your treats.
          </Text>
        </header>

        {/* Policy Content Card */}
        <div className="border-primary-dark/5 space-y-12 rounded-[2.5rem] border bg-white p-8 shadow-sm md:p-16">
          {/* Main Statement */}
          <section className="border-primary-dark/5 border-b pb-12 text-center md:text-left">
            <Text
              as="p"
              className="text-primary-dark/90 text-xl leading-relaxed font-medium italic md:text-2xl"
            >
              &quot;At The Better Desserts, we take great care in delivering
              your products to you. We partner only with reputed national
              couriers to ensure your treats arrive in perfect condition.&quot;
            </Text>
          </section>

          {/* Core Policies Grid */}
          <div className="items grid grid-cols-1 gap-x-12 gap-y-10">
            {/* Payment Policy */}
            <div className="flex gap-4">
              <Icons.ShieldCheck className="text-primary-dark/60 h-6 w-6 shrink-0" />
              <div>
                <Text
                  as="h3"
                  className="mb-2 text-lg font-bold tracking-wider uppercase"
                >
                  Secure Payments
                </Text>
                <Text as="p" className="text-primary-dark/70 leading-relaxed">
                  All treats are baked fresh on order, hence we do not offer
                  Cash on Delivery (COD) options.
                </Text>
              </div>
            </div>
            <div className="flex gap-4">
              <Icons.Truck className="text-primary-dark/60 h-6 w-6 shrink-0" />
              <div>
                <Text
                  as="h3"
                  className="mb-2 text-lg font-bold tracking-wider uppercase"
                >
                  Shipping Charges
                </Text>
                <Text as="p" className="text-primary-dark/70 leading-relaxed">
                  We offer free shipping on all orders above ₹2999. For orders
                  below this amount, a standard delivery fee suggested from our
                  delivery partner applies at checkout.
                </Text>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex gap-4">
              <Icons.Clock className="text-primary-dark/60 h-6 w-6 shrink-0" />
              <div>
                <Text
                  as="h3"
                  className="mb-2 text-lg font-bold tracking-wider uppercase"
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

          <div className="flex gap-4">
            <Icons.MapPin className="text-primary-dark/60 h-6 w-6 shrink-0" />
            <div>
              <Text
                as="h3"
                className="mb-2 text-lg font-bold tracking-wider uppercase"
              >
                Failed Deliveries
              </Text>
              <Text as="p" className="text-primary-dark/70 leading-relaxed">
                As our products are perishable, couriers will only attempt
                delivery once. We cannot offer refunds for failed deliveries due
                to an incorrect address or unavailability at the location.
              </Text>
            </div>
          </div>

          {/* International Policy Footer */}
          <div className="border-primary-dark/10 rounded-2xl border bg-[#F5F0E6] p-6 text-center">
            <Text
              as="p"
              className="text-primary-dark/60 flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase"
            >
              <Icons.Globe className="h-4 w-4" />
              Note: We currently do not ship outside India.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
