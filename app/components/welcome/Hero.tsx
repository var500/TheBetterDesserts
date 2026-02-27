import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] bg-[#1A243F] overflow-hidden w-full flex">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
        style={
          {
            "--swiper-navigation-color": "#F5F0E6",
            "--swiper-pagination-color": "#F5F0E6",
            "--swiper-navigation-size": "2rem",
          } as React.CSSProperties
        }
      >
        <SwiperSlide className="relative overflow-hidden bg-[#0A203F]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1920"
              alt="Gourmet Dessert Overlay"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110 animate-[pulse_10s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#0A203F]/70 via-[#0A203F]/50 to-[#0A203F]/90" />
          </div>

          <div className="relative z-10 flex items-center justify-center w-full h-full px-6 text-center select-none">
            <h1 className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-playfair text-[#F5F0E6] leading-[0.9] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <span className="text-[3rem] md:text-[5rem] lg:text-[7rem] mr-4 opacity-90 italic">
                The
              </span>
              Better
              <br />
              Desserts
            </h1>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: What Makes Us Better (USPs) */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-center w-full h-full px-12 md:px-24 gap-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-[#F5F0E6]">
              <span className="text-sm md:text-lg tracking-[0.2em] uppercase opacity-80 mb-2">
                Our Promise
              </span>
              <h2 className="text-4xl md:text-6xl font-playfair mb-8 leading-tight">
                What makes us <br />
                <span>Better?</span>
              </h2>
              <ul className="text-lg md:text-2xl space-y-4 font-light">
                <li className="flex items-center gap-3">
                  <span className="text-red-400">✖</span> No Maida (Refined
                  Flour)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✔</span> 100% Oat Flour
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✔</span> Premium Almond Flour
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✔</span> Zero Refined Sugar
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

        {/* SLIDE 3: New Launch Showcase */}
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full px-12 md:px-24 gap-10">
            {/* Image Placeholder for New Product */}
            <div className="w-full md:w-1/2 h-64 md:h-[70%] rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=987&auto=format&fit=crop"
                alt="Hazelnut Truffle Cake"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-[#F5F0E6]">
              <div className="inline-block bg-[#F5F0E6] text-[#1A243F] font-bold tracking-widest uppercase px-4 py-1 rounded-full text-xs w-max mb-6">
                New Launch
              </div>
              <h2 className="text-5xl md:text-7xl font-playfair mb-6 leading-none">
                Hazelnut
                <br />
                Truffle Cake
              </h2>
              <p className="text-lg md:text-xl font-light opacity-90 mb-8 max-w-md">
                Rich, decadent, and completely guilt-free. Made with roasted
                hazelnuts and pure dark chocolate.
              </p>
              <button className="border-2 border-[#F5F0E6] text-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#1A243F] transition-all duration-300 px-8 py-3 w-max rounded-full font-medium">
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
