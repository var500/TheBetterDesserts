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
      className="h-full w-full border-none bg-white outline-none"
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
    <section className="overflow-hidden bg-white pt-24 text-center">
      <Text
        as="h3"
        variant="secondary"
        className="mb-2 text-3xl text-[#1A243F] italic md:text-5xl"
      >
        Watch the
      </Text>
      <Text
        as="h3"
        variant="secondary"
        className="mb-12 text-2xl font-black tracking-widest text-[#1A243F] uppercase md:text-5xl"
      >
        Sweetness Unfold!
      </Text>

      <div className="mx-auto w-full px-4">
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
                  className={`relative aspect-9/16 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.85] opacity-50"
                  }`}
                >
                  <div className="pointer-events-auto absolute top-0 right-0 left-0 z-10 h-[15%]" />
                  <div className="pointer-events-auto absolute right-0 bottom-0 left-0 z-10 h-[15%]" />
                  {!isActive && (
                    <div className="pointer-events-auto absolute inset-0 z-20" />
                  )}

                  <div className="h-full w-full">
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
