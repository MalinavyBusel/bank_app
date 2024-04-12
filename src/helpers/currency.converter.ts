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
  const apiUrl = process.env.CONVERTER_API_URL;
  if (apiKey == undefined || apiUrl == undefined) {
    throw new Error("Currency converter env vars not provided in .env");
  }
  const url = `${apiUrl}?amount=${amount}&from=${from}&to=${to}&api_key=${apiKey}&format=json`;

  const { data } = await axios.get(url);
  return Number(data?.rates[to]?.rate_for_amount);
}
