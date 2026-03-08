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

export default function App() {
  const selectedCityId = useCityStore((state) => state.selectedCityId);

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-primary-dark font-sans selection:bg-primary-dark selection:text-[#F5F0E6]">
      <main className="pb-0">
        <Hero />
        {!selectedCityId ? <LocationSelector /> : null}
        <FeaturesBanner />
        <SignatureProduct />
        <Bestseller />
        <BetterIngredients />
        <GiftingPromo />
        <SweetnessSlider />
        <WhyChooseGifting />
        <ReviewsSection />
      </main>
    </div>
  );
}
