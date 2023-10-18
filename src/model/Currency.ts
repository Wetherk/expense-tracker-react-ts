export type Currency =
    | "USD"
    | "EUR"
    | "PLN"
    | "JPY"
    | "GBP"
    | "AUD"
    | "CAD"
    | "CHF"
    | "CNY"
    | "SEK"
    | "NZD";

export const currencyCodes: Currency[] = [
    "USD",
    "EUR",
    "PLN",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
];

type CurrencyMapping = {
    [K in Currency]: string;
};

export const currencySymbolMapping: CurrencyMapping = {
    USD: "$",
    EUR: "€",
    PLN: "zł",
    JPY: "¥",
    GBP: "£",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    SEK: "kr",
    NZD: "NZ$",
};

export const currencyFullNameMapping: CurrencyMapping = {
    USD: "United States Dollar",
    EUR: "Euro",
    PLN: "Polish Złoty",
    JPY: "Japanese Yen",
    GBP: "British Pound Sterling",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    SEK: "Swedish Krona",
    NZD: "New Zealand Dollar",
};

export class ExpenseCurrency {
    code: Currency;
    symbol: string;
    name: string;

    constructor(code: Currency) {
        this.code = code;
        this.symbol = currencySymbolMapping[code];
        this.name = currencyFullNameMapping[code];
    }
}
