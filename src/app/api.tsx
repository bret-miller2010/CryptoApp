/** @format */

import axios from "axios";
import type { Data } from "../types";

export async function getCoinInformation(currency: string) {
    const coinKey = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
    const { data } = await axios(coinKey);
    return data;
}

export async function getDailyPriceFor(coin: string, days: number) {
    let daysToGrab = days;
    if (days <= 50) {
        daysToGrab = 50;
    }
    const dataKey = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${daysToGrab}`;
    const { data } = await axios(dataKey);
    return data;
}

export async function getSpecificCoinInfo(coin: string) {
    const key = `https://api.coingecko.com/api/v3/coins/${coin}`;
    const { data } = await axios(key);
    return data;
}

export async function getGlobalData() {
    const key = "https://api.coingecko.com/api/v3/global";
    const { data }: { data: Data } = await axios(key);
    return data;
}
