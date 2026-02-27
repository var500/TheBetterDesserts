import { Heart, Package, Star, Truck } from "lucide-react";

export const WhyChooseGifting = () => (
  <section className="py-20 bg-white px-4 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 text-center text-[#1A243F]">
      <div className="flex flex-col items-center">
        <Heart className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Premium Packaging
        </h3>
        <p className="text-sm text-gray-600 max-w-62.5">
          Elegant boxes designed to impress from the moment they're received.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Star className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Personalization Options
        </h3>
        <p className="text-sm text-gray-600 max-w-62.5">
          Custom notes, brand logos, and flavor assortments tailored for your
          event.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Package className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Wide Range of Desserts
        </h3>
        <p className="text-sm text-gray-600 max-w-62.5">
          From stuffed cookies to cakes, puddings, and hampers - curated for
          every celebration.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Truck className="w-12 h-12 mb-4 text-[#1A243F]" />
        <h3 className="font-serif italic text-xl font-bold mb-3">
          Bulk Orders, Delivery
        </h3>
        <p className="text-sm text-gray-600 max-w-62.5">
          Perfect for corporate teams, wedding guests, or festive gifting across
          India.
        </p>
      </div>
    </div>
  </section>
);
