import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import Badge from "../ui/badge";
import { useNavigate } from "react-router";
import type { Product } from "~/common/types";

export const Hero = ({
  newLaunchProducts,
}: {
  newLaunchProducts?: Product[];
}) => {
  const navigate = useNavigate();

  return (
    // 1. Adjusted Height: 75vh on mobile, 85vh on md screens
    <section className="relative flex h-[80vh] w-full overflow-hidden md:h-[85vh]">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="h-full w-full pb-8 md:pb-0" // Added pb-8 on mobile so pagination dots don't overlap text
        style={
          {
            "--swiper-pagination-color": "#F5F0E6",
            "--swiper-navigation-size": "2rem",
          } as React.CSSProperties
        }
      >
        {/* SLIDE 1: Main Brand Logo */}
        <SwiperSlide className="bg-primary-dark relative overflow-hidden">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-4 py-8 text-center text-white select-none">
            <img
              src="/brand/betterDesserts.jpeg"
              alt="Brand Logo"
              className="h-56 w-56 rounded-lg object-contain md:h-[55%] md:w-[55%]"
            />

            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold tracking-wide md:text-4xl">
                India&apos;s Finest Clean Dessert Brand
              </h2>
              <p className="text-xs font-medium tracking-wider text-gray-200 uppercase md:text-sm">
                Refined Sugar Free{" "}
                <span className="mx-1 opacity-50 md:mx-2">|</span>
                Refined Flour Free{" "}
                <span className="mx-1 opacity-50 md:mx-2">|</span>
                Palm Oil Free
              </p>
            </div>

            {/* Call to Action */}
            <Button
              variant={"light"}
              size={"sm-to-default"}
              onClick={() => navigate("/collection")}
              className="mt-2"
            >
              Shop Now
            </Button>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: The Better Cakes */}
        <SwiperSlide className="relative overflow-hidden bg-[#efe7d4]">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-0 px-6 text-center select-none md:gap-10">
            <img
              src="/brand/betterCakes.png"
              alt="Better Cakes Logo"
              className="h-90 w-90 object-contain md:h-[70%] md:w-[70%]"
            />
            <Button variant={"default"} size={"sm-to-default"}>
              Shop Now
            </Button>
          </div>
        </SwiperSlide>

        {/* SLIDE 4: Dynamic New Launch Showcase */}
        {newLaunchProducts &&
          newLaunchProducts.map((item) => (
            <SwiperSlide
              key={item.id}
              className="bg-primary-dark relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#F5F0E6] opacity-5 blur-3xl" />

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-6 pb-8 md:flex-row md:gap-16 md:px-24 md:pb-0">
                {/* Image Section - smaller arch on mobile */}
                <div className="mt-8 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end">
                  <div className="group relative h-52 max-h-125 w-full overflow-hidden rounded-2xl border border-[#F5F0E6]/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:h-64 sm:w-[85%] md:h-[75%] md:w-[75%] md:rounded-3xl">
                    <img
                      src={
                        item.image?.[0] ||
                        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=987"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-80" />
                  </div>
                </div>

                {/* Text Section - Scaled down font sizes for mobile */}
                <div className="flex w-full flex-col items-center justify-center text-center text-[#F5F0E6] md:w-1/2 md:items-start md:text-left">
                  <div className="md:mb-6">
                    <Badge
                      variant="primary"
                      className="border border-[#F5F0E6]/20 bg-[#F5F0E6]/10 px-3 py-1 text-[10px] tracking-[0.2em] text-[#F5F0E6] uppercase backdrop-blur-md md:px-4 md:py-1.5 md:text-sm"
                    >
                      New Launch
                    </Badge>
                  </div>

                  <Text
                    as="h2"
                    className="mb-3 max-w-lg text-4xl leading-[1.1] drop-shadow-md md:mb-6 md:text-6xl lg:text-7xl"
                  >
                    {item.name}
                  </Text>

                  <Text
                    as="p"
                    className="mb-6 line-clamp-3 max-w-md text-sm leading-relaxed font-light opacity-80 md:mb-10 md:line-clamp-4 md:text-lg lg:text-xl"
                  >
                    {item.unitDescription ||
                      "Rich, decadent, and completely guilt-free. Experience the perfect blend of premium ingredients."}
                  </Text>

                  <Button
                    variant="orderNow"
                    size="sm-to-default"
                    className="group relative mx-auto rounded-full px-6 py-4 text-sm shadow-xl transition-all duration-300 hover:shadow-2xl md:mx-0 md:px-8 md:py-6 md:text-lg"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <span className="flex items-center gap-2 md:gap-3">
                      Order Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
