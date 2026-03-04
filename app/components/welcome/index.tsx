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
import type { cartItem } from "../common/types";
import BetterIngredients from "./Ingredients";

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState<cartItem[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isOpenBirthdayModal, setIsOpenBirthdayModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleLocationCapture = (locationId: string) => {
    console.log("Captured Location:", locationId);
    setSelectedRegion(locationId);
  };

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

  const updateCart = async (newCart: cartItem[]) => {
    if (!user) {
      setCart(newCart);
      return;
    }
  };

  const addToCart = (product: cartItem) => {
    const existing = cart.find((item) => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    updateCart(newCart);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1A243F] font-sans selection:bg-[#1A243F] selection:text-[#F5F0E6]">
      <main className="pb-0">
        <BirthdayModal
          isOpen={isOpenBirthdayModal}
          onClose={handleCloseBirthdayModal}
        />
        <Hero />
        {!selectedRegion ? (
          <LocationSelector onSelectLocation={handleLocationCapture} />
        ) : null}
        <FeaturesBanner />
        <SignatureProduct />
        <Bestseller addToCart={addToCart} />
        {/* Better for you Ingredients content */}
        <BetterIngredients />
        <GiftingPromo />
        <SweetnessSlider />
        <WhyChooseGifting />
        <ReviewsSection />
      </main>
    </div>
  );
}
