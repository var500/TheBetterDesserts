import { ingredients } from "~/constants";
import { Text } from "../ui/text";

export default function BetterIngredients() {
  return (
    <section className="bg-primary-dark px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Text
            as="span"
            variant="primary"
            className="mb-4 block text-sm font-bold tracking-[0.2em] text-[#F5F0E6]/70 uppercase md:text-base"
          >
            Zero Compromise
          </Text>
          <Text
            as="h2"
            variant="secondary"
            className="mb-6 text-4xl leading-tight text-[#F5F0E6] md:text-5xl lg:text-6xl"
          >
            Better-For-You <br className="hidden md:block" /> Ingredients
          </Text>
          <Text
            as="p"
            variant="primary"
            className="text-lg leading-relaxed text-[#F5F0E6]/80"
          >
            We believe indulgence shouldn&apos;t come with a side of guilt. By
            swapping out empty calories for nutrient-dense superfoods, we craft
            desserts that love you back.
          </Text>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center rounded-2xl border border-[#F5F0E6]/10 bg-[#F5F0E6]/5 p-8 text-center transition-colors duration-300 hover:bg-[#F5F0E6]/10 sm:items-start sm:text-left"
            >
              {/* Image Container with Hover Effects */}
              <div className="mb-6 h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#F5F0E6]/20 shadow-lg transition-colors duration-300 group-hover:border-[#F5F0E6]/50">
                <img
                  src={item.image}
                  alt={`Real ${item.name}`}
                  className="h-full w-full object-cover transition-transform duration-500"
                />
              </div>

              <Text
                as="h3"
                variant="secondary"
                className="mb-3 text-2xl text-[#F5F0E6]"
              >
                {item.name}
              </Text>
              <Text
                as="p"
                variant="primary"
                className="text-sm leading-relaxed text-[#F5F0E6]/70"
              >
                {item.benefit}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
