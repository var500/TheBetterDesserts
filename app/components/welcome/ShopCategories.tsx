const SHOP_CARDS = [
  {
    id: 1,
    title: "COOKIES",
    desc: "Choose your indulgence: Box of 5/6/12 Cookies (Available PAN-India)",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "CAKES",
    desc: "20+ designs, rich chocolate & seasonal specials.",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "COOKIE CAKES & PIES",
    desc: "Giant cookie cakes & pies with Nutella, Lotus Biscoff, and more.",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "BUNDT CAKES",
    desc: "Orchid Antioxidant Beauty Face Oil",
    img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "GIFTING",
    desc: "Sweetness, Thoughtfully Curated",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "DESSERT CONTAINERS",
    desc: "Elegant jars filled with creamy layers and luscious flavors",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
  },
];

export const ShopCategories = () => (
  <section className="bg-white">
    <div className="grid grid-cols-1 md:grid-cols-3 w-full">
      {SHOP_CARDS.map((card) => (
        <div
          key={card.id}
          className="relative aspect-4/4 md:aspect-4/5 group overflow-hidden bg-gray-100 flex flex-col justify-end p-8 text-center border-[0.5px] border-white cursor-pointer"
        >
          <img
            src={card.img}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A243F]/90 via-[#1A243F]/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl font-black text-[#F5F0E6] mb-2 tracking-wide uppercase">
              {card.title}
            </h3>
            <p className="text-[#F5F0E6] text-sm mb-6 opacity-90 max-w-xs">
              {card.desc}
            </p>
            <button className="bg-white text-[#1A243F] px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#F5F0E6] transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
