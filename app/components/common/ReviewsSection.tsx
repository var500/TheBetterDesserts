import { Text } from "../ui/text";

const REVIEWS = [
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400",
];

export const ReviewsSection = () => (
  <section className="py-24 bg-white px-4 md:px-8 text-center border-t border-primary-dark/10">
    <div className="max-w-7xl mx-auto">
      <Text
        as="h2"
        className="text-primary-dark font-satoshi font-black text-3xl md:text-4xl tracking-tight uppercase mb-4"
      >
        Warning: These Reviews <br className="md:hidden" />
        <span className="font-frista normal-case italic text-4xl md:text-5xl block md:inline md:ml-3">
          May Cause Cravings
        </span>
      </Text>

      <Text
        as="p"
        className="text-primary-dark/70 mb-16 max-w-2xl mx-auto text-base md:text-lg font-satoshi font-light leading-relaxed"
      >
        We asked our customers what they think—and the responses were as sweet
        as our cookies. From flavor fanatics to dessert connoisseurs, everyone's
        found a favorite.
      </Text>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {REVIEWS.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-square bg-white p-3 shadow-md border border-primary-dark/5 rounded-xl transition-all duration-500 hover:-rotate-2 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full h-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={img}
                alt="Customer Review"
                className="w-full h-full object-cover transition-transform duration-700 "
              />
            </div>

            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-red-400">♥</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
