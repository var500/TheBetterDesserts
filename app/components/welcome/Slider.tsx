import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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

// 1. Create a dedicated component for the iframe logic
const InstagramIframe = ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  const [iframeSrc, setIframeSrc] = useState(
    `https://www.instagram.com/p/${id}/embed`,
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    // We don't want to reset anything on the initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // When the slide becomes INACTIVE, we reset the iframe src after a slight delay
    // This stops the video/audio from playing by forcing the iframe to reload
    if (!isActive) {
      const timeout = setTimeout(() => {
        // Appending a random query parameter forces the browser to reload the iframe,
        // killing whatever video/audio was currently playing inside it.
        setIframeSrc(
          `https://www.instagram.com/p/${id}/embed?reset=${Date.now()}`,
        );
      }, 600); // 600ms gives Swiper enough time to finish its 500ms sliding animation

      return () => clearTimeout(timeout);
    }
  }, [isActive, id]);

  return (
    <iframe
      src={iframeSrc}
      loading="lazy"
      className="w-full h-full border-none outline-none bg-white"
      scrolling="no"
      allow="encrypted-media"
      title={`Instagram Reel ${id}`}
    />
  );
};

export const SweetnessSlider = () => {
  const extendedReels = [
    ...REELS_DATA.map((item, i) => ({ uid: `set1-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set2-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set3-${i}`, ...item })),
    ...REELS_DATA.map((item, i) => ({ uid: `set4-${i}`, ...item })),
  ];

  return (
    <section className="pt-24 bg-white overflow-hidden text-center">
      <Text
        as="h3"
        variant="secondary"
        className="text-[#1A243F] italic text-3xl md:text-5xl mb-2"
      >
        Watch the
      </Text>
      <Text
        as="h3"
        variant="secondary"
        className="text-[#1A243F] font-black text-2xl md:text-5xl tracking-widest uppercase mb-12"
      >
        Sweetness Unfold!
      </Text>

      <div className="px-4 w-full mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          centeredSlides={true}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
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
              {({ isActive }) => (
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white transition-all duration-500 ease-out aspect-9/16 w-full ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.85] opacity-50"
                  }`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[15%] z-10 pointer-events-auto" />
                  <div className="absolute bottom-0 left-0 right-0 h-[15%] z-10 pointer-events-auto" />
                  {!isActive && (
                    <div className="absolute inset-0 z-20 pointer-events-auto" />
                  )}

                  <div className="w-full h-full">
                    <InstagramIframe id={item.id} isActive={isActive} />
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
