import { currencyCodes } from "../model/Currency";
import store from "../store/redux";

const baseUrl = "https://api.freecurrencyapi.com/v1/";

const apiKey = import.meta.env.VITE_FREE_CURRENCY_API_KEY;

export const getRates = async () => {
    const baseCurrency = store.getState().expenses.baseCurrency;
    const symbols = currencyCodes
        .reduce((acc, currency) => acc.concat(`,${currency}`), "")
        .replace(`,${baseCurrency}`, "")
        .slice(1);

    const response = await fetch(
        `${baseUrl}/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${symbols}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error fetching rates");
    }

    return data;
};
