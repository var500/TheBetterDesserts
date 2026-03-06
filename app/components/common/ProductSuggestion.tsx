import { AllProducts, BESTSELLER_IDS } from "~/constants";
import { Text } from "../ui/text";
import { ProductCard } from "../welcome/ProductCard";

export const YouMayAlsoLike = ({
  currentProductId,
}: {
  currentProductId: string;
}) => {
  const relatedProducts = BESTSELLER_IDS.flatMap((id) => {
    if (id === currentProductId) return [];
    const product = AllProducts.find((p) => p.id === id);
    return product ? [product] : [];
  });

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-24 px-4 md:px-8 border-t border-primary-dark/10 bg-[#F5F0E6]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
          <Text
            as="h2"
            variant={"secondary"}
            className="text-primary-dark text-3xl md:text-4xl mb-1"
          >
            You May
          </Text>
          <Text
            as="h3"
            className="text-primary-dark font-black text-4xl md:text-5xl tracking-[0.15em] uppercase"
          >
            Also Like
          </Text>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 w-full">
          {relatedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
