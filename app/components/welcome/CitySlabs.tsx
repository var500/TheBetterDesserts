import React from "react";

interface LocationSelectorProps {
  onSelectLocation: (locationId: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onSelectLocation,
}) => {
  const locations = [
    {
      id: "gurgaon",
      label: "GURGAON",
      // Note: If using Next.js/Vite, you typically drop "/public" and just use "/cities/..."
      bgUrl: "/cities/cyber-city.png",
    },
    {
      id: "delhi-ncr",
      label: "DELHI / NCR",
      bgUrl: "/cities/india-gate.png",
    },
    {
      id: "pan-india",
      label: "PAN INDIA",
      bgUrl: "/cities/bengaluru.png",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-20 flex flex-col justify-center min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-center font-bold text-gray-800 mb-8 md:mb-20">
        Where should we deliver?
      </h1>

      {/* Changed to a Grid layout: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => onSelectLocation(loc.id)}
            // Standardized heights using arbitrary values to ensure it fits the screen
            className="relative h-64 md:h-100 w-full rounded-3xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 bg-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${loc.bgUrl})`,
                backgroundPosition: "center",
              }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-90" />

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <span className="text-white text-3xl lg:text-4xl font-extrabold tracking-[0.15em] drop-shadow-xl uppercase text-center transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
                {loc.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationSelector;
