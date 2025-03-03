/** @format */

import type { Coin } from "./types";

type PortfolioState = {
	portfolio: Coin[];
};

type PortfolioActions = {
	addCoin: (portfolio: Coin) => void;
	removeCoin: (coinID: string) => void;
};

export type PortfolioStore = PortfolioState & PortfolioActions;
