import { Text } from "../ui/text";

const REVIEWS = [
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400",
];

export const ReviewsSection = () => (
  <section className="border-primary-dark/10 border-t bg-white px-4 py-24 text-center md:px-8">
    <div className="mx-auto max-w-7xl">
      <Text
        as="h2"
        className="text-primary-dark mb-4 text-3xl tracking-tight uppercase md:text-4xl"
      >
        Real words from people,
        <br className="md:hidden" />
        <span className="block text-4xl normal-case italic md:ml-3 md:inline md:text-5xl">
          who have tasted better{" "}
        </span>
      </Text>

      <Text
        as="p"
        className="text-primary-dark/70 mx-auto mb-16 max-w-2xl text-base leading-relaxed font-light md:text-lg"
      >
        We asked our customers what they think—and the responses were as sweet
        as our cookies. From flavor fanatics to dessert connoisseurs,
        everyone&apos;s found a favorite.
      </Text>

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
