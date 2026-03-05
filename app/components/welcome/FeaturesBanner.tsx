import { Icons } from "../icons";
import { Text } from "../ui/text";

export const FeaturesBanner = () => (
  <section className="bg-[#F5F0E6] py-16 px-4 md:px-8 border-b border-primary-dark/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center text-primary-dark">
      {/* Feature 1 */}
      <div className="flex flex-col items-center">
        <Icons.Sparkles className="w-10 h-10 mb-5 text-primary-dark/80" />
        <Text as="h3" className="font-frista text-2xl md:text-3xl mb-3">
          Exquisite & Eggless
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/70 max-w-xs leading-relaxed"
        >
          Every creation is 100% eggless, crafted for all to indulge without
          limits.
        </Text>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center">
        <Icons.Clock className="w-10 h-10 mb-5 text-primary-dark/80" />
        <Text as="h3" className="font-frista text-2xl md:text-3xl mb-3">
          Freshly Baked
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/70 max-w-xs leading-relaxed"
        >
          Made to order in small batches—because true indulgence is always
          served fresh.
        </Text>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center">
        <Icons.Gift className="w-10 h-10 mb-5 text-primary-dark/80" />
        <Text as="h3" className="font-frista text-2xl md:text-3xl mb-3">
          Nationwide Gifting
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/70 max-w-xs leading-relaxed"
        >
          From our studio to every corner of India, elegantly packed and
          delivered.
        </Text>
      </div>
    </div>
  </section>
);
