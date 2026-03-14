import { Icons } from "../icons";
import { Text } from "../ui/text";

export const FeaturesBanner = () => (
  <section className="border-primary-dark/10 border-b bg-white px-4 py-16 md:px-8">
    <div className="text-primary-dark mx-auto grid max-w-7xl grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
      {/* Feature 1 */}
      <div className="flex flex-col items-center">
        <Icons.Sparkles className="text-primary-dark/80 mb-5 h-10 w-10" />
        <Text
          variant={"secondary"}
          as="h3"
          className="mb-3 text-2xl md:text-3xl"
        >
          Exquisite & Eggless
        </Text>
        <Text
          as="p"
          className="text-primary-dark/70 max-w-xs text-sm leading-relaxed md:text-base"
        >
          Every creation is 100% eggless, crafted for all to indulge without
          limits.
        </Text>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center">
        <Icons.Clock className="text-primary-dark/80 mb-5 h-10 w-10" />
        <Text
          variant={"secondary"}
          as="h3"
          className="mb-3 text-2xl md:text-3xl"
        >
          Freshly Baked
        </Text>
        <Text
          as="p"
          className="text-primary-dark/70 max-w-xs text-sm leading-relaxed md:text-base"
        >
          Made to order in small batches—because true indulgence is always
          served fresh.
        </Text>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center">
        <Icons.Gift className="text-primary-dark/80 mb-5 h-10 w-10" />
        <Text
          variant={"secondary"}
          as="h3"
          className="mb-3 text-2xl md:text-3xl"
        >
          Nationwide Gifting
        </Text>
        <Text
          as="p"
          className="text-primary-dark/70 max-w-xs text-sm leading-relaxed md:text-base"
        >
          From our studio to every corner of India, elegantly packed and
          delivered.
        </Text>
      </div>
    </div>
  </section>
);
