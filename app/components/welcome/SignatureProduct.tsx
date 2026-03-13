import { useCityStore } from "~/store/useCityStore";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Locations } from "~/common/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "../icons";

export default function SignatureProduct() {
  const { selectedCityLabel } = useCityStore();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#F5F0E6] min-h-[80vh] py-20 flex justify-center px-4 md:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-dark/5 rounded-l-full z-0"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-primary-dark rounded-2xl transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-[#F5F0E6] bg-white">
            <img
              src="https://better-dessert.s3.eu-north-1.amazonaws.com/products/c097b797-f590-496b-befe-8235b47f3c99.avif"
              alt="The Signature Caszel"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="absolute -bottom-6 hidden sm:flex md:-left-8 bg-white py-3 px-6 rounded-full shadow-xl items-center gap-3 border border-primary-dark/5">
            <span className="text-yellow-500 text-xl">★</span>
            <Text
              as="span"
              className="font-satoshi font-bold text-primary-dark"
            >
              4.9/5
            </Text>
            <Text
              as="span"
              className="font-satoshi text-xs text-primary-dark/50 whitespace-nowrap"
            >
              (2k+ cravings satisfied)
            </Text>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start text-left pt-8 md:pt-0">
          <Text
            as="span"
            className="text-sm md:text-base tracking-[0.2em] uppercase text-primary-dark/60 mb-4 font-bold font-satoshi"
          >
            Chef&apos;s Creation
          </Text>

          <Text
            as="h2"
            variant={"secondary"}
            className="text-5xl md:text-7xl  text-primary-dark mb-6 leading-[1.1]"
          >
            The Signature <br className="hidden md:block" /> Caszel
          </Text>

          <Text
            as="p"
            className="text-lg md:text-xl font-satoshi font-light text-primary-dark/80 mb-8 max-w-md leading-relaxed"
          >
            A perfect symphony of roasted cashews and rich hazelnut truffle.
            Crafted without a single grain of white sugar or maida, this is
            indulgence redefined.
          </Text>

          <div className="flex flex-wrap items-center gap-8">
            {/* Wrapper div to capture hover events even when button is disabled */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowToast(true)}
              onMouseLeave={() => setShowToast(false)}
            >
              <Button
                disabled={selectedCityLabel !== Locations.GURGAON}
                onClick={() => navigate("/collection")}
                variant="default"
                className="group flex items-center gap-3 px-10 h-14 text-lg font-satoshi disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedCityLabel === null
                  ? "Select your location"
                  : selectedCityLabel !== Locations.GURGAON
                    ? "Not deliverable"
                    : "Shop Now"}

                <Icons.ChevronRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </Button>

              {showToast && selectedCityLabel !== Locations.GURGAON && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-primary-dark text-[#F5F0E6] text-xs font-satoshi font-bold px-4 py-2 rounded-md shadow-lg z-50 whitespace-nowrap animate-fade-in-up pointer-events-none">
                  Available for delivery or pickup only in Gurgaon
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-primary-dark rotate-45"></div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Text
                as="span"
                className="text-2xl font-bold text-primary-dark font-satoshi"
              >
                ₹599
              </Text>
              <Text
                as="span"
                className="text-xs text-primary-dark/50 font-satoshi uppercase tracking-widest"
              >
                Pack of 3
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
