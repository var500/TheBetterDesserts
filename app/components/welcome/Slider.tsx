import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// We no longer need the thumb images here
const REELS_DATA = [
  { id: "DOqFC0nge65" },
  { id: "DO5IzMtAbRx" },
  { id: "DPBpWpcgURM" },
  { id: "DPWfNPMga4O" },
  { id: "DPappVygeon" },
  { id: "DPi7qP1k3UA" },
];

export const SweetnessSlider = () => {
  // We still use this to know which video the user is interacting with
  const [playingUid, setPlayingUid] = useState<string | null>(null);

  const extendedReels = [
    ...REELS_DATA.map((item, i) => ({ uid: `set1-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set2-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set3-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set4-${i}`, ...item })),
  ];

  return (
    <section className="py-24 bg-white overflow-hidden text-center">
      <h2 className="text-[#1A243F] font-serif italic text-3xl md:text-4xl mb-2">
        Watch the
      </h2>
      <h3 className="text-[#1A243F] font-black text-2xl md:text-3xl tracking-widest uppercase mb-12">
        Sweetness Unfold!
      </h3>

      <div className="px-4 w-full mx-auto">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          watchSlidesProgress={true}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          // Reset interaction when swiping
          onSlideChange={() => setPlayingUid(null)}
          className="pb-12"
          style={
            {
              "--swiper-navigation-color": "#1A243F",
              "--swiper-navigation-size": "2rem",
            } as React.CSSProperties
          }
        >
          {extendedReels.map((item) => (
            <SwiperSlide key={item.uid}>
              {({ isActive }) => {
                const isInteracting = isActive && playingUid === item.uid;

                return (
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white transition-all duration-500 ease-out h-110 w-full ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.85] opacity-50"
                    }`}
                  >
                    {/* ALWAYS render the iframe now */}
                    <iframe
                      src={`https://www.instagram.com/p/${item.id}/embed`}
                      className="w-full h-full border-none outline-none"
                      scrolling="no"
                      allowTransparency={true}
                      allow="encrypted-media"
                      title={`Instagram Reel ${item.id}`}
                    />

                    {/* The Invisible Swipe Shield */}
                    {/* It sits on top of the iframe to allow swiping, until clicked */}
                    {!isInteracting && (
                      <div
                        className="absolute inset-0 z-10 bg-transparent cursor-pointer"
                        onClick={() => isActive && setPlayingUid(item.uid)}
                      />
                    )}
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
