import { Icons } from "../icons";
import { Text } from "../ui/text";

export const WhyChooseGifting = () => (
  <section className="border-primary-dark/20 border-b px-4 pb-6 md:px-8 md:pb-12">
    <div className="text-primary-dark mx-auto grid max-w-7xl grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-4 md:gap-8">
      {/* Feature 1 */}
      <div className="group flex flex-col items-center">
        <Icons.Heart className="text-primary-dark/80 mb-5 h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="mb-3 text-2xl">
          Premium Packaging
        </Text>
        <Text
          as="p"
          className="text-primary-dark/60 max-w-[250px] text-sm leading-relaxed md:text-base"
        >
          Elegant baskets designed to impress from the moment they&apos;re
          received.
        </Text>
      </div>

      {/* Feature 2 */}
      <div className="group flex flex-col items-center">
        <Icons.Star className="text-primary-dark/80 mb-5 h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="mb-3 text-2xl">
          Personalization
        </Text>
        <Text
          as="p"
          className="text-primary-dark/60 max-w-[250px] text-sm leading-relaxed md:text-base"
        >
          Custom notes, brand logos, and flavor assortments tailored for your
          event.
        </Text>
      </div>

      {/* Feature 3 */}
      <div className="group flex flex-col items-center">
        <Icons.Package className="text-primary-dark/80 mb-5 h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="mb-3 text-2xl">
          Wide Range
        </Text>
        <Text
          as="p"
          className="text-primary-dark/60 max-w-[250px] text-sm leading-relaxed md:text-base"
        >
          From stuffed cookies to cakes and hampers—curated for every
          celebration.
        </Text>
      </div>

      {/* Feature 4 */}
      <div className="group flex flex-col items-center">
        <Icons.Truck className="text-primary-dark/80 mb-5 h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
        <Text as="h3" className="mb-3 text-2xl">
          Bulk Delivery
        </Text>
        <Text
          as="p"
          className="text-primary-dark/60 max-w-[250px] text-sm leading-relaxed md:text-base"
        >
          Perfect for corporate teams, wedding guests, or festive gifting across
          India.
        </Text>
      </div>
    </div>
  </section>
);
