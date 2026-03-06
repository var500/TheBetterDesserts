import React, { useMemo, useState } from "react";

import { Link, useNavigate } from "react-router";
import { useCartStore } from "~/store/cartStore";
import { useCityStore } from "~/store/useCityStore";
import { Locations, type Product } from "~/common/types";
import { SHOP_CATEGORIES } from "~/constants";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Icons } from "../icons";

interface ItemDetailsProps {
  product: Product;
}

export default function Itemdetails({ product }: ItemDetailsProps) {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { setCity } = useCityStore();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);

  const availableLocations = useMemo(() => {
    if (!product) return [];

    const parentCategories = SHOP_CATEGORIES.filter((cat) =>
      cat.itemIds.includes(product.id),
    );

    const locations = parentCategories.flatMap((cat) => cat.availableIn);
    return Array.from(new Set(locations));
  }, [product]);

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

  // Derived Values
  const absoluteMax = Math.min(
    product.stockAvailable ?? 0,
    product.maxPerUser ?? 5,
  );
  const isOutOfStock = absoluteMax <= 0;

  // Handlers
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return Math.max(1, Math.min(newQty, absoluteMax));
    });
  };

  const handleAddToCart = () => {
    // Add the specific quantity chosen
    for (let i = 0; i < quantity; i++) {
      addToCart(product, false);
    }
    toast.success(`Added ${product.name} to your bag!`, {
      icon: Icons.Cookie,
      style: {
        borderRadius: "16px",
        background: "#1A243F",
        color: "#F5F0E6",
        fontWeight: "bold",
      },
    });
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeMessage("Please enter a valid 6-digit pincode.");
      setIsPincodeValid(false);
      return;
    }

    let isAvailable = false;
    let locationSet = "";

    // Use availableLocations here!
    if (
      pincode.startsWith("12") &&
      availableLocations.includes(Locations.GURGAON)
    ) {
      isAvailable = true;
      locationSet = "Gurgaon";
      setCity("gurgaon", Locations.GURGAON);
    } else if (
      pincode.startsWith("11") &&
      availableLocations.includes(Locations.DELHI_NCR)
    ) {
      isAvailable = true;
      locationSet = "Delhi NCR";
      setCity("delhi-ncr", Locations.DELHI_NCR);
    } else if (availableLocations.includes(Locations.PAN_INDIA)) {
      isAvailable = true;
      locationSet = "Pan India";
      setCity("pan-india", Locations.PAN_INDIA);
    }

    if (isAvailable) {
      setIsPincodeValid(true);
      setPincodeMessage(
        `Great news! Available for delivery in ${locationSet}.`,
      );
    } else {
      setIsPincodeValid(false);
      setPincodeMessage("Sorry, this product is not available in your area.");
    }
  };
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* LEFT: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail Column (Hidden on mobile for simplicity, but easy to add) */}
          <div className="hidden md:flex flex-col gap-4 w-20 shrink-0">
            <div className="aspect-square bg-white rounded-xl overflow-hidden border-2 border-primary-dark cursor-pointer p-1">
              <img
                src={product.image}
                alt="thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* You can map over more images here if your data supports it! */}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-square md:aspect-4/5 bg-white rounded-3xl overflow-hidden border border-primary-dark/5 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: Product Info (Sticky) */}
        <div className="w-full md:w-1/2 flex flex-col lg:sticky lg:top-24 h-max">
          <Text
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-frista text-primary-dark mb-2 uppercase"
          >
            {product.name}
          </Text>

          <Text
            as="p"
            className="text-2xl font-bold text-primary-dark/90 mb-6 tracking-wide"
          >
            ₹{product.price.toLocaleString()}
          </Text>

          {/* Pincode Checker Box (Styled like your reference image) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-dark/10 mb-8">
            <Text
              as="h4"
              className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-1"
            >
              Check Delivery Availability
            </Text>
            <Text as="p" className="text-xs text-primary-dark/60 mb-4">
              Enter your pincode to see eligibility and shipping.
            </Text>

            <form
              onSubmit={handleCheckPincode}
              className="flex gap-2 items-center"
            >
              <div className="relative flex-1">
                <Icons.MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-dark/40" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full pl-9 pr-4 py-3 text-primary-dark bg-white border border-gray-200 rounded-xl text-sm focus:border-primary-dark outline-none transition-all"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="px-6 rounded-xl border-gray-200 text-primary-dark text-xs uppercase tracking-widest hover:border-primary-dark"
              >
                Check <Icons.ArrowRight className="w-3 h-3 ml-2 inline" />
              </Button>
            </form>

            {pincodeMessage && (
              <Text
                as="p"
                className={`text-xs mt-3 font-medium ${isPincodeValid ? "text-green-600" : "text-red-500"}`}
              >
                {pincodeMessage}
              </Text>
            )}
          </div>

          {/* Action Area (Quantity + Add to Cart) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-gray-200 bg-white rounded-full px-4 py-1 w-full sm:w-32 shrink-0 h-14">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 text-primary-dark/60 hover:text-primary-dark disabled:opacity-30 transition-colors"
              >
                <Icons.Minus className="w-4 h-4" />
              </button>
              <Text
                as="span"
                className="font-bold text-primary-dark w-6 text-center"
              >
                {quantity}
              </Text>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= absoluteMax}
                className="p-2 text-primary-dark/60 hover:text-primary-dark disabled:opacity-30 transition-colors"
              >
                <Icons.Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="default"
              size="lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 rounded-full h-14 text-sm tracking-widest uppercase font-bold shadow-lg hover:-translate-y-1 transition-all"
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          {/* Description Dropdown (Simulated as open for now) */}
          <div className="border-t border-primary-dark/10 pt-6">
            <div className="flex justify-between items-center mb-4 cursor-pointer">
              <Text
                as="h4"
                className="font-bold text-primary-dark flex items-center gap-2"
              >
                <Icons.MessageSquare className="w-5 h-5" /> Description
              </Text>
              <Icons.Minus className="w-5 h-5 text-primary-dark/50" />
            </div>
            <Text
              as="p"
              className="text-primary-dark/80 text-sm leading-relaxed whitespace-pre-line"
            >
              {product.unitDescription ? `${product.unitDescription}\n\n` : ""}
              Indulge in our exquisite {product.name.toLowerCase()}. Made fresh
              to order using only the finest ingredients.
              {availableLocations.includes(Locations.PAN_INDIA)
                ? " Shipped securely anywhere in India."
                : ""}
            </Text>
          </div>
        </div>
      </div>
    </main>
  );
}
