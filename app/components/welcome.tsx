import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  User,
  X,
  Menu,
  ArrowRight,
  LogOut,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Clock,
  Gift,
  Package,
  Heart,
  Truck,
  Star,
} from "lucide-react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "~/utils/firebase";
import { getAnalytics } from "firebase/analytics";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "better-desserts";

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Chocolate Mud Pie",
    category: "Strawberry Menu",
    price: 1700,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Small Strawberry Box",
    category: "Strawberry Menu",
    price: 1150,
    image:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Small Brownie Box",
    category: "Strawberry Menu",
    price: 1289,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Brownie Box",
    category: "Strawberry Menu",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Nutella + Puddle",
    category: "Strawberry Menu",
    price: 1050,
    image:
      "https://images.unsplash.com/photo-1579372781878-662497650396?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Dubai Surprise",
    category: "Strawberry Menu",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 7,
    name: "Only Strawberry Box",
    category: "Strawberry Menu",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1464960726309-198270f274a4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 8,
    name: "Cereal Box",
    category: "Strawberry Menu",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1519340241574-2dec39624824?auto=format&fit=crop&q=80&w=400",
  },
];

const CATEGORIES = [
  "Cookie Cakes",
  "Bundt Cakes",
  "Decadent Cakes",
  "Stuffed Cookies",
  "Dessert Containers",
  "Gifting",
];

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

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
];

const REVIEWS = [
  "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=400",
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onOpenSearch, user, onAuthClick }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E6] h-20 px-4 md:px-8 flex items-center justify-between">
    <div className="flex items-center gap-6">
      <Menu className="w-6 h-6 md:hidden cursor-pointer text-[#1A243F]" />
      <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide text-[#1A243F]">
        <a href="#" className="hover:text-gray-500 transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-gray-500 transition-colors">
          Shop
        </a>
        <a href="#" className="hover:text-gray-500 transition-colors">
          Gifting
        </a>
      </div>
    </div>

    <div className=" text-2xl font-serif text-[#1A243F] leading-[1.1] flex flex-col items-center md:items-start">
      <div className="flex items-baseline gap-1">
        <span className="text-sm">The</span>
        <span className="font-bold">Better</span>
      </div>
      <div className="font-bold tracking-widest">Desserts</div>
    </div>

    <div className="flex items-center gap-4 text-[#1A243F]">
      <Search
        className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors"
        onClick={onOpenSearch}
      />
      <div
        className="relative cursor-pointer hover:text-gray-500 transition-colors"
        onClick={onAuthClick}
      >
        <User className={`w-5 h-5 ${user ? "text-green-600" : ""}`} />
        {user && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
        )}
      </div>
      <div
        className="relative cursor-pointer hover:text-gray-500 transition-colors"
        onClick={onOpenCart}
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#1A243F] text-[#F5F0E6] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="mt-20 relative h-[85vh] min-h-212.5 bg-[#1A243F] overflow-hidden flex flex-col md:flex-row items-center w-full">
    {/* Wave SVG matching the cream background of the navbar */}
    <div className="absolute top-0 left-0 w-full z-0 leading-none">
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,50 C1150,150 1000,-50 700,80 C400,210 200,60 0,120 Z"
          fill="#F5F0E6"
        />
      </svg>
    </div>

    <div className="relative z-10 w-full h-full flex flex-col md:flex-row max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
        <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[10rem] font-black text-[#A0A0A0] leading-[0.8] tracking-tighter flex flex-col">
          <span>THE</span>
          <span>BETTER</span>
          <span>DESSERTS</span>
        </h1>
      </div>
      <div className="w-full md:w-1/2 h-full flex items-center justify-center relative mt-8 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400"
          alt="Chocolate Dessert"
          className="w-96 h-100 object-cover absolute md:-right-10 rounded-2xl shadow-2xl rotate-[-5deg] md:rotate-0"
        />
      </div>
    </div>
  </section>
);

const FeaturesBanner = () => (
  <section className="bg-[#F5F0E6] py-16 px-4 md:px-8 border-b border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#1A243F]">
      <div className="flex flex-col items-center">
        <Sparkles className="w-10 h-10 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-2">
          Exquisite & Eggless
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          Every creation is 100% eggless, crafted for all to indulge without
          limits.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Clock className="w-10 h-10 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-2">
          Freshly Baked, Never Stored
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          Made to order in small batches - because true indulgence can't wait.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Gift className="w-10 h-10 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-2">
          Nationwide Gifting & Delivery
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          From our studio to every corner of India, elegantly packed and
          delivered.
        </p>
      </div>
    </div>
  </section>
);

const ShopCategories = () => (
  <section className="bg-white">
    <div className="grid grid-cols-1 md:grid-cols-3 w-full">
      {SHOP_CARDS.map((card) => (
        <div
          key={card.id}
          className="relative aspect-[4/4] md:aspect-[4/5] group overflow-hidden bg-gray-100 flex flex-col justify-end p-8 text-center border-[0.5px] border-white cursor-pointer"
        >
          <img
            src={card.img}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A243F]/90 via-[#1A243F]/20 to-transparent"></div>
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

const SweetnessSlider = () => {
  const extendedImages = [
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set1-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set2-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set3-${i}`, src: img })),
    ...SLIDER_IMAGES.map((img, i) => ({ id: `set4-${i}`, src: img })), // Extra buffer for ultra-wide screens
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

const GiftingPromo = () => (
  <section className="py-24 bg-[#F5F0E6] text-center px-4 border-t border-gray-200">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-[#1A243F] font-black text-3xl md:text-5xl tracking-tight uppercase mb-4">
        Gifting with The Better Desserts
      </h2>
      <p className="text-[#1A243F] font-bold tracking-widest text-sm md:text-base uppercase mb-8">
        Every Bite, A Memory. Every Box, A Celebration.
      </p>
      <p className="text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
        At The Better Desserts, we believe gifting should be more than just
        giving — it should be an experience. Our desserts are crafted to
        delight, wrapped in elegant packaging, and personalized to make every
        occasion unforgettable.
      </p>
      <p className="text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
        Whether it's{" "}
        <strong className="text-[#1A243F]">
          corporate gifting, festive hampers, birthdays, or weddings
        </strong>
        , we create indulgent boxes that leave a lasting impression.
      </p>
      <button className="bg-[#1A243F] text-[#F5F0E6] px-10 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-colors">
        More Info
      </button>
    </div>
  </section>
);

const WhyChooseGifting = () => (
  <section className="py-20 bg-white px-4 md:px-8">
    <h2 className="text-center text-[#1A243F] font-black text-2xl md:text-3xl tracking-wide uppercase mb-16">
      Why Choose Us For Gifting
    </h2>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 text-center text-[#1A243F]">
      <div className="flex flex-col items-center">
        <Heart className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Premium Packaging
        </h3>
        <p className="text-sm text-gray-600 max-w-[250px]">
          Elegant boxes designed to impress from the moment they're received.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Star className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Personalization Options
        </h3>
        <p className="text-sm text-gray-600 max-w-[250px]">
          Custom notes, brand logos, and flavor assortments tailored for your
          event.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Package className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Wide Range of Desserts
        </h3>
        <p className="text-sm text-gray-600 max-w-[250px]">
          From stuffed cookies to cakes, puddings, and hampers - curated for
          every celebration.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Truck className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Bulk Orders, Delivery
        </h3>
        <p className="text-sm text-gray-600 max-w-[250px]">
          Perfect for corporate teams, wedding guests, or festive gifting across
          India.
        </p>
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
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

const NewsletterSection = () => (
  <section className="py-24 bg-[#E8C265] text-center px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-[#1A243F] font-serif italic text-4xl md:text-5xl font-bold mb-4">
        Join The Club
      </h2>
      <p className="text-[#1A243F] mb-10 font-medium">
        Unlock offers, seasonal menus & freshly baked launches before anyone
        else
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
        <input
          type="email"
          placeholder="EMAIL"
          className="w-full md:w-auto flex-1 px-6 py-4 rounded-md bg-white text-[#1A243F] outline-none font-bold placeholder-gray-400 border border-transparent focus:border-[#1A243F]"
        />
        <button className="w-full md:w-auto bg-[#1A243F] text-white px-8 py-4 rounded-md font-bold tracking-widest uppercase hover:bg-opacity-90 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product, onAddToCart }) => (
  <div className="group flex flex-col cursor-pointer">
    <div className="relative overflow-hidden aspect-square mb-3 rounded-lg bg-gray-100">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A243F] py-2 rounded-md font-bold text-xs opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0"
      >
        QUICK ADD
      </button>
    </div>
    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
      {product.category}
    </div>
    <h3 className="text-sm font-bold text-gray-800 mb-1">{product.name}</h3>
    <div className="text-sm font-semibold text-[#1A243F]">
      RS. {product.price.toLocaleString()}
    </div>
  </div>
);

const SearchOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[#F5F0E6] animate-in fade-in duration-300 flex flex-col">
      <div className="h-20 border-b border-gray-300 flex items-center px-8 bg-white">
        <Search className="w-5 h-5 text-gray-400 mr-4" />
        <input
          autoFocus
          type="text"
          placeholder="Find a product..."
          className="flex-1 outline-none text-xl font-serif italic bg-transparent"
        />
        <X
          className="w-6 h-6 cursor-pointer hover:text-[#1A243F] transition-colors"
          onClick={onClose}
        />
      </div>
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-serif italic text-[#1A243F]">Top Sellers</p>
        <div className="flex flex-wrap gap-4 mt-8 justify-center opacity-80">
          {["Cookie Cakes", "Brownies", "Dubai Surprise"].map((tag) => (
            <span
              key={tag}
              className="border border-gray-300 text-[#1A243F] px-4 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  user,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2 text-[#1A243F]">
            YOUR BAG{" "}
            <span className="text-gray-500 text-sm">({cart.length})</span>
          </h2>
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-serif italic text-[#1A243F]">
                Your bag is empty
              </p>
              <button
                onClick={onClose}
                className="text-[#1A243F] text-sm font-bold border-b border-[#1A243F]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item.name}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-800">
                      {item.name}
                    </h4>
                    <Trash2
                      className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                  <p className="text-[#1A243F] text-xs font-semibold mb-3">
                    RS. {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center border border-gray-100 rounded-md w-max">
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4 font-bold text-lg text-[#1A243F]">
              <span>Total</span>
              <span>RS. {total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
              CHECKOUT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose, user, onSignOut }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {user ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#F5F0E6] rounded-full flex items-center justify-center mx-auto text-[#1A243F]">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1A243F]">
                Welcome Back!
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Logged in as:{" "}
                <span className="font-mono">{user.uid.substring(0, 8)}...</span>
              </p>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-6 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-[#1A243F]">
                Order History <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSignOut}
                className="w-full py-3 px-6 text-red-600 font-bold hover:bg-red-50 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Sign Out <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold font-serif italic text-[#1A243F]">
              Join the Club
            </h2>
            <p className="text-gray-500 text-sm">
              Save your address and track orders easily.
            </p>
            <button
              onClick={() => signInAnonymously(auth)}
              className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Continue as Guest <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Secure session management enabled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          // We wait for user interaction to sign in for a better flow,
          // but we check if session exists
        }
      } catch (err) {
        console.error("Auth error", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setIsAuthOpen(false);
    });
    setIsMounted(true);
    return () => unsubscribe();
  }, []);

  // Sync Cart with Firestore
  useEffect(() => {
    if (!user) return;
    const cartDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "user_data",
      "cart",
    );

    const unsubscribe = onSnapshot(
      cartDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCart(snapshot.data().items || []);
        }
      },
      (error) => console.error("Firestore Error:", error),
    );

    return () => unsubscribe();
  }, [user]);

  const updateFirestoreCart = async (newCart) => {
    if (!user) {
      setCart(newCart); // Local state for guests
      return;
    }
    const cartDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "user_data",
      "cart",
    );
    await setDoc(cartDocRef, { items: newCart }, { merge: true });
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    updateFirestoreCart(newCart);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const q = Math.max(1, item.quantity + delta);
        return { ...item, quantity: q };
      }
      return item;
    });
    updateFirestoreCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateFirestoreCart(newCart);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCart([]); // Clear local cart view
    setIsAuthOpen(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1A243F] font-sans selection:bg-[#1A243F] selection:text-[#F5F0E6]">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main className="pb-0">
        <Hero />
        <FeaturesBanner />
        <ShopCategories />
        <SweetnessSlider />

        <div className="bg-white py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#1A243F] font-serif italic text-2xl md:text-3xl mb-2">
                Our
              </h2>
              <h3 className="text-[#1A243F] font-black text-3xl tracking-widest uppercase">
                Bestsellers
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
              {PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>

        <GiftingPromo />
        <WhyChooseGifting />
        <ReviewsSection />
        <NewsletterSection />
      </main>

      <footer className="bg-[#1A243F] text-[#F5F0E6] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-3xl md:text-5xl font-serif leading-[1.1] mb-16 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-3xl">The</span>
              <span className="font-bold">Better</span>
            </div>
            <div className="font-bold tracking-widest">Desserts</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
                Links
              </h4>
              {["Home", "Shop", "Cookies", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
                Categories
              </h4>
              {CATEGORIES.slice(0, 5).map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
                Customer Service
              </h4>
              {[
                "Shipping & Delivery",
                "Return and Refunds",
                "Privacy Policies",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            <span>© 2026 THE BETTER DESSERTS. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-4">
              <div className="w-8 h-5 bg-gray-700 rounded"></div>
              <div className="w-8 h-5 bg-gray-700 rounded"></div>
              <div className="w-8 h-5 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        user={user}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
