import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const GiftingPromo = () => (
  <section className="py-24 bg-[#F5F0E6] px-6 md:px-12 border-t border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* LEFT SIDE: SWIPER CONTAINER */}
      <div className="relative flex justify-center">
        {/* Decorative Element */}
        <div className="absolute -top-6 left-4 md:left-12 w-24 h-24 border-t-2 border-l-2 border-[#1A243F]/20 hidden md:block" />

        {/* 1. ADDED max-w-sm TO SHRINK THE SWIPER */}
        <div className="px-4 w-full max-w-sm mx-auto relative">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-auto pb-10" /* Added pb-10 to give room for pagination dots */
            style={
              {
                "--swiper-pagination-color": "#fff",
                "--swiper-navigation-size": "2rem",
              } as React.CSSProperties
            }
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    /* 2. CHANGED aspect-3/4 TO aspect-[4/5] FOR A SLIGHTLY SHORTER LOOK */
                    className={`rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-gray-100 bg-white transition-all duration-500 ease-out ${
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

      {/* RIGHT SIDE: TEXT CONTENT */}
      <div className="flex flex-col items-start text-left">
        <span className="text-[#1A243F]/60 font-bold tracking-[0.2em] text-xs uppercase mb-4">
          Bespoke Gifting
        </span>

        <h2 className="text-[#1A243F] font-black text-4xl md:text-6xl tracking-tight uppercase leading-[0.9] mb-6">
          Every Bite, <br />
          <span className="text-gray-400 italic">A Memory.</span>
        </h2>

        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Whether it’s{" "}
          <strong className="text-[#1A243F]">
            corporate gifting, festive hampers, or weddings
          </strong>
          , we create indulgent boxes designed to leave a lasting impression.
        </p>

        <p className="text-gray-500 mb-10 leading-relaxed italic border-l-2 border-[#1A243F]/10 pl-4">
          "At The Better Desserts, we believe gifting should be more than just
          giving — it should be an experience."
        </p>

        <button className="group flex items-center gap-4 bg-[#1A243F] text-[#F5F0E6] px-12 py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-black transition-all">
          Explore the Collection
          <span className="group-hover:translate-x-2 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  </section>
);
