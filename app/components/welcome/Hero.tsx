import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Button, buttonVariants } from "../ui/button";
import { Text } from "../ui/text";
import Badge from "../ui/badge";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="relative h-[85vh]  overflow-hidden w-full flex">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
        style={
          {
            "--swiper-pagination-color": "#F5F0E6",
            "--swiper-navigation-size": "2rem",
          } as React.CSSProperties
        }
      >
        <SwiperSlide className="relative overflow-hidden bg-primary-dark">
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 gap-10 text-center select-none">
            <img
              src="/brand/betterDesserts.jpeg"
              alt="Brand Logo"
              className="object-contain md:w-[70%] md:h-[70%] w-62 h-62  "
            />

            <Button variant={"light"} size={"sm-to-default"}>
              Shop Now
            </Button>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: What Makes Us Better (USPs) */}
        <SwiperSlide>
          <div className="bg-primary-dark flex flex-col md:flex-row items-center justify-center w-full h-full pt-4 md:pt-0 px-12 md:px-24 gap-10">
            <div className="w-full flex flex-col justify-center text-[#F5F0E6]">
              <Text
                as={"span"}
                className="mb-2 text-sm md:text-lg tracking-[0.2em] uppercase opacity-80"
              >
                Our Promise
              </Text>
              <Text as={"h2"} className="text-2xl md:text-6xl leading-tight">
                What makes us
              </Text>
              <br />
              <Text as={"span"} className="text-2xl md:text-6xl  mb-8 ">
                Better?
              </Text>

              <ul className="text-lg font-satoshi md:text-2xl space-y-2 md:space-y-4 font-light">
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✖</span> No White Sugar
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-400">✖</span> No Maida (Refined
                  Flour)
                </li>

                <li className="flex items-center gap-3">
                  <span className="text-green-400">✖</span>No Palm Oil
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✔</span> 100% Eggless
                </li>
              </ul>
            </div>
            {/* Image Placeholder for Ingredients */}
            <div className="w-full md:w-5/12 h-64 md:h-[70%] rounded-t-full rounded-b-xl overflow-hidden relative shadow-2xl">
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
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 gap-10 text-center select-none">
            <img
              src="/brand/betterCakes.jpeg"
              alt="Brand Logo"
              className="object-contain md:w-[70%] md:h-[70%] w-62 h-62  "
            />

            <Button variant={"default"} size={"sm-to-default"}>
              Shop Now
            </Button>
          </div>
        </SwiperSlide>

        {/* SLIDE 4: New Launch Showcase */}
        <SwiperSlide>
          <div className=" bg-primary-dark flex flex-col-reverse md:flex-row items-center justify-center w-full h-full px-12 md:px-24 gap-10">
            {/* Image Placeholder for New Product */}
            <div className="w-full md:w-1/2 h-64 md:h-[70%] rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=987&auto=format&fit=crop"
                alt="Hazelnut Truffle Cake"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="place-items-center md:place-items-start md:text-left mt-4 md:mt-0 w-full md:w-1/2 flex flex-col justify-center text-[#F5F0E6]">
              <Badge variant={"primary"}>New Launch</Badge>

              <Text as={"h2"} className=" text-5xl md:text-7xl font-frista ">
                Hazelnut
              </Text>
              <br />
              <Text
                as={"h2"}
                className="text-5xl md:text-7xl font-frista mb-2 md:mb-6 "
              >
                Truffle Cake
              </Text>
              <Text
                as={"p"}
                className="text-center md:text-left text-base md:text-xl font-light opacity-90 mb-8 md:max-w-md"
              >
                Rich, decadent, and completely guilt-free. Made with roasted
                hazelnuts and pure dark chocolate.
              </Text>

              <Button
                variant={"orderNow"}
                size={"sm-to-default"}
                className="mx-auto md:mx-0"
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 5: Gurgaon cleanest dessert branch*/}
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full px-12 md:px-24 gap-4 md:gap-10">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-[70%] rounded-2xl overflow-hidden relative shadow-2xl">
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
                className="text-4xl md:text-7xl font-playfair  leading-none"
              >
                Gurgaon’s
              </Text>
              <Text
                as={"h2"}
                className="text-4xl md:text-7xl font-playfair  leading-none"
              >
                Cleanest Dessert
              </Text>

              <Text
                as={"h2"}
                className="text-4xl md:text-7xl font-playfair md:mb-6  leading-none"
              >
                Branch
              </Text>
              <br />
              <Text
                as={"p"}
                className="text-sm md:text-xl font-light opacity-90 mb-8 max-w-md"
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
                  size: "sm",
                  className: "w-fit h-10 mx-auto md:mx-0",
                })}
              >
                Visit Our Branch
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
