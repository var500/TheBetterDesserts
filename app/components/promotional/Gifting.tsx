import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Text } from "../ui/text";

import "swiper/css";
import "swiper/css/pagination";

import { WhatsappLink } from "~/lib/utils";

export const GiftingPromo = () => {
  const dynamicWhatsappLink = WhatsappLink(
    `Hi! I'd like to inquire about the gift hampers`,
  );
  return (
    <section
      id="gifting-promo"
      className="border-primary-dark/20 flex min-h-screen flex-col justify-center border-t bg-[#F5F0E6] px-6 py-16 md:px-12 lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left Side: Swiper Showcase */}
        <div className="relative flex w-full justify-center">
          {/* Decorative Corner Frame */}
          <div className="border-primary-dark/20 absolute -top-6 left-4 hidden h-24 w-24 border-t-2 border-l-2 md:left-12 md:block" />

          <div className="relative mx-auto w-full max-w-70 px-4 sm:max-w-sm">
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="h-auto w-full pb-12"
              style={
                {
                  "--swiper-pagination-color": "var(--primary-dark)",
                  "--swiper-pagination-bullet-inactive-color":
                    "var(--primary-dark-opacity-20)",
                } as React.CSSProperties
              }
            >
              {[1, 2, 3].map((index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={`border-primary-dark/5 aspect-4/5 overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-700 ease-out ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-[0.85] opacity-40 blur-[2px]"
                      }`}
                    >
                      <img
                        src="/products/giftHampers.png"
                        alt="Curated Gift Hampers"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col items-start text-left">
          <Text
            as="span"
            className="text-primary-dark/60 mb-4 text-xs font-bold tracking-[0.25em] uppercase md:text-sm"
          >
            Bespoke Gifting
          </Text>

          <Text
            as="h2"
            variant={"primary"}
            className="text-primary-dark mb-6 text-4xl leading-[1.1] tracking-tight uppercase md:text-6xl"
          >
            Send Something, <br />
            <Text
              as={"span"}
              variant={"primary"}
              className="text-5xl font-black tracking-wider md:text-7xl"
            >
              Better
            </Text>
          </Text>

          <Text
            as="p"
            className="text-primary-dark/80 mb-6 text-base leading-relaxed font-light md:text-xl"
          >
            Whether it’s{" "}
            <strong className="text-primary-dark font-bold">
              corporate gifting, festive hampers, or weddings
            </strong>
            , we create indulgent baskets designed to leave a lasting
            impression.
          </Text>

          <Text
            as="p"
            className="text-primary-dark/50 border-primary-dark/20 mb-8 border-l-2 pl-6 text-sm leading-relaxed italic md:mb-10 md:text-base"
          >
            &quot;At The Better Desserts, we believe gifting should be more than
            just giving — it should be an experience.&quot;
          </Text>

          {/* <Link to="/gifting" className="w-full sm:w-auto">
          <Button
            variant="default"
            className="group h-14 w-full rounded-full px-10 text-sm font-bold tracking-widest uppercase sm:w-auto"
          >
            Explore the Collection
            <span className="ml-3 transition-transform group-hover:translate-x-2">
              →
            </span>
          </Button>
        </Link> */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <a
              href={dynamicWhatsappLink}
              target="_blank"
              rel="noreferrer"
              className="group bg-primary-dark flex w-fit items-center justify-center rounded-md px-8 py-4 text-base font-bold text-white uppercase shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-lg"
            >
              {/* <svg
                className="mr-3 h-6 w-6 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg> */}
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
