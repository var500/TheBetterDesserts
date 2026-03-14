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
    <section className="relative flex min-h-[80vh] justify-center overflow-hidden bg-[#F5F0E6] px-4 py-20 md:px-8">
      <div className="bg-primary-dark/5 absolute top-0 right-0 z-0 h-full w-1/3 rounded-l-full"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row lg:gap-24">
        <div className="group relative mx-auto w-full max-w-sm">
          <div className="bg-primary-dark absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>

          <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-[#F5F0E6] bg-white shadow-xl">
            <img
              src="https://better-dessert.s3.eu-north-1.amazonaws.com/products/18db2412-a3d1-4762-ab07-f375c42554e8.jpg"
              alt="The Signature Caszel"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating Badge (Unchanged) */}
          <div className="border-primary-dark/5 absolute -bottom-6 z-10 hidden items-center gap-3 rounded-full border bg-white px-6 py-3 shadow-xl sm:flex md:-left-8">
            <span className="text-xl text-yellow-500">★</span>
            <Text as="span" className="text-primary-dark font-bold">
              4.9/5
            </Text>
            <Text
              as="span"
              className="text-primary-dark/50 text-xs whitespace-nowrap"
            >
              (2k+ cravings satisfied)
            </Text>
          </div>
        </div>

        <div className="flex w-full flex-col items-start pt-8 text-left md:w-1/2 md:pt-0">
          <Text
            as="span"
            className="text-primary-dark/60 mb-4 text-sm font-bold tracking-[0.2em] uppercase md:text-base"
          >
            Chef&apos;s Creation
          </Text>

          <Text
            as="h2"
            variant={"secondary"}
            className="text-primary-dark mb-6 text-5xl leading-[1.1] md:text-6xl"
          >
            The Signature <br className="hidden md:block" />
            <Text as={"span"} className="text-6xl uppercase md:text-7xl">
              Caszel
            </Text>
          </Text>

          <Text
            as="p"
            className="text-primary-dark/80 mb-8 max-w-md text-lg leading-relaxed font-light md:text-xl"
          >
            Caszel is our signature gourmet chocolate–nut dessert featuring a
            nourishing base of amaranth, quinoa, and dates, layered with smooth
            cashew butter and caramelised hazelnuts, enrobed in dark Belgian
            chocolate.
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
                className="group flex h-14 items-center gap-3 px-10 text-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {selectedCityLabel === null
                  ? "Select your location"
                  : selectedCityLabel !== Locations.GURGAON
                    ? "Not deliverable"
                    : "Shop Now"}

                <Icons.ChevronRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </Button>

              {showToast && selectedCityLabel !== Locations.GURGAON && (
                <div className="bg-primary-dark animate-fade-in-up pointer-events-none absolute -bottom-12 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-xs font-bold whitespace-nowrap text-[#F5F0E6] shadow-lg">
                  Available for delivery or pickup only in Gurgaon
                  <div className="bg-primary-dark absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45"></div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Text
                as="span"
                variant={"primary"}
                className="text-primary-dark text-2xl font-bold"
              >
                ₹550{" "}
                <Text as={"span"} className="text-sm font-thin md:text-base">
                  +gst
                </Text>
              </Text>
              <Text
                as="span"
                className="text-primary-dark text-xs tracking-widest uppercase"
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
