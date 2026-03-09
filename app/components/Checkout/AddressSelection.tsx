import React, { useState } from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import type { Address } from "~/common/types";

// Update this type in your ~/common/types file as well!

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  isLoadingAddresses: boolean;
  // Prop Updates
  onAddNewAddress: (address: Omit<Address, "id">) => Promise<void>;
  onUpdateAddress: (
    addressId: string,
    address: Omit<Address, "id">,
  ) => Promise<void>;
  onDeleteAddress: (addressId: string) => Promise<void>;
  isMutating?: boolean;
}

const EMPTY_ADDRESS = {
  first_name: "",
  last_name: "",
  phone_number: "",
  house_no: "",
  street_address: "",
  city: "",
  state: "",
  pin_code: "",
  is_default: false,
};

export default function AddressSelection({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  onAddNewAddress,
  onUpdateAddress,
  onDeleteAddress,
  isLoadingAddresses,
  isMutating = false,
}: AddressSelectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>(EMPTY_ADDRESS);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(EMPTY_ADDRESS);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, addr: Address) => {
    e.stopPropagation(); // Prevent selecting the address when clicking edit
    setEditingId(addr.id as string);
    setFormData(addr);
    setIsFormOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent, addressId: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      await onDeleteAddress(addressId);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pin_code.length !== 6)
      return alert("Valid 6 digit pincode required");

    if (editingId) {
      await onUpdateAddress(editingId, formData);
    } else {
      await onAddNewAddress(formData);
    }

    setIsFormOpen(false);
    setFormData(EMPTY_ADDRESS);
    setEditingId(null);
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-primary-dark/5 animate-in fade-in slide-in-from-bottom-2 mb-8">
      <Text as="h2" className="text-2xl font-bold text-primary-dark mb-6">
        Delivery Address
      </Text>

      {!isFormOpen ? (
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <Text as="p" className="text-sm text-primary-dark/60 pb-2">
              No saved addresses found.
            </Text>
          ) : (
            addresses.map((addr) => (
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
                  className="mt-1 mr-4 w-4 h-4 appearance-none rounded-full border-2 border-gray-300 bg-white checked:border-primary-dark checked:bg-primary-dark checked:bg-clip-content p-0.75 transition-all cursor-pointer"
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id as string)}
                />
                <div>
                  <Text as="p" className="font-bold text-primary-dark">
                    {addr.first_name} {addr.last_name}
                  </Text>
                  <Text as="p" className="text-sm text-primary-dark/70 mt-1">
                    {addr.house_no}, {addr.street_address}
                  </Text>
                  <Text as="p" className="text-sm text-primary-dark/70">
                    {addr.city}, {addr.state} - {addr.pin_code}
                  </Text>

                  <div className="flex gap-4 mt-3">
                    <button
                      type="button"
                      onClick={(e) => handleOpenEdit(e, addr)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, addr.id as string)}
                      className="text-xs font-bold text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </label>
            ))
          )}
          <Button
            variant="outline"
            disabled={isLoadingAddresses}
            className="w-full rounded-2xl border-dashed"
            onClick={handleOpenAdd}
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
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              required
              placeholder="House/Flat No."
              value={formData.house_no}
              onChange={(e) =>
                setFormData({ ...formData, house_no: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Complete Street Address"
              value={formData.street_address}
              onChange={(e) =>
                setFormData({ ...formData, street_address: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark md:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Pincode (6 digits)"
              value={formData.pin_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pin_code: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={6}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
            <input
              required
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone_number: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={10}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary-dark"
            />
          </div>
          <div className="flex items-center gap-4 pl-2 w-full">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={formData.is_default}
              onChange={(e) =>
                setFormData({ ...formData, is_default: e.target.checked })
              }
              className=" mr-4 w-4 h-4 shrink-0 appearance-none rounded-sm border-2 border-gray-300 bg-white checked:bg-primary-dark checked:border-primary-dark checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox=%220%200%2016%2016%22%20fill=%22white%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat transition-all cursor-pointer"
            />
            <label
              htmlFor="default-checkbox"
              className="cursor-pointer text-primary-dark select-none"
            >
              Set as default Address?
            </label>
          </div>

          <div className="flex md:flex-row flex-col gap-4 pt-2">
            <div className="flex md:flex-row flex-col gap-4 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="rounded-xl flex-1"
                disabled={isMutating}
              >
                {isMutating
                  ? "Saving..."
                  : editingId
                    ? "Update Address"
                    : "Save & Deliver Here"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
