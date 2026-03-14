import { ingredients } from "~/constants";
import { Text } from "../ui/text";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BetterIngredients() {
  return (
    <section className="overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Text
            as="span"
            variant="primary"
            className="text-primary-dark/70 mb-4 block text-sm font-bold tracking-[0.2em] uppercase md:text-base"
          >
            Zero Compromise
          </Text>
          <Text
            as="h2"
            variant="secondary"
            className="text-primary-dark mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl"
          >
            Better-For-You <br className="hidden md:block" /> Ingredients
          </Text>
          <Text
            as="p"
            variant="primary"
            className="text-primary-dark/80 text-lg leading-relaxed"
          >
            We believe indulgence shouldn&apos;t come with a side of guilt. By
            swapping out empty calories for nutrient-dense superfoods, we craft
            desserts that love you back.
          </Text>
        </div>

        {/* Swiper Carousel */}
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
          className="pb-24"
          style={
            {
              "--swiper-navigation-color": "#F5F0E6",
              "--swiper-navigation-size": "2rem",
              "--swiper-pagination-color": "#F5F0E6",
              "--swiper-pagination-bullet-inactive-color": "#F5F0E6",
              "--swiper-pagination-bullet-inactive-opacity": "0.3",
              // 2. Forces the dots to sit at the very bottom of the padded area we just created
              "--swiper-pagination-bottom": "0px",
            } as React.CSSProperties
          }
        >
          {ingredients.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="group relative flex h-full min-h-87.5 flex-col justify-end overflow-hidden rounded-2xl border border-[#F5F0E6]/10 p-6 text-center sm:p-8 sm:text-left">
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={`Real ${item.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30"></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Text Content */}
                <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-1">
                  <Text
                    as="h3"
                    variant="secondary"
                    className="mb-2 text-2xl font-bold text-[#F5F0E6]"
                  >
                    {item.name}
                  </Text>
                  <Text
                    as="p"
                    variant="primary"
                    className="text-sm leading-relaxed text-[#F5F0E6]/90"
                  >
                    {item.benefit}
                  </Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
