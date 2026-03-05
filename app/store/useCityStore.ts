import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CityState {
  selectedCityId: string | null;
  selectedCityLabel: string | null;
  setCity: (id: string, label: string) => void;
  clearCity: () => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set) => ({
      selectedCityId: null,
      selectedCityLabel: null,
      setCity: (id, label) =>
        set({ selectedCityId: id, selectedCityLabel: label }),
      clearCity: () => set({ selectedCityId: null, selectedCityLabel: null }),
    }),
    {
      name: "better-desserts-city-storage",
    },
  ),
);
