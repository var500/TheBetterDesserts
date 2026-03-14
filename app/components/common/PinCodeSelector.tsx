import React, { useState } from "react";
import { Text } from "../ui/text";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useCityStore } from "~/store/useCityStore";
import { Locations } from "~/common/types";

export default function PinCodeSelector() {
  const { setCity } = useCityStore();
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    }

    setPincodeError("");
    if (pincode.startsWith("12")) {
      setCity("gurgaon", Locations.GURGAON);
    } else if (pincode.startsWith("11")) {
      setCity("delhi-ncr", Locations.DELHI_NCR);
    } else {
      setCity("pan-india", Locations.PAN_INDIA);
    }
  };
  return (
    <div className="border-primary-dark/10 mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <Text as="h3" className="text-primary-dark mb-2 font-bold">
        Check Delivery Availability
      </Text>
      <Text as="p" className="text-primary-dark/70 mb-4 text-sm">
        Enter your pincode to see fresh desserts and cookies available in your
        area.
      </Text>

      <form
        onSubmit={handleCheckPincode}
        className="flex flex-col items-center gap-3 md:flex-row"
      >
        <div className="relative w-full flex-1">
          <Icons.MapPin className="text-primary-dark/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="text-primary-dark border-primary-dark/10 focus:ring-primary-dark w-full rounded-xl border bg-white py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-transparent focus:ring-2"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="sm-to-default"
          className="w-full rounded-2xl px-8 whitespace-nowrap md:h-12 md:w-auto"
        >
          Check
        </Button>
      </form>
      {pincodeError && (
        <Text as="p" className="mt-2 text-left text-xs text-red-500">
          {pincodeError}
        </Text>
      )}
    </div>
  );
}
