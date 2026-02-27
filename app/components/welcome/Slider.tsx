import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
];

export const SweetnessSlider = () => {
  const extendedImages = [
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set1-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set2-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set3-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set4-${i}`, src: img })),
  ];
  return (
    <section className="py-24 bg-[#F5F0E6] overflow-hidden text-center">
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
          className="pb-12 "
        >
          {extendedImages.map((item) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <div
                  className={`rounded-2xl overflow-hidden aspect-3/4 shadow-sm border border-gray-100 bg-white transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.85] opacity-50"
                  }`}
                >
                  <img
                    src={item.src}
                    alt="Dessert interaction"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
