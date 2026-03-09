import React from "react";
import AddressSelection from "./AddressSelection";
import type { Address } from "~/common/types";
import {
  useAddAddress,
  useAddresses,
  useUpdateAddress,
  useDeleteAddress,
} from "~/hooks/useAddress";
import { toast } from "react-toastify";

interface CheckoutContainerProps {
  userId: string;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
}

export default function AddressManager({
  userId,
  selectedAddressId,
  setSelectedAddressId,
}: CheckoutContainerProps) {
  const { data: addresses = [], isLoading: isLoadingAddresses } =
    useAddresses(userId);
  const { mutateAsync: addAddress, isPending: isAdding } = useAddAddress();
  const { mutateAsync: updateAddress, isPending: isUpdating } =
    useUpdateAddress();
  const { mutateAsync: deleteAddress, isPending: isDeleting } =
    useDeleteAddress();

  const isMutating = isAdding || isUpdating || isDeleting;

  const handleAddNewAddress = async (newAddressData: Omit<Address, "id">) => {
    try {
      const savedAddress = await addAddress({ userId, data: newAddressData });
      toast.success("Address added successfully");
      if (savedAddress?.id) setSelectedAddressId(savedAddress.id);
    } catch (error) {
      toast.error("Failed to add address.");
      console.log((error as Error).message);
    }
  };

  const handleUpdateAddress = async (
    addressId: string,
    updatedData: Omit<Address, "id">,
  ) => {
    try {
      await updateAddress({ userId, addressId, data: updatedData });
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error("Failed to update address.");
      console.log((error as Error).message);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress({ userId, addressId });
      toast.success("Address deleted");
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }
    } catch (error) {
      toast.error("Failed to delete address.");
      console.log((error as Error).message);
    }
  };

  return (
    <AddressSelection
      addresses={addresses}
      selectedAddressId={selectedAddressId}
      setSelectedAddressId={setSelectedAddressId}
      onAddNewAddress={handleAddNewAddress}
      onUpdateAddress={handleUpdateAddress}
      onDeleteAddress={handleDeleteAddress}
      isLoadingAddresses={isLoadingAddresses}
      isMutating={isMutating}
    />
  );
}
