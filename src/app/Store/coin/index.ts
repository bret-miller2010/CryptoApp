/** @format */

import { create } from "zustand";
import type { CoinStore } from "./interfaces";
import type { Coin } from "./types";
export * from "./interfaces";

export const useCoinStore = create<CoinStore>((set) => ({
    coins: [],
    addCoin: (coin: Coin) => set((state) => ({ coins: [...state.coins, coin] })),
    removeCoin: (coin: Coin) => set((state) => ({ coins: state.coins.filter((c) => c !== coin) })),
}));
