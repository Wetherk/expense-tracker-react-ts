export type PaymentMethod = "cash" | "creditCard" | "debitCard" | "other";

export const paymentMethods: PaymentMethod[] = [
    "cash",
    "creditCard",
    "debitCard",
    "other",
];

type PaymentMethodMapping = {
    [K in PaymentMethod]: string;
};

export const paymentMethodDescriptionMapping: PaymentMethodMapping = {
    cash: "Cash",
    creditCard: "Credit Card",
    debitCard: "Debit Card",
    other: "Other",
};
