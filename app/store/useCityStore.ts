import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locations } from "~/common/types";

interface CityState {
  selectedCityId: string | null;
  selectedCityLabel: Locations | null;
  setCity: (id: string, label: Locations) => void;
  clearCity: () => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set) => ({
      selectedCityId: null,
      selectedCityLabel: null,
      setCity: (id, label: Locations) =>
        set({ selectedCityId: id, selectedCityLabel: label }),
      clearCity: () => set({ selectedCityId: null, selectedCityLabel: null }),
    }),
    {
      name: "better-desserts-city-storage",
    },
  ),
);
