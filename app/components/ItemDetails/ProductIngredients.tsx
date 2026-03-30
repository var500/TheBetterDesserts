import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Text } from "~/components/ui/text";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 1. Updated Interface to include the image path
interface Ingredient {
  id: string;
  name: string;
  description?: string;
  image_url?: string; // Assuming this is a URL to the ingredient image
}

// 2. The Ingredients Badge Component
export function IngredientsBadge({
  path,
  label,
}: {
  path?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={
          path
            ? path
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1920px-No-Image-Placeholder.svg.png"
        }
        alt={label} // Fixed: made alt text dynamic instead of hardcoded
        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg md:h-36 md:w-36"
      />
      <span className="text-primary-dark text-center text-lg font-bold">
        {label}
      </span>
    </div>
  );
}

// 3. The Main Component
export function ProductIngredients({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <section className="border-primary-dark/10 border-t bg-[#F5F0E6] py-16">
      <div>
        <Text
          as="h2"
          variant="secondary"
          className="mb-12 text-center text-4xl text-[#C35A44] md:text-5xl"
        >
          What&apos;s Inside
        </Text>

        {/* Swiper Carousel Integration */}
        <div>
          <Swiper
            modules={[Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            loop={true}
            slidesPerView={2} // Default for mobile
            breakpoints={{
              // Adjust these breakpoints based on your design needs
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              850: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
              1150: {
                slidesPerView: 7,
                spaceBetween: 40,
              },
            }}
            className="pt-4 pb-12"
            style={{
              paddingBottom: "60px",
            }} // Padding bottom to make room for pagination dots
          >
            {ingredients.map((item, idx) => (
              <SwiperSlide key={item.id || idx} className="flex justify-center">
                <IngredientsBadge path={item.image_url} label={item.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
