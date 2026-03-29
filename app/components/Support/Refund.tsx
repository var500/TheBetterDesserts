import React from "react";
import { Text } from "../ui/text";

export default function Refund() {
  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] px-4 py-24 selection:text-[#F5F0E6] md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Page Header */}
        <header className="space-y-6 text-center">
          <Text
            as="h1"
            className="text-primary-dark text-5xl tracking-wide uppercase md:text-6xl"
          >
            Refund Policy
          </Text>
          <div className="bg-primary-dark/20 mx-auto h-1 w-24 rounded-full"></div>
        </header>

        {/* Policy Content Card */}

        <ul className="list-disc text-justify text-xl">
          <li className="mb-4">
            <Text>
              Cancellation requests must be raised at least one day prior to the
              delivery or pickup date.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              Same-day cancellations are not permitted, and no refunds shall be
              processed for such requests.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              In the event of unforeseen circumstances, The Better Desserts
              reserves the right to cancel any order and initiate a refund
              within 48 hours of fulfillment. Customers shall be notified in
              advance in such cases.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              In the event of a payment discrepancy, the final transaction
              status will be confirmed by our payment gateway partner, Razorpay.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              Refunds or replacements will be considered only for
              quality-related concerns reported to our support team within 24–48
              hours of delivery, subject to internal evaluation. Customers are
              requested to retain product images and the batch number to
              facilitate quicker resolution. Requests raised beyond this period
              will not be eligible.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              Customers are requested to connect with the support team during
              official communication hours: 10:00 AM to 6:00 PM, 7 days a week.
            </Text>
          </li>
          <li className="mb-4">
            <Text>
              Cancellation requests must be raised at least one day prior to the
              delivery or pickup date.
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
}
