import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { Locations, type Product } from "~/common/types";
import { SHOP_CATEGORIES } from "~/constants";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Icons } from "../icons";

// Import our new sub-components
import ImageGallery from "./ImageGallery";
import ProductHeader from "./ProductHeader";
import DeliveryAvailability from "./DeliveryAvailability";
import CartActions from "./CartActions";
import ProductDescription from "./ProductDescription";

interface ItemDetailsProps {
  product: Product;
}

export default function Itemdetails({ product }: ItemDetailsProps) {
  const navigate = useNavigate();
  const { addToCart, cart } = useCartStore();
  const { setCity, selectedCityLabel } = useCityStore();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);

  const availableLocations = useMemo(() => {
    if (!product) return [];
    const parentCategories = SHOP_CATEGORIES.filter((cat) =>
      cat.itemIds.includes(product.id),
    );
    return Array.from(
      new Set(parentCategories.flatMap((cat) => cat.availableIn)),
    );
  }, [product]);

  useEffect(() => {
    if (!selectedCityLabel) return;

    console.log(availableLocations);

    const isCityValidForProduct = availableLocations.includes(
      selectedCityLabel as Locations,
    );

    if (!isCityValidForProduct) {
      setIsPincodeValid(false);
      setPincodeMessage(
        "Delivery is not available for this product in your selected city.",
      );
    } else {
      if (isPincodeValid !== null) {
        setIsPincodeValid(null);
        setPincode("");
        setPincodeMessage("");
      }
    }
  }, [selectedCityLabel, availableLocations]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col items-center justify-center">
        <Text as="h2" className="text-2xl text-primary-dark">
          Product not found.
        </Text>
        <Button onClick={() => navigate("/shop")} className="mt-4 rounded-xl">
          Back to Menu
        </Button>
      </div>
    );
  }

  // --- Derived Values & Limits ---
  const absoluteMax = Math.min(
    product.stockAvailable ?? 0,
    product.maxPerUser ?? 5,
  );
  const cartQuantity = useMemo(
    () => cart.find((item) => item.id === product.id)?.quantity ?? 0,
    [cart, product.id],
  );
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
    toast.success(`Added ${product.name} to your bag !`, {
      icon: Icons.Cookie,
      style: {
        borderRadius: "16px",
        background: "#1A243F",
        color: "#F5F0E6",
        fontWeight: "bold",
      },
    });
    setQuantity(1);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value.replace(/\D/g, ""));
    if (isPincodeValid !== null) {
      setIsPincodeValid(null);
    }
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

    if (
      pincode.startsWith("12") &&
      availableLocations.includes(Locations.GURGAON)
    ) {
      isAvailable = true;
      setCity("gurgaon", Locations.GURGAON);
      deliveryMessage =
        "Within 2 hours. (Delivery can be done within a 2 hours window.)";
    } else if (
      pincode.startsWith("11") &&
      availableLocations.includes(Locations.DELHI_NCR)
    ) {
      isAvailable = true;
      setCity("delhi-ncr", Locations.DELHI_NCR);
      deliveryMessage =
        "Same-day delivery. (Estimate would be by end of the day or 3-5 hours.)";
    } else if (availableLocations.includes(Locations.PAN_INDIA)) {
      isAvailable = true;
      setCity("pan-india", Locations.PAN_INDIA);
      deliveryMessage =
        "Standard delivery. (Delivery to this pin code can be done in 3-5 days.)";
    }

    if (isAvailable) {
      setIsPincodeValid(true);
      setPincodeMessage(deliveryMessage);
    } else {
      setIsPincodeValid(false);
      setPincodeMessage("");
    }
  };

  const handlePanIndiaClick = () => {
    setCity("pan-india", Locations.PAN_INDIA);
    navigate("/collection");
  };

  // --- Render ---
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* LEFT: Image Gallery */}
        <ImageGallery image={product.image} name={product.name} />

        <div className="w-full md:w-1/2 flex flex-col lg:sticky lg:top-24 h-max">
          <ProductHeader name={product.name} price={product.price} />

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

          <ProductDescription
            product={product}
            availableLocations={availableLocations}
          />
        </div>
      </div>
    </main>
  );
}
