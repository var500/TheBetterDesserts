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
import { ProductFAQ } from "../ItemDetails/ProductFAQ";
import { HomeFAQs } from "~/constants";
import { useProducts } from "~/hooks/useProducts";

export default function App() {
  const selectedCityId = useCityStore((state) => state.selectedCityId);
  const { data: products, isLoading, isError } = useProducts();
  const bestsellers = products?.filter((item) => item.is_bestseller);
  const newLaunch = products?.filter((item) => item.isNewLaunch);

  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] font-sans selection:text-[#F5F0E6]">
      <main className="pb-0">
        <Hero newLaunchProducts={newLaunch} />
        {!selectedCityId ? <LocationSelector /> : null}
        <FeaturesBanner />
        <SignatureProduct />
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
        <SweetnessSlider />
        <ProductFAQ faqs={HomeFAQs} />
        <ReviewsSection />
      </main>
    </div>
  );
}
