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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary-dark/10 mb-8">
      <Text
        as="h4"
        className="text-base font-bold text-primary-dark uppercase tracking-widest mb-1"
      >
        Check Delivery Availability
      </Text>
      <Text as="p" className="text-sm text-primary-dark/60 mb-4">
        Enter your pincode to see eligibility and shipping.
      </Text>

      <form
        onSubmit={handleCheckPincode}
        className="flex gap-4 items-center mb-4"
      >
        <div className="relative flex-1">
          <Icons.MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-dark/40" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="w-full pl-11 pr-4 py-4 text-primary-dark font-bold tracking-widest bg-white border border-gray-200 rounded-2xl text-base focus:border-primary-dark outline-none transition-all"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="px-6 py-4 h-auto rounded-2xl border-gray-200 text-primary-dark text-sm font-bold uppercase tracking-widest hover:border-primary-dark"
        >
          Check <Icons.ArrowRight className="w-4 h-4 ml-2 inline" />
        </Button>
      </form>

      {/* SUCCESS STATE UI - Now only shows the message, no date picker! */}
      {isPincodeValid === true && (
        <div className="space-y-4 animate-in fade-in">
          <div className="px-5 py-4 border border-gray-100 rounded-2xl flex items-center gap-3 bg-white shadow-sm">
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full shrink-0" />
            <Text as="p" className="text-sm text-primary-dark">
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
        <div className="mt-4 p-5 bg-[#FFF0F0] border border-[#FFD6D6] rounded-2xl animate-in fade-in">
          <Text as="p" className="text-sm text-[#A32A2A] leading-relaxed">
            Delivery is not available for this product in your location. You can
            check our{" "}
            <button
              type="button"
              onClick={onPanIndiaClick}
              className="cursor-pointer font-bold uppercase underline underline-offset-4 hover:text-red-900 transition-colors"
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
