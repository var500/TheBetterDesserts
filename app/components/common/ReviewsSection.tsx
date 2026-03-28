import { Text } from "../ui/text";

const REVIEWS = [
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400",
];

export const ReviewsSection = () => (
  <section className="border-primary-dark/10 border-t bg-white px-4 py-24 text-center md:px-8">
    <div className="mx-auto max-w-7xl text-center">
      {/* Overline: Satoshi (Primary), Uppercase, heavily spaced */}
      <Text
        as="span"
        variant="primary"
        className="text-primary-dark/70 mb-3 block text-xs font-bold tracking-[0.2em] uppercase md:text-sm"
      >
        Real words from people
      </Text>

      {/* Main Hook: Playfair (Secondary), large, elegant italics */}
      <Text
        as="h2"
        variant="secondary"
        className="text-primary-dark mb-6 text-4xl italic md:text-6xl"
      >
        who have tasted better!
      </Text>

      {/* Body Text: Satoshi (Primary) for maximum readability */}
      <Text
        as="p"
        variant="primary"
        className="text-primary-dark/80 mx-auto max-w-2xl text-base leading-relaxed md:text-lg"
      >
        We asked our customers what they think—and the responses were as sweet
        as our cookies. From flavor fanatics to dessert connoisseurs,
        everyone&apos;s found a favorite.
      </Text>

      <div className="border-primary-dark/5 z-10 mx-auto my-6 hidden w-fit items-center gap-3 rounded-full border bg-white px-6 py-3 shadow-xl sm:flex">
        <span className="text-xl text-yellow-500">★</span>
        <Text as="span" className="text-primary-dark font-bold">
          4.9/5
        </Text>
        <Text as="span" className="text-primary-dark text-sm">
          (3k+ Desserts Delivered)
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {REVIEWS.map((img, idx) => (
          <div
            key={idx}
            className="group border-primary-dark/5 relative aspect-square rounded-xl border bg-white p-3 shadow-md transition-all duration-500 hover:scale-105 hover:-rotate-2 hover:shadow-xl"
          >
            <div className="h-full w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={img}
                alt="Customer Review"
                className="h-full w-full object-cover transition-transform duration-700"
              />
            </div>

            <div className="absolute top-5 right-5 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-red-400">♥</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
