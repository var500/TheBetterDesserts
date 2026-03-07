import { useState, useEffect } from "react";

import { Hero } from "../welcome/Hero";
import { FeaturesBanner } from "../welcome/FeaturesBanner";
import { SweetnessSlider } from "../welcome/Slider";
import Bestseller from "../welcome/Bestseller";

import { ReviewsSection } from "../common/ReviewsSection";

import BirthdayModal from "../promotional/BirthdayModal";
import LocationSelector from "../welcome/CitySlabs";
import SignatureProduct from "./SignatureProduct";
import { GiftingPromo } from "../promotional/Gifting";
import { WhyChooseGifting } from "../promotional/GiftingMvp";
import BetterIngredients from "./Ingredients";
import { useCityStore } from "~/store/useCityStore";

export default function App() {
  const [isOpenBirthdayModal, setIsOpenBirthdayModal] = useState(false);
  const selectedCityId = useCityStore((state) => state.selectedCityId);

  const handleCloseBirthdayModal = () => {
    setIsOpenBirthdayModal(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.localStorage.getItem("birthdayPromo")) return;
      setIsOpenBirthdayModal(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-primary-dark font-sans selection:bg-primary-dark selection:text-[#F5F0E6]">
      <main className="pb-0">
        <BirthdayModal
          isOpen={isOpenBirthdayModal}
          onClose={handleCloseBirthdayModal}
        />
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
