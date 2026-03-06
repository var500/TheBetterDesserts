import { AllProducts, BESTSELLER_IDS } from "~/constants";
import { Button } from "../ui/button";
import { ProductCard } from "./ProductCard";
import { Text } from "../ui/text";
import { useNavigate } from "react-router";

export default function Bestseller() {
  const navigate = useNavigate();
  const bestsellers = BESTSELLER_IDS.flatMap((id) => {
    const product = AllProducts.find((p) => p.id === id);
    return product ? [product] : [];
  });
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 border-b border-primary-dark/10 bg-[#F5F0E6]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 md:mb-20">
          <Text
            as="h2"
            variant={"secondary"}
            className="text-primary-dark  text-3xl md:text-4xl mb-1"
          >
            Our
          </Text>
          <Text
            as="h3"
            className="text-primary-dark  font-black text-4xl md:text-5xl tracking-[0.15em] uppercase"
          >
            Bestsellers
          </Text>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16 w-full">
          {bestsellers.slice(0, 4).map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <Button
            variant="outline"
            onClick={() => navigate("/collection")}
            size="lg"
            className="px-12 font-bold tracking-wider hover:bg-primary-dark hover:text-[#F5F0E6] transition-all duration-300"
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}
