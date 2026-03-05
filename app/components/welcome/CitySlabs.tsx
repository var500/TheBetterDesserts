import React from "react";
import { Text } from "../ui/text";
import { useCityStore } from "~/store/useCityStore";
import { locations } from "~/constants";

export const LocationSelector: React.FC = () => {
  const setCity = useCityStore((state) => state.setCity);

  const handleSelection = (loc: { id: string; label: string }) => {
    setCity(loc.id, loc.label);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-20 flex flex-col justify-center min-h-[80vh] bg-[#F5F0E6]">
      <Text
        as="h1"
        className="text-4xl md:text-6xl font-frista text-center text-primary-dark mb-12 md:mb-24 leading-tight"
      >
        Select your <br className="md:hidden" /> Delivery Destination
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => handleSelection(loc)}
            className="relative h-72 md:h-112.5 w-full rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500 hover:-translate-y-2 border-4 border-white/20"
          >
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${loc.bgUrl})`,
                backgroundPosition: "center",
              }}
            />

            {/* Gradient Overlay optimized for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-10 pb-16">
              <Text
                as="span"
                className="text-white text-3xl lg:text-4xl font-satoshi font-black tracking-[0.2em] uppercase text-center transition-all duration-500 group-hover:tracking-[0.25em]"
              >
                {loc.label}
              </Text>

              {/* Added a subtle "Deliver Here" hint on hover */}
              <Text
                as="span"
                className="text-white/60 text-xs font-satoshi font-bold tracking-[0.3em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
              >
                Deliver Here
              </Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationSelector;
