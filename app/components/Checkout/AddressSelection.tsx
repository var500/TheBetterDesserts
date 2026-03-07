import React, { useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import type { Address } from "~/common/types";

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  onAddNewAddress: (address: Address) => void;
}

export default function AddressSelection({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  onAddNewAddress,
}: AddressSelectionProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.pincode.length !== 6)
      return alert("Valid 6 digit pincode required");

    const newAddrObj: Address = { ...newAddress, id: Date.now().toString() };
    onAddNewAddress(newAddrObj);
    setIsAddingNew(false);
    setNewAddress({ name: "", street: "", city: "", pincode: "", phone: "" });
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8">
      <Text as="h2" className="text-2xl font-bold text-primary-dark mb-6">
        Delivery Address
      </Text>

      {!isAddingNew ? (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary-dark bg-primary-dark/5"
                  : "border-gray-200 hover:border-primary-dark/30"
              }`}
            >
              <input
                type="radio"
                name="address"
                className="mt-1 mr-4 accent-primary-dark w-4 h-4"
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
              />
              <div>
                <Text as="p" className="font-bold text-primary-dark">
                  {addr.name}
                </Text>
                <Text as="p" className="text-sm text-primary-dark/70 mt-1">
                  {addr.street}, {addr.city}
                </Text>
                <Text as="p" className="text-sm text-primary-dark/70">
                  Pincode: {addr.pincode}
                </Text>
                <Text as="p" className="text-sm text-primary-dark/70">
                  Phone: {addr.phone}
                </Text>
              </div>
            </label>
          ))}
          <Button
            variant="outline"
            className="w-full rounded-2xl border-dashed"
            onClick={() => setIsAddingNew(true)}
          >
            + Add New Address
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="space-y-4 animate-in fade-in slide-in-from-top-4"
        >
          <div className="text-primary-dark grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full Name"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
              className=" w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={10}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
          </div>
          <input
            required
            placeholder="Complete Street Address"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Pincode (6 digits)"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  pincode: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={6}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddingNew(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="rounded-xl flex-1"
            >
              Save & Deliver Here
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
