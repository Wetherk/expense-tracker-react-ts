import { CurrencyRates, currencyCodes, Currency } from "../model/Currency";
import store from "../store/redux";

const baseUrl = "https://api.freecurrencyapi.com/v1/";

const apiKey = import.meta.env.VITE_FREE_CURRENCY_API_KEY;

export type CurrencyRatesResponseData = {
    data?: CurrencyRates;
    message?: string;
};

export const getCurrencyRates = async (): Promise<Response> => {
    const baseCurrency = store.getState().expenses.baseCurrency;
    const symbols = currencyCodes
        .reduce((acc, currency) => acc.concat(`,${currency}`), "")
        .slice(1);

    return fetch(
        `${baseUrl}/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${symbols}`
    );
};

export const parseCurrencyRates = (
    responseData: CurrencyRatesResponseData,
    response?: Response
): CurrencyRates => {
    if (response && !response.ok) {
        throw new Error(responseData.message || "Error fetching rates");
    }

    return responseData.data!;
};

export const convertToBaseCurrency = (
    amount: number,
    currencyCode: Currency
) => {
    const currencyRates = store.getState().expenses.currencyRates;

    return +(amount / currencyRates[currencyCode]!).toFixed(2);
};
