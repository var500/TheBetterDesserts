import { Hero } from "../welcome/Hero";
import { FeaturesBanner } from "../welcome/FeaturesBanner";
import { SweetnessSlider } from "../welcome/Slider";
import Bestseller from "../welcome/Bestseller";

import { ReviewsSection } from "../common/ReviewsSection";

import LocationSelector from "../welcome/CitySlabs";
import SignatureProduct from "./SignatureProduct";
import { GiftingPromo } from "../promotional/Gifting";
import { WhyChooseGifting } from "../promotional/GiftingMvp";
import BetterIngredients from "./Ingredients";
import { useCityStore } from "~/store/useCityStore";
import { ProductFAQ } from "../common/Faqs";
import { HomeFAQs } from "~/constants";
import { useProducts } from "~/hooks/useProducts";
import { useMemo } from "react";
import type { Product } from "~/common/types";

export default function App() {
  const selectedCityId = useCityStore((state) => state.selectedCityId);
  const { data: products, isLoading, isError } = useProducts();

  const { bestsellers, newLaunch, caszel } = useMemo(() => {
    const result: {
      bestsellers: Product[];
      newLaunch: Product[];
      caszel: Product | null;
    } = {
      bestsellers: [],
      newLaunch: [],
      caszel: null,
    };

    products?.forEach((item) => {
      if (item.is_bestseller) result.bestsellers.push(item);
      if (item.isNewLaunch) result.newLaunch.push(item);
      if (item.name === "CASZEL") result.caszel = item;
    });

    return result;
  }, [products]);

  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] font-sans selection:text-[#F5F0E6]">
      <main className="pb-0">
        <Hero newLaunchProducts={newLaunch} />
        {!selectedCityId ? <LocationSelector /> : null}
        <FeaturesBanner />
        <SignatureProduct item={caszel} isLoading={isLoading} />
        {bestsellers && (
          <Bestseller
            bestsellers={bestsellers}
            isError={isError}
            isLoading={isLoading}
          />
        )}
        <BetterIngredients />
        <GiftingPromo />
        <WhyChooseGifting />
        {/* <SweetnessSlider /> */}
        <ProductFAQ faqs={HomeFAQs} />
        <ReviewsSection />
      </main>
    </div>
  );
}
