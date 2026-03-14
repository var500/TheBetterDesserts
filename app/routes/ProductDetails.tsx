import { useParams, useNavigate } from "react-router";

import { YouMayAlsoLike } from "~/components/common/ProductSuggestion";

import { Icons } from "~/components/icons";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import BetterIngredients from "~/components/welcome/Ingredients";
import { Layout } from "~/components/Layout/Layout";
import Itemdetails from "~/components/ItemDetails";
import { useGetProductById } from "~/hooks/useProducts";
import { ProductFAQ } from "~/components/ItemDetails/ProductFAQ";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetProductById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <Text as="h2" className="text-primary-dark animate-pulse text-2xl">
          Fetching delicious details...
        </Text>
      </div>
    );
  }

  // 2. 404 NOT FOUND STATE
  if (isError || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F0E6] px-4 text-center">
        <Icons.Cookie className="text-primary-dark/20 mb-6 h-24 w-24" />
        <Text as="h2" className="text-primary-dark mb-4 text-4xl md:text-5xl">
          Oops! That treat crumbled.
        </Text>
        <Text as="p" className="text-primary-dark/70 mb-8 max-w-md text-lg">
          We couldn&apos;t find the dessert you&apos;re looking for.
        </Text>
        <Button
          variant="default"
          size="lg"
          className="rounded-full px-12"
          onClick={() => navigate("/collection")}
        >
          Back to Menu
        </Button>
      </div>
    );
  }

  // 3. SUCCESS STATE (Clean and Modular)
  return (
    <Layout>
      <div className="flex min-h-screen flex-col bg-[#F5F0E6]">
        <Itemdetails product={product} />
        <ProductFAQ faqs={product.faq} />
        <YouMayAlsoLike />
        <BetterIngredients />
      </div>
    </Layout>
  );
}
