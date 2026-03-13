import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

import "swiper/css";
import "swiper/css/pagination";

export const GiftingPromo = () => (
  <section
    id="gifting-promo"
    className="min-h-screen justify-center flex flex-col bg-[#F5F0E6] px-6 md:px-12 border-t border-primary-dark/10 py-16 lg:py-0"
  >
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left Side: Swiper Showcase */}
      <div className="relative flex justify-center w-full">
        {/* Decorative Corner Frame */}
        <div className="absolute -top-6 left-4 md:left-12 w-24 h-24 border-t-2 border-l-2 border-primary-dark/20 hidden md:block" />

        <div className="px-4 w-full max-w-70 sm:max-w-sm mx-auto relative">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-auto pb-12"
            style={
              {
                "--swiper-pagination-color": "var(--primary-dark)",
                "--swiper-pagination-bullet-inactive-color":
                  "var(--primary-dark-opacity-20)",
              } as React.CSSProperties
            }
          >
            {[1, 2, 3].map((index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-primary-dark/5 bg-white transition-all duration-700 ease-out ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.85] opacity-40 blur-[2px]"
                    }`}
                  >
                    <img
                      src="/products/giftHampers.png"
                      alt="Curated Gift Hampers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="flex flex-col items-start text-left">
        <Text
          as="span"
          className="text-primary-dark/60 font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 font-satoshi"
        >
          Bespoke Gifting
        </Text>

        <Text
          as="h2"
          variant={"primary"}
          className="text-primary-dark   text-4xl md:text-6xl tracking-tight uppercase leading-[1.1] mb-6"
        >
          Send Something, <br />
          <Text
            as={"span"}
            variant={"primary"}
            className=" normal-case font-frista font-black tracking-wider text-5xl md:text-7xl"
          >
            Better
          </Text>
        </Text>

        <Text
          as="p"
          className="text-primary-dark/80 mb-6 text-base md:text-xl leading-relaxed font-satoshi font-light"
        >
          Whether it’s{" "}
          <strong className="font-bold text-primary-dark">
            corporate gifting, festive hampers, or weddings
          </strong>
          , we create indulgent baskets designed to leave a lasting impression.
        </Text>

        <Text
          as="p"
          className="text-primary-dark/50 mb-8 md:mb-10 text-sm md:text-base leading-relaxed italic border-l-2 border-primary-dark/20 pl-6 font-satoshi"
        >
          &quot;At The Better Desserts, we believe gifting should be more than
          just giving — it should be an experience.&quot;
        </Text>

        <Button
          variant="default"
          className="group w-full sm:w-auto px-10 h-14 text-sm tracking-widest uppercase font-satoshi font-bold rounded-full"
        >
          Explore the Collection
          <span className="ml-3 group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Button>
      </div>
    </div>
  </section>
);
