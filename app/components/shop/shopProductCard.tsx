import React, { useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { MapPin, Truck, Store } from "lucide-react";
import { useCartStore } from "~/store/cartStore"; // Pulling in your global cart store

export const ShopProductCard = ({
  product,
  selectedCityId,
}: {
  product: any;
  selectedCityId: string | null;
}) => {
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">(
    "delivery",
  );

  // Get cart actions from your Zustand store
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const isGurgaon = selectedCityId === "gurgaon";

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      // Fake logic: if pincode starts with 1, it's deliverable (Replace with real API later)
      setDeliveryStatus(pincode.startsWith("1") ? "success" : "error");
    }
  };

  const handleAddToCart = () => {
    // 1. Validation Guardrail: Require valid pincode for delivery
    if (deliveryMode === "delivery" && deliveryStatus !== "success") {
      alert("Please enter and check a valid delivery pincode first!");
      return;
    }

    // 2. Package the item with the user's specific location choices
    const cartItem = {
      ...product,
      quantity: 1,
      selectedDeliveryMode: deliveryMode,
      deliveryPincode: deliveryMode === "delivery" ? pincode : null,
    };

    // 3. Add to store and open the cart drawer
    if (addToCart) {
      addToCart(cartItem);
    }
    if (setIsCartOpen) {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-4xl p-4 shadow-sm border border-primary-dark/5 flex flex-col group hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F0E6] mb-4 border border-primary-dark/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-satoshi shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2">
        <div className="flex justify-between items-start mb-2">
          <Text
            as="h3"
            className="font-frista text-xl text-primary-dark leading-tight line-clamp-2"
          >
            {product.name}
          </Text>
          <Text
            as="span"
            className="font-satoshi font-black text-lg text-primary-dark"
          >
            ₹{product.price}
          </Text>
        </div>

        {/* Dynamic Options: Cake Tubs Flavors */}
        {product.category === "Cake Tubs" && product.flavors && (
          <Text
            as="p"
            className="font-satoshi text-xs text-primary-dark/50 mb-4 line-clamp-1"
          >
            Flavors: {product.flavors.join(", ")}
          </Text>
        )}

        <div className="mt-auto pt-4 border-t border-primary-dark/5 space-y-4">
          {/* Gurgaon Specific Logic: Pick-up vs Delivery Toggle */}
          {isGurgaon && (
            <div className="flex p-1 bg-[#F5F0E6] rounded-lg">
              <button
                onClick={() => {
                  setDeliveryMode("delivery");
                  setDeliveryStatus("idle");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-satoshi font-bold rounded-md transition-colors ${deliveryMode === "delivery" ? "bg-white shadow-sm text-primary-dark" : "text-primary-dark/50 hover:text-primary-dark"}`}
              >
                <Truck size={12} /> Delivery
              </button>
              <button
                onClick={() => {
                  setDeliveryMode("pickup");
                  setDeliveryStatus("success");
                  setPincode("");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-satoshi font-bold rounded-md transition-colors ${deliveryMode === "pickup" ? "bg-white shadow-sm text-primary-dark" : "text-primary-dark/50 hover:text-primary-dark"}`}
              >
                <Store size={12} /> Pick-up
              </button>
            </div>
          )}

          {/* Pincode Checker (Only show if they want delivery) */}
          {deliveryMode === "delivery" && (
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <div className="relative flex-1">
                <MapPin
                  size={12}
                  className="absolute left-2.5 top-2.5 text-primary-dark/40"
                />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ""));
                    setDeliveryStatus("idle");
                  }}
                  className="w-full pl-7 pr-2 py-2 text-xs font-satoshi bg-white border border-primary-dark/10 rounded-lg focus:ring-1 focus:ring-primary-dark outline-none transition-all"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="h-auto py-2 px-3 text-[10px]"
              >
                Check
              </Button>
            </form>
          )}

          {/* Delivery Status Messages */}
          {deliveryStatus === "success" && deliveryMode === "delivery" && (
            <Text
              as="span"
              className="block text-[10px] font-satoshi font-bold text-green-600"
            >
              ✓ Delivery available to this pin code!
            </Text>
          )}
          {deliveryStatus === "error" && (
            <Text
              as="span"
              className="block text-[10px] font-satoshi font-bold text-red-500"
            >
              ✗ Sorry, we don't deliver this item here yet.
            </Text>
          )}

          {/* The Wired Add to Cart Button */}
          <Button
            disabled={
              deliveryMode === "delivery" && deliveryStatus !== "success"
            }
            onClick={handleAddToCart}
            // Optional UX: Dim the button if delivery isn't verified yet
            className={`w-full h-10 mt-2 font-satoshi font-bold uppercase tracking-widest text-xs transition-all`}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
