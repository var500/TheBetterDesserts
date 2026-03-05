import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Text } from "../ui/text";

const REELS_DATA = [
  { id: "DTx04qcAVuo" },
  { id: "DT25Afggf6k" },
  { id: "DT5fwTDgXRe" },
  { id: "DT770jeASaq" },
];

export const SweetnessSlider = () => {
  // We use this just to force React to reload/pause the previous iframe
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const extendedReels = [
    ...REELS_DATA.map((item, i) => ({ uid: `set1-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set2-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set3-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set4-${i}`, ...item })),
  ];

  return (
    <section className="pt-24 bg-white overflow-hidden text-center">
      <Text
        as={"h3"}
        variant={"secondary"}
        className="text-[#1A243F] italic text-3xl md:text-5xl mb-2"
      >
        Watch the
      </Text>
      <Text
        as={"h3"}
        variant={"secondary"}
        className="text-[#1A243F] font-black text-2xl md:text-5xl tracking-widest uppercase mb-12"
      >
        Sweetness Unfold!
      </Text>

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
          // Track the active slide to pause off-screen videos
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
          className="pb-12"
          style={
            {
              "--swiper-navigation-color": "#1A243F",
              "--swiper-navigation-size": "2rem",
            } as React.CSSProperties
          }
        >
          {extendedReels.map((item, index) => (
            <SwiperSlide key={item.uid}>
              {({ isActive }) => (
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white transition-all duration-500 ease-out h-100 w-full ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.85] opacity-50"
                  }`}
                >
                  {/* If the slide is NOT active, we use pointer-events-none so the user can grab it to swipe.
                    If the slide IS active, pointer events are enabled, allowing 1-click play (but disabling center swiping).
                  */}
                  <div
                    className={`w-full h-full ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <iframe
                      // Changing the key forces the iframe to reload and stop playing when it's no longer active
                      key={`${item.uid}-${isActive ? "active" : "idle"}`}
                      src={`https://www.instagram.com/p/${item.id}/embed`}
                      className="w-full h-full border-none outline-none bg-white"
                      scrolling="no"
                      allowTransparency={true}
                      allow="encrypted-media"
                      title={`Instagram Reel ${item.id}`}
                    />
                  </div>

                  {/* We no longer need the transparent shield div! */}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
