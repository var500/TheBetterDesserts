import { ingredients } from "~/constants";
import { Text } from "../ui/text";

export default function BetterIngredients() {
  return (
    <section className="bg-primary-dark py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Text
            as="span"
            variant="primary"
            className="text-sm md:text-base tracking-[0.2em] uppercase text-[#F5F0E6]/70 mb-4 font-bold block"
          >
            Zero Compromise
          </Text>
          <Text
            as="h2"
            variant="secondary"
            className="text-4xl md:text-5xl lg:text-6xl text-[#F5F0E6] mb-6 leading-tight"
          >
            Better-For-You <br className="hidden md:block" /> Ingredients
          </Text>
          <Text
            as="p"
            variant="primary"
            className="text-lg text-[#F5F0E6]/80 leading-relaxed"
          >
            We believe indulgence shouldn't come with a side of guilt. By
            swapping out empty calories for nutrient-dense superfoods, we craft
            desserts that love you back.
          </Text>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="group bg-[#F5F0E6]/5 border border-[#F5F0E6]/10 rounded-2xl p-8 hover:bg-[#F5F0E6]/10 transition-colors duration-300 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              {/* Image Container with Hover Effects */}
              <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-[#F5F0E6]/20 group-hover:border-[#F5F0E6]/50 transition-colors duration-300 shadow-lg shrink-0">
                <img
                  src={item.image}
                  alt={`Real ${item.name}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <Text
                as="h3"
                variant="secondary"
                className="text-2xl text-[#F5F0E6] mb-3"
              >
                {item.name}
              </Text>
              <Text
                as="p"
                variant="primary"
                className="text-sm text-[#F5F0E6]/70 leading-relaxed"
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
