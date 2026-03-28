import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

export const GiftingPromo = () => (
  <section
    id="gifting-promo"
    className="border-primary-dark/10 flex min-h-screen flex-col justify-center border-t bg-[#F5F0E6] px-6 py-16 md:px-12 lg:py-0"
  >
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left Side: Swiper Showcase */}
      <div className="relative flex w-full justify-center">
        {/* Decorative Corner Frame */}
        <div className="border-primary-dark/20 absolute -top-6 left-4 hidden h-24 w-24 border-t-2 border-l-2 md:left-12 md:block" />

        <div className="relative mx-auto w-full max-w-70 px-4 sm:max-w-sm">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="h-auto w-full pb-12"
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
                    className={`border-primary-dark/5 aspect-4/5 overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-700 ease-out ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.85] opacity-40 blur-[2px]"
                    }`}
                  >
                    <img
                      src="/products/giftHampers.png"
                      alt="Curated Gift Hampers"
                      className="h-full w-full object-cover"
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
          className="text-primary-dark/60 mb-4 text-xs font-bold tracking-[0.25em] uppercase md:text-sm"
        >
          Bespoke Gifting
        </Text>

        <Text
          as="h2"
          variant={"primary"}
          className="text-primary-dark mb-6 text-4xl leading-[1.1] tracking-tight uppercase md:text-6xl"
        >
          Send Something, <br />
          <Text
            as={"span"}
            variant={"primary"}
            className="text-5xl font-black tracking-wider md:text-7xl"
          >
            Better
          </Text>
        </Text>

        <Text
          as="p"
          className="text-primary-dark/80 mb-6 text-base leading-relaxed font-light md:text-xl"
        >
          Whether it’s{" "}
          <strong className="text-primary-dark font-bold">
            corporate gifting, festive hampers, or weddings
          </strong>
          , we create indulgent baskets designed to leave a lasting impression.
        </Text>

        <Text
          as="p"
          className="text-primary-dark/50 border-primary-dark/20 mb-8 border-l-2 pl-6 text-sm leading-relaxed italic md:mb-10 md:text-base"
        >
          &quot;At The Better Desserts, we believe gifting should be more than
          just giving — it should be an experience.&quot;
        </Text>

        <Link to="/gifting" className="w-full sm:w-auto">
          <Button
            variant="default"
            className="group h-14 w-full rounded-full px-10 text-sm font-bold tracking-widest uppercase sm:w-auto"
          >
            Explore the Collection
            <span className="ml-3 transition-transform group-hover:translate-x-2">
              →
            </span>
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
