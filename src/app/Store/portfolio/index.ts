/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PortfolioStore } from "./interfaces";
import type { Coin } from "./types";

export const usePortfolioStore = create<PortfolioStore>()(
	persist(
		(set) => ({
			portfolio: [],
			addCoin: (coin: Coin) => set((state) => ({ portfolio: [...state.portfolio, coin] })),
			removeCoin: (coin: string) => set((state) => ({ portfolio: state.portfolio.filter((c) => c.id !== coin) })),
		}),
		{ name: "test" }
	)
);
