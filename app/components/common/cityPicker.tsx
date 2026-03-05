import React, { useState, useRef, useEffect } from "react";
import { useCityStore } from "~/store/useCityStore";
import { Text } from "../ui/text";
import { MapPin, ChevronDown, Check } from "lucide-react";

const AVAILABLE_LOCATIONS = [
  { id: "gurgaon", label: "GURGAON" },
  { id: "delhi-ncr", label: "DELHI / NCR" },
  { id: "pan-india", label: "PAN INDIA" },
];

export const CityPicker = () => {
  const { selectedCityId, selectedCityLabel, setCity } = useCityStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  if (!selectedCityLabel) return null;

  const handleSelectLocation = (id: string, label: string) => {
    setCity(id, label);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* Slim Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center border-primary-dark border  gap-1.5 cursor-pointer hover:bg-primary-dark/5 px-3 py-1.5 rounded-md transition-all duration-300"
      >
        <MapPin size={14} className="text-primary-dark/70" />

        {/* Single-line text for Navbar compatibility */}
        <div className="flex items-baseline gap-1.5">
          <Text
            as="span"
            className="text-xs font-satoshi font-bold text-primary-dark tracking-wide uppercase"
          >
            {selectedCityLabel}
          </Text>
        </div>

        <ChevronDown
          size={12}
          className={`text-primary-dark/60 ml-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "group-hover:translate-y-0.5"
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#F5F0E6] border border-primary-dark/10 rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in-up">
          <div className="py-1 flex flex-col">
            {AVAILABLE_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id, loc.label)}
                className="w-full text-left px-4 py-2.5 hover:bg-primary-dark/5 transition-colors flex items-center justify-between group/item"
              >
                <Text
                  as="span"
                  className={`font-satoshi font-bold text-xs tracking-widest transition-colors ${
                    selectedCityId === loc.id
                      ? "text-primary-dark"
                      : "text-primary-dark/60 group-hover/item:text-primary-dark"
                  }`}
                >
                  {loc.label}
                </Text>
                {selectedCityId === loc.id && (
                  <Check size={14} className="text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
