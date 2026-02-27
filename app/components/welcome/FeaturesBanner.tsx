import { Clock, Gift, Sparkles } from "lucide-react";

export const FeaturesBanner = () => (
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
