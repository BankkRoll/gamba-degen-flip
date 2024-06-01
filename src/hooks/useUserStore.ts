// src/hooks/useUserStore.ts

import { StoreApi, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserStore {
  agreedToTerms: boolean;
  newcomer: boolean;
  gamesPlayed: string[];
  isPriorityFeeEnabled: boolean;
  priorityFee: number;
  set: StoreApi<UserStore>["setState"];
}

/**
 * Store client settings here
 */
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      agreedToTerms: false,
      newcomer: true,
      gamesPlayed: [],
      priorityFee: 400_201,
      isPriorityFeeEnabled: true,
      set,
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
