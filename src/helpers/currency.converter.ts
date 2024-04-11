import axios from "axios";

export async function convertCurrency(
  from: string,
  to: string,
  amount: number,
): Promise<number> {
  if (from === to) {
    return amount;
  }

  const apiKey = process.env.CONVERTER_API_KEY;
  if (apiKey == undefined) {
    throw new Error("currency.getgeoapi.com apiKey not provided in .env");
  }
  const url = `https://api.getgeoapi.com/v2/currency/convert?amount=${amount}&from=${from}&to=${to}&api_key=${apiKey}&format=json`;

  const response = await axios.get(url);
  return Number(response.data.rates[to].rate_for_amount);
}
