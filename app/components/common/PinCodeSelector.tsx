import React, { useState } from "react";
import { Text } from "../ui/text";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useCityStore } from "~/store/useCityStore";
import { Locations } from "~/common/types";

export default function PinCodeSelector() {
  const { selectedCityId, selectedCityLabel, setCity } = useCityStore();
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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-dark/10 mt-8">
      <Text as="h3" className=" font-bold text-primary-dark mb-2">
        Check Delivery Availability
      </Text>
      <Text as="p" className="text-sm text-primary-dark/70  mb-4">
        Enter your pincode to see fresh desserts and cookies available in your
        area.
      </Text>

      <form
        onSubmit={handleCheckPincode}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        <div className="relative flex-1 w-full">
          <Icons.MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-dark/40" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="w-full pl-10 pr-4 py-3 text-primary-dark bg-white border border-primary-dark/10 rounded-xl text-sm focus:ring-2 focus:ring-primary-dark focus:border-transparent outline-none transition-all"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="sm-to-default"
          className="px-8 whitespace-nowrap rounded-2xl w-full md:w-auto md:h-12"
        >
          Check
        </Button>
      </form>
      {pincodeError && (
        <Text as="p" className="text-red-500 text-xs mt-2 text-left ">
          {pincodeError}
        </Text>
      )}
    </div>
  );
}
