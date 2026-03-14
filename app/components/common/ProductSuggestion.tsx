import { Text } from "../ui/text";
import { ProductCard } from "../welcome/ProductCard";
import { useProducts } from "~/hooks/useProducts";

export const YouMayAlsoLike = () => {
  const { data: products, isLoading, isError } = useProducts();
  const bestsellers = products?.filter((item) => item.is_bestseller);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="h2" className="text-primary-dark animate-pulse text-2xl">
          Baking fresh menu...
        </Text>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="p" className="text-red-500">
          Failed to load the menu. Please refresh the page.
        </Text>
      </div>
    );
  }

  return (
    <section className="border-primary-dark/10 border-t bg-[#F5F0E6] px-4 py-24 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-16 text-center">
          <Text as="h2" className="text-primary-dark mb-1 text-3xl md:text-4xl">
            You May
          </Text>
          <Text
            as="h3"
            className="text-primary-dark text-4xl font-semibold tracking-[0.15em] uppercase md:text-5xl"
          >
            Also Like
          </Text>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {bestsellers?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
