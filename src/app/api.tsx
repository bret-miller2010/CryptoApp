import axios from "axios";

export async function getCoinInformation(currency) {
  const coinKey = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
  const { data } = await axios(coinKey);
  return data;
}

export async function getBitCoinData() {
  const dataKey =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily";
  const { data } = await axios(dataKey);
  return data;
}

export async function getSpecificCoinInfo(coin) {
  const key = `https://api.coingecko.com/api/v3/coins/${coin}`;
  const { data } = await axios(key);
  return data;
}

export async function getGlobalData() {
  const key = "https://api.coingecko.com/api/v3/global";
  const { data } = await axios(key);
  return data;
}
