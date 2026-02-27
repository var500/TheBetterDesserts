const REVIEWS = [
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400",
];

export const ReviewsSection = () => (
  <section className="py-20 bg-gray-50 px-4 md:px-8 text-center border-t border-gray-200">
    <h2 className="text-[#1A243F] font-black text-2xl md:text-3xl tracking-wide uppercase mb-6">
      Warning: These Reviews May Cause Cravings
    </h2>
    <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
      We asked our customers what they think - and let's just say the responses
      were as sweet as our cookies. From flavor fanatics to dessert
      connoisseurs, everyone's got a favorite. Ready to find yours?
    </p>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
      {REVIEWS.map((img, idx) => (
        <div
          key={idx}
          className="aspect-square bg-white shadow-sm border border-gray-100 p-2 overflow-hidden rounded-lg"
        >
          <img
            src={img}
            alt="Customer Review"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  </section>
);
