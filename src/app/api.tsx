import axios from "axios";

export async function getInformation(url) {
  const { data } = await axios(url);
  return data;
}
