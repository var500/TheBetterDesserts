import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Zone } from "~/common/types";

interface CityState {
  selectedCityId: string | null;
  selectedCityLabel: Zone | null;
  setCity: (id: string, label: Zone) => void;
  clearCity: () => void;
}

export const useCityStore = create<CityState>()(
  persist(
    (set) => ({
      selectedCityId: null,
      selectedCityLabel: null,
      setCity: (id, label: Zone) =>
        set({ selectedCityId: id, selectedCityLabel: label }),
      clearCity: () => set({ selectedCityId: null, selectedCityLabel: null }),
    }),
    {
      name: "better-desserts-city-storage",
    },
  ),
);
