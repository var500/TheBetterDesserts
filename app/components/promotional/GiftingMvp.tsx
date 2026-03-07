import { Icons } from "../icons";
import { Text } from "../ui/text";

export const WhyChooseGifting = () => (
  <section className="py-24 bg-white px-4 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center text-primary-dark">
      {/* Feature 1 */}
      <div className="flex flex-col items-center group">
        <Icons.Heart className="w-12 h-12 mb-5 text-primary-dark/80 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="font-frista text-2xl mb-3">
          Premium Packaging
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/60 max-w-[250px] leading-relaxed"
        >
          Elegant boxes designed to impress from the moment they&apos;re
          received.
        </Text>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center group">
        <Icons.Star className="w-12 h-12 mb-5 text-primary-dark/80 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="font-frista text-2xl mb-3">
          Personalization
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/60 max-w-[250px] leading-relaxed"
        >
          Custom notes, brand logos, and flavor assortments tailored for your
          event.
        </Text>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center group">
        <Icons.Package className="w-12 h-12 mb-5 text-primary-dark/80 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="font-frista text-2xl mb-3">
          Wide Range
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/60 max-w-[250px] leading-relaxed"
        >
          From stuffed cookies to cakes and hampers—curated for every
          celebration.
        </Text>
      </div>

      {/* Feature 4 */}
      <div className="flex flex-col items-center group">
        <Icons.Truck className="w-12 h-12 mb-5 text-primary-dark/80 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="font-frista text-2xl mb-3">
          Bulk Delivery
        </Text>
        <Text
          as="p"
          className="font-satoshi text-sm md:text-base text-primary-dark/60 max-w-[250px] leading-relaxed"
        >
          Perfect for corporate teams, wedding guests, or festive gifting across
          India.
        </Text>
      </div>
    </div>
  </section>
);
