import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface DeliveryAvailabilityProps {
  pincode: string;
  pincodeMessage: string;
  isPincodeValid: boolean | null;
  handlePincodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckPincode: (e: React.FormEvent) => void;
  onPanIndiaClick: () => void;
}

export default function DeliveryAvailability({
  pincode,
  pincodeMessage,
  isPincodeValid,
  handlePincodeChange,
  handleCheckPincode,
  onPanIndiaClick,
}: DeliveryAvailabilityProps) {
  return (
    <div className="border-primary-dark/10 mb-8 rounded-3xl border bg-white p-6 shadow-sm">
      <Text
        as="h4"
        className="text-primary-dark mb-1 text-base font-bold tracking-widest uppercase"
      >
        Check Delivery Availability
      </Text>
      <Text as="p" className="text-primary-dark/60 mb-4 text-sm">
        Enter your pincode to see eligibility and shipping.
      </Text>

      <form
        onSubmit={handleCheckPincode}
        className="mb-4 flex items-center gap-4"
      >
        <div className="relative flex-1">
          <Icons.MapPin className="text-primary-dark/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="text-primary-dark focus:border-primary-dark w-full rounded-2xl border border-gray-200 bg-white py-4 pr-4 pl-11 text-base font-bold tracking-widest transition-all outline-none"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="text-primary-dark hover:border-primary-dark h-auto rounded-2xl border-gray-200 px-6 py-4 text-sm font-bold tracking-widest uppercase"
        >
          Check <Icons.ArrowRight className="ml-2 inline h-4 w-4" />
        </Button>
      </form>

      {/* SUCCESS STATE UI - Now only shows the message, no date picker! */}
      {isPincodeValid === true && (
        <div className="animate-in fade-in space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
            <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-green-500" />
            <Text as="p" className="text-primary-dark text-sm">
              <span className="font-bold">{pincodeMessage.split(".")[0]}.</span>
              <span className="text-primary-dark/70">
                {pincodeMessage.substring(pincodeMessage.indexOf(".") + 1)}
              </span>
            </Text>
          </div>
        </div>
      )}

      {/* ERROR STATE UI */}
      {isPincodeValid === false && (
        <div className="animate-in fade-in mt-4 rounded-2xl border border-[#FFD6D6] bg-[#FFF0F0] p-5">
          <Text as="p" className="text-sm leading-relaxed text-[#A32A2A]">
            Delivery is not available for this product in your location. You can
            check our{" "}
            <button
              type="button"
              onClick={onPanIndiaClick}
              className="cursor-pointer font-bold uppercase underline underline-offset-4 transition-colors hover:text-red-900"
            >
              PAN INDIA PRODUCTS
            </button>{" "}
            which is available for PAN INDIA DELIVERY.
          </Text>
        </div>
      )}
    </div>
  );
}
