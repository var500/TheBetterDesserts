import { Text } from "~/components/ui/text";

// Temporary static data until backend is ready

export function ProductIngredients({
  ingredients,
}: {
  ingredients: {
    name: string;
    description: string;
    id: string;
  }[];
}) {
  return (
    <section className="border-primary-dark/10 border-t bg-[#F5F0E6] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Text
          as="h2"
          variant="secondary"
          className="mb-12 text-center text-4xl text-[#C35A44] md:text-5xl"
        >
          What&apos;s Inside
        </Text>

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          {ingredients &&
            ingredients.map((ingredient, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <Text
                  as="h3"
                  variant="secondary"
                  className="text-primary-dark text-2xl tracking-wide"
                >
                  {ingredient.name}
                </Text>
                <Text
                  as="p"
                  className="text-primary-dark/80 text-[1.05rem] leading-relaxed font-light"
                >
                  {ingredient.description}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
