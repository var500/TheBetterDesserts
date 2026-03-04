import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const GiftingPromo = () => (
  <section
    id="gifting-promo"
    className="min-h-screen justify-center flex flex-col bg-[#F5F0E6] px-6 md:px-12 border-t border-gray-200 py-16 lg:py-0"
  >
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="relative flex justify-center w-full">
        <div className="absolute -top-6 left-4 md:left-12 w-24 h-24 border-t-2 border-l-2 border-[#1A243F]/20 hidden md:block" />

        <div className="px-4 w-full max-w-70 sm:max-w-sm mx-auto relative">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-auto pb-10"
            style={
              {
                "--swiper-pagination-color": "#1A243F",
                "--swiper-pagination-bullet-inactive-color": "#1A243F",
                "--swiper-navigation-size": "2rem",
              } as React.CSSProperties
            }
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`rounded-2xl overflow-hidden aspect-4/5 shadow-md border border-gray-100 bg-white transition-all duration-500 ease-out ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.85] opacity-50"
                    }`}
                  >
                    <img
                      src="/products/giftHampers.png"
                      alt="Dessert interaction"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="flex flex-col items-start text-left">
        <span className="text-[#1A243F]/60 font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4">
          Bespoke Gifting
        </span>

        <h2 className="text-[#1A243F] font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.1] md:leading-[0.9] mb-6">
          Send Something, <br />
          <span className="text-[#1A243F] italic">Better</span>
        </h2>

        <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
          Whether it’s{" "}
          <strong className="text-[#1A243F]">
            corporate gifting, festive hampers, or weddings
          </strong>
          , we create indulgent baskets designed to leave a lasting impression.
        </p>

        <p className="text-gray-500 mb-8 md:mb-10 text-sm md:text-base leading-relaxed italic border-l-2 border-[#1A243F]/20 pl-4">
          "At The Better Desserts, we believe gifting should be more than just
          giving — it should be an experience."
        </p>

        <button className="group flex items-center justify-center w-full sm:w-auto gap-4 bg-[#1A243F] text-[#F5F0E6] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-black transition-all">
          Explore the Collection
          <span className="group-hover:translate-x-2 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  </section>
);
