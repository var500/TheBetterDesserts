// ~/components/shop/ItemDetails.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { Locations, type Product } from "~/common/types";

import { toast } from "react-toastify";

// Import sub-components
import ImageGallery from "./ImageGallery";
import ProductHeader from "./ProductHeader";
import DeliveryAvailability from "./DeliveryAvailability";
import CartActions from "./CartActions";

import ProductInfoAccordion from "../common/productAccordion";

export default function Itemdetails({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { addToCart, cart } = useCartStore();
  const { setCity, selectedCityLabel } = useCityStore();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);

  const availableLocations = useMemo(() => {
    return product?.availableIn || [];
  }, [product]);

  useEffect(() => {
    if (!selectedCityLabel || availableLocations.length === 0) return;

    const isCityValidForProduct = availableLocations.includes(
      selectedCityLabel as Locations,
    );

    if (!isCityValidForProduct) {
      setIsPincodeValid(false);
      setPincodeMessage(
        "Delivery is not available for this product in your selected city.",
      );
    } else {
      setIsPincodeValid((prev) => {
        if (prev === false) {
          setPincode("");
          setPincodeMessage("");
          return null;
        }
        return prev;
      });
    }
  }, [selectedCityLabel, availableLocations]);

  // --- Derived Values & Limits ---
  const absoluteMax = product.maxPerUser ?? 10;

  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const allowedToAdd = Math.max(0, absoluteMax - cartQuantity);
  const isOutOfStock = absoluteMax <= 0;
  const isAddToCartDisabled =
    isOutOfStock || allowedToAdd === 0 || isPincodeValid !== true;

  // --- Handlers ---
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, allowedToAdd)));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product, false);
    toast.success(`Added ${product.name} to your bag!`, {
      theme: "dark",
      style: {
        borderRadius: "16px",
        overflow: "hidden",
        background: "#1A243F",
        color: "#F5F0E6",
        fontWeight: "bold",
      },
    });
    setQuantity(1);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value.replace(/\D/g, ""));
    setIsPincodeValid(null);
    setPincodeMessage("");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeMessage("Please enter a valid 6-digit pincode.");
      setIsPincodeValid(false);
      return;
    }

    let isAvailable = false;
    let deliveryMessage = "";

    // 1. Define the postal boundaries accurately
    const isGurgaon = pincode.startsWith("122");

    // Delhi NCR covers Delhi, Faridabad, Ghaziabad, Noida, AND Gurgaon.
    const isDelhiNCR =
      pincode.startsWith("110") ||
      pincode.startsWith("121") ||
      pincode.startsWith("2010") ||
      pincode.startsWith("2013") ||
      isGurgaon; // Gurgaon is part of NCR, so it should qualify for NCR-level delivery if needed.

    // 2. Route the delivery based on precision
    if (isGurgaon && availableLocations.includes(Locations.GURGAON)) {
      // Prioritize the hyper-local 2-hour Gurgaon delivery first
      isAvailable = true;
      setCity("gurgaon", Locations.GURGAON);
      deliveryMessage =
        "Within 2 hours. (Delivery can be done within a 2-hour window.)";
    } else if (isDelhiNCR && availableLocations.includes(Locations.DELHI_NCR)) {
      // Fallback to same-day NCR delivery
      isAvailable = true;
      setCity("delhi-ncr", Locations.DELHI_NCR);
      deliveryMessage =
        "Same-day delivery. (Estimate would be by end of the day or 3-5 hours.)";
    } else if (availableLocations.includes(Locations.PAN_INDIA)) {
      // Final fallback for everywhere else in the country
      isAvailable = true;
      setCity("pan-india", Locations.PAN_INDIA);
      deliveryMessage =
        "Standard delivery. (Delivery to this pin code can be done in 3-5 days.)";
    }

    setIsPincodeValid(isAvailable);
    setPincodeMessage(isAvailable ? deliveryMessage : "");
  };

  const handlePanIndiaClick = () => {
    setCity("pan-india", Locations.PAN_INDIA);
    navigate("/collection");
  };

  // --- Render ---
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-12 md:flex-row lg:gap-20">
        <ImageGallery images={product.image} name={product.name} />
        <div className="flex h-max w-full flex-col md:w-1/2 lg:sticky lg:top-24">
          <ProductHeader
            name={product.name}
            price={product.base_price}
            unitDescription={product.unitDescription}
            description={product.description}
          />

          <ProductInfoAccordion product={product} />

          <DeliveryAvailability
            pincode={pincode}
            pincodeMessage={pincodeMessage}
            isPincodeValid={isPincodeValid}
            handlePincodeChange={handlePincodeChange}
            handleCheckPincode={handleCheckPincode}
            onPanIndiaClick={handlePanIndiaClick}
          />

          <CartActions
            quantity={quantity}
            allowedToAdd={allowedToAdd}
            isOutOfStock={isOutOfStock}
            isAddToCartDisabled={isAddToCartDisabled}
            isPincodeValid={isPincodeValid}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </main>
  );
}
