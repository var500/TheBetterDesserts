import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Button, buttonVariants } from "../ui/button";
import { Text } from "../ui/text";
import Badge from "../ui/badge";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Icons } from "../icons";
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
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-around py-6 text-center select-none">
            <img
              src="/brand/betterDesserts.jpeg"
              alt="Brand Logo"
              // Standardized mobile image size
              className="h-90 w-90 object-contain md:h-[70%] md:w-[70%]"
            />
            <Button
              variant={"light"}
              size={"sm-to-default"}
              onClick={() => navigate("/collection")}
            >
              Shop Now
            </Button>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: What Makes Us Better (USPs) */}
        <SwiperSlide>
          {/* Changed px-12 to px-6 on mobile, adjusted flex direction so image stays prominent */}
          <div className="bg-primary-dark flex h-full w-full flex-col-reverse items-center justify-center gap-6 px-6 pb-8 md:flex-row md:gap-10 md:px-24 md:pb-0">
            <div className="flex w-full flex-col justify-center text-center text-[#F5F0E6] md:text-left">
              <Text
                variant={"secondary"}
                as={"h2"}
                className="text-3xl leading-tight md:text-6xl"
              >
                What makes us
              </Text>
              <Text
                as={"span"}
                variant={"secondary"}
                className="mb-6 text-3xl md:mb-8 md:text-6xl"
              >
                Better?
              </Text>

              {/* Centered list on mobile, left-aligned on desktop */}
              <ul className="font-playfair mx-auto inline-block w-fit space-y-2 text-left text-base font-light md:mx-0 md:space-y-4 md:text-2xl">
                <li className="flex items-center gap-3">
                  <Icons.X className="h-4 w-4 text-red-400 md:h-6 md:w-6" /> No
                  White Sugar
                </li>
                <li className="flex items-center gap-3">
                  <Icons.X className="h-4 w-4 text-red-400 md:h-6 md:w-6" /> No
                  Maida
                </li>
                <li className="flex items-center gap-3">
                  <Icons.X className="h-4 w-4 text-red-400 md:h-6 md:w-6" /> No
                  Palm Oil
                </li>
                <li className="flex items-center gap-3">
                  <Icons.Check className="h-4 w-4 text-green-400 md:h-6 md:w-6" />{" "}
                  100% Eggless
                </li>
              </ul>
            </div>

            {/* Image Section - reduced height on mobile */}
            <div className="relative mt-4 h-48 w-full overflow-hidden rounded-t-full rounded-b-xl shadow-2xl sm:h-56 md:mt-0 md:h-[70%] md:w-5/12">
              <img
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1065&auto=format&fit=crop"
                alt="Almond flour and oats"
                className="h-full w-full object-cover"
              />
            </div>
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

        {/* SLIDE 5: Gurgaon cleanest dessert branch */}
        <SwiperSlide>
          <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-6 px-6 pb-8 md:flex-row md:gap-10 md:px-24 md:pb-0">
            {/* Image Section - reduced height for mobile */}
            <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl shadow-2xl sm:h-56 md:mt-0 md:h-[70%] md:w-1/2 md:rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=987&auto=format&fit=crop"
                alt="Clean Dessert Kitchen Gurgaon"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="text-primary-dark flex w-full flex-col justify-center text-center md:w-1/2 md:text-left">
              <Text
                as={"h2"}
                className="font-playfair text-3xl leading-[1.1] md:text-6xl lg:text-7xl"
              >
                Gurgaon’s
              </Text>
              <Text
                as={"h2"}
                className="font-playfair text-3xl leading-[1.1] md:text-6xl lg:text-7xl"
              >
                Cleanest Dessert
              </Text>
              <Text
                as={"h2"}
                className="font-playfair mb-4 text-3xl leading-[1.1] md:mb-6 md:text-6xl lg:text-7xl"
              >
                Brand
              </Text>

              <Text
                as={"p"}
                className="mx-auto mb-6 max-w-md text-sm font-light opacity-90 md:mx-0 md:mb-8 md:text-lg lg:text-xl"
              >
                Experience desserts crafted in a spotless, hygienic environment.
                Every treat is prepared with premium ingredients, strict quality
                standards, and unmatched cleanliness.
              </Text>

              <Link
                target="_blank"
                to="https://maps.app.goo.gl/NSTsiZrJoZM26rJL7"
                className={buttonVariants({
                  variant: "default",
                  size: "sm-to-default",
                  className: "mx-auto w-fit px-8 md:mx-0",
                })}
              >
                Visit Us
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
