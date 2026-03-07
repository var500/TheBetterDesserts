import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AllProducts } from "~/constants";
import type { Product } from "~/common/types";

import { FeaturesBanner } from "../components/welcome/FeaturesBanner";
import { YouMayAlsoLike } from "~/components/common/ProductSuggestion";

import { Icons } from "~/components/icons";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import BetterIngredients from "~/components/welcome/Ingredients";
import { Layout } from "~/components/Layout/Layout";
import Itemdetails from "~/components/ItemDetails";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    // Simulate API Fetch
    const fetchProduct = setTimeout(() => {
      const found = AllProducts.find((p) => p.id === id);
      setProduct(found || null);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(fetchProduct);
  }, [id]);

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col items-center justify-center">
        <Icons.Loader className="w-8 h-8 text-primary-dark animate-spin mb-4" />
        <Text
          as="p"
          className="text-primary-dark/60 font-medium animate-pulse tracking-widest uppercase text-sm"
        >
          Baking your page...
        </Text>
      </div>
    );
  }

  // 2. 404 NOT FOUND STATE
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col items-center justify-center px-4 text-center">
        <Icons.Cookie className="w-24 h-24 text-primary-dark/20 mb-6" />
        <Text
          as="h2"
          className="text-4xl md:text-5xl font-frista text-primary-dark mb-4"
        >
          Oops! That treat crumbled.
        </Text>
        <Text as="p" className="text-lg text-primary-dark/70 max-w-md mb-8">
          We couldn't find the dessert you're looking for.
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
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col">
        <Itemdetails product={product} />
        <FeaturesBanner />
        <YouMayAlsoLike currentProductId={product.id} />
        <BetterIngredients />
      </div>
    </Layout>
  );
}
