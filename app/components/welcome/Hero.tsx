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
    <section className="relative h-[75vh] md:h-[85vh] overflow-hidden w-full flex">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full pb-8 md:pb-0" // Added pb-8 on mobile so pagination dots don't overlap text
        style={
          {
            "--swiper-pagination-color": "#F5F0E6",
            "--swiper-navigation-size": "2rem",
          } as React.CSSProperties
        }
      >
        {/* SLIDE 1: Main Brand Logo */}
        <SwiperSlide className="relative overflow-hidden bg-primary-dark">
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 gap-0 md:gap-10 text-center select-none">
            <img
              src="/brand/betterDesserts.jpeg"
              alt="Brand Logo"
              // Standardized mobile image size
              className="object-contain w-90 h-90 md:w-[70%] md:h-[70%]"
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
          <div className="bg-primary-dark flex flex-col-reverse md:flex-row items-center justify-center w-full h-full px-6 md:px-24 gap-6 md:gap-10 pb-8 md:pb-0">
            <div className="w-full flex flex-col justify-center text-[#F5F0E6] text-center md:text-left">
              <Text
                variant={"secondary"}
                as={"h2"}
                className="text-3xl md:text-6xl leading-tight"
              >
                What makes us
              </Text>
              <Text
                as={"span"}
                variant={"secondary"}
                className="text-3xl md:text-6xl mb-6 md:mb-8"
              >
                Better?
              </Text>

              {/* Centered list on mobile, left-aligned on desktop */}
              <ul className="text-base md:text-2xl font-playfair space-y-2 md:space-y-4 font-light inline-block text-left mx-auto md:mx-0 w-fit">
                <li className="flex items-center gap-3">
                  <Icons.X className="text-red-400 w-4 h-4 md:w-6 md:h-6" /> No
                  White Sugar
                </li>
                <li className="flex items-center gap-3">
                  <Icons.X className="text-red-400 w-4 h-4 md:w-6 md:h-6" /> No
                  Maida
                </li>
                <li className="flex items-center gap-3">
                  <Icons.X className="text-red-400 w-4 h-4 md:w-6 md:h-6" /> No
                  Palm Oil
                </li>
                <li className="flex items-center gap-3">
                  <Icons.Check className="text-green-400 w-4 h-4 md:w-6 md:h-6" />{" "}
                  100% Eggless
                </li>
              </ul>
            </div>

            {/* Image Section - reduced height on mobile */}
            <div className="w-full md:w-5/12 h-48 sm:h-56 md:h-[70%] rounded-t-full rounded-b-xl overflow-hidden relative shadow-2xl mt-4 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1065&auto=format&fit=crop"
                alt="Almond flour and oats"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: The Better Cakes */}
        <SwiperSlide className="relative overflow-hidden bg-[#efe7d4]">
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 gap-0 md:gap-10 text-center select-none">
            <img
              src="/brand/betterCakes.jpeg"
              alt="Better Cakes Logo"
              className="object-contain w-90 h-90 md:w-[70%] md:h-[70%]"
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
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5F0E6] opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

              <div className="flex flex-col md:flex-row items-center justify-center w-full h-full px-6 md:px-24 gap-6 md:gap-16 relative z-10 pb-8 md:pb-0">
                {/* Image Section - smaller arch on mobile */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                  <div className="w-full sm:w-[85%] md:w-[75%] h-52 sm:h-64 md:h-[75%] max-h-[500px] rounded-t-[70px] md:rounded-t-[100px] rounded-b-2xl md:rounded-b-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#F5F0E6]/10 group">
                    <img
                      src={
                        item.image?.[0] ||
                        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=987"
                      }
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />
                  </div>
                </div>

                {/* Text Section - Scaled down font sizes for mobile */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left text-[#F5F0E6]">
                  <div className="mb-3 md:mb-6">
                    <Badge
                      variant="primary"
                      className="bg-[#F5F0E6]/10 text-[#F5F0E6] border border-[#F5F0E6]/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm uppercase tracking-[0.2em]"
                    >
                      ★ New Launch
                    </Badge>
                  </div>

                  <Text
                    as="h2"
                    className="text-4xl md:text-6xl lg:text-7xl font-frista leading-[1.1] mb-3 md:mb-6 drop-shadow-md max-w-lg"
                  >
                    {item.name}
                  </Text>

                  <Text
                    as="p"
                    className="text-sm md:text-lg lg:text-xl font-light opacity-80 mb-6 md:mb-10 max-w-md line-clamp-3 md:line-clamp-4 leading-relaxed"
                  >
                    {item.unitDescription ||
                      "Rich, decadent, and completely guilt-free. Experience the perfect blend of premium ingredients."}
                  </Text>

                  <Button
                    variant="orderNow"
                    size="sm-to-default"
                    className="group relative rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 mx-auto md:mx-0"
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
          <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full px-6 md:px-24 gap-6 md:gap-10 pb-8 md:pb-0">
            {/* Image Section - reduced height for mobile */}
            <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-[70%] rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xl mt-4 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=987&auto=format&fit=crop"
                alt="Clean Dessert Kitchen Gurgaon"
                className="object-cover h-full w-full"
              />
            </div>

            {/* Content Section */}
            <div className="text-center md:text-left w-full md:w-1/2 flex flex-col justify-center text-primary-dark">
              <Text
                as={"h2"}
                className="text-3xl md:text-6xl lg:text-7xl font-playfair leading-[1.1]"
              >
                Gurgaon’s
              </Text>
              <Text
                as={"h2"}
                className="text-3xl md:text-6xl lg:text-7xl font-playfair leading-[1.1]"
              >
                Cleanest Dessert
              </Text>
              <Text
                as={"h2"}
                className="text-3xl md:text-6xl lg:text-7xl font-playfair mb-4 md:mb-6 leading-[1.1]"
              >
                Brand
              </Text>

              <Text
                as={"p"}
                className="text-sm md:text-lg lg:text-xl font-light opacity-90 mb-6 md:mb-8 max-w-md mx-auto md:mx-0"
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
                  className: "w-fit mx-auto md:mx-0 px-8",
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
