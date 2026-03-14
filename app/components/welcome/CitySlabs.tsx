import React from "react";
import { Text } from "../ui/text";
import { useCityStore } from "~/store/useCityStore";
import { locations } from "~/constants";
import type { Zone } from "~/common/types";

export const LocationSelector: React.FC = () => {
  const setCity = useCityStore((state) => state.setCity);

  const handleSelection = (loc: { id: string; label: Zone }) => {
    setCity(loc.id, loc.label);
  };

  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center bg-[#F5F0E6] px-4 pt-12 md:px-8 md:pt-20 lg:px-12">
      <Text
        as="h1"
        className="text-primary-dark mb-12 text-center text-4xl leading-tight md:mb-24 md:text-6xl"
      >
        Select your <br className="md:hidden" /> Delivery Destination
      </Text>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() =>
              handleSelection({ ...loc, label: loc.label as Zone })
            }
            className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-[2.5rem] border-4 border-white/20 shadow-2xl transition-all duration-500 hover:-translate-y-2 md:h-112.5"
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
            <div className="from-primary-dark/90 via-primary-dark/20 absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:opacity-80" />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-10 pb-16">
              <Text
                as="span"
                className="text-center text-3xl font-black tracking-[0.2em] text-white uppercase transition-all duration-500 group-hover:tracking-[0.25em] lg:text-4xl"
              >
                {loc.label}
              </Text>

              {/* Added a subtle "Deliver Here" hint on hover */}
              <Text
                as="span"
                className="mt-4 translate-y-4 transform text-xs font-bold tracking-[0.3em] text-white/60 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
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
