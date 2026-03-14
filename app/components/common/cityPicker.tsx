import React, { useState, useRef, useEffect } from "react";
import { useCityStore } from "~/store/useCityStore";
import { Text } from "../ui/text";

import { Locations } from "~/common/types";
import { Icons } from "../icons";
import { useLocation } from "react-router";

// 1. Added 'label' back so the UI displays nicely formatted names
const AVAILABLE_LOCATIONS = [
  { id: "gurgaon", label: "GURGAON", value: Locations.GURGAON },
  { id: "delhi-ncr", label: "DELHI / NCR", value: Locations.DELHI_NCR },
  { id: "pan-india", label: "PAN INDIA", value: Locations.PAN_INDIA },
];

export const CityPicker = () => {
  const { selectedCityId, setCity } = useCityStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, []);

  const handleSelectLocation = (id: string, value: Locations) => {
    setCity(id, value);
    setIsOpen(false);
  };

  // 3. Look up the pretty label. If nothing is selected, default to "Select City"
  const displayLabel = selectedCityId
    ? AVAILABLE_LOCATIONS.find((loc) => loc.id === selectedCityId)?.label
    : "Select City";

  if (location.pathname === "/checkout") {
    return;
  }

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* Slim Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group border-primary-dark hover:bg-primary-dark/5 flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 transition-all duration-300"
      >
        <Icons.MapPin size={14} className="text-primary-dark/70" />

        <div className="flex items-baseline gap-1.5">
          <Text
            as="span"
            className="text-primary-dark text-xs font-bold tracking-wide uppercase"
          >
            {/* 4. This will now show either the city or "Select City" */}
            {displayLabel}
          </Text>
        </div>

        <Icons.ChevronDown
          size={12}
          className={`text-primary-dark/60 ml-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "group-hover:translate-y-0.5"
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="border-primary-dark/10 animate-fade-in-up absolute top-full left-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border bg-[#F5F0E6] shadow-lg">
          <div className="flex flex-col py-1">
            {AVAILABLE_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id, loc.value)}
                className="hover:bg-primary-dark/5 group/item flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors"
              >
                <Text
                  as="span"
                  className={`text-xs font-bold tracking-widest transition-colors ${
                    selectedCityId === loc.id
                      ? "text-primary-dark"
                      : "text-primary-dark/60 group-hover/item:text-primary-dark"
                  }`}
                >
                  {loc.label}
                </Text>
                {selectedCityId === loc.id && (
                  <Icons.Check size={14} className="text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
