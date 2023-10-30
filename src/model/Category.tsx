import { ReactElement } from "react";
import {
    DirectionsTransit,
    House,
    Kitchen,
    HealthAndSafety,
    Spa,
    Attractions,
    School,
    Money,
    AccountBalance,
    MiscellaneousServices,
} from "@mui/icons-material";

export type Category =
    | "housing"
    | "food"
    | "transportation"
    | "healthcare"
    | "personalCare"
    | "entertainment"
    | "education"
    | "savingsAndInvestments"
    | "debtPayments"
    | "miscellaneous";

export const categoryOptions: Category[] = [
    "housing",
    "food",
    "transportation",
    "healthcare",
    "personalCare",
    "entertainment",
    "education",
    "savingsAndInvestments",
    "debtPayments",
    "miscellaneous",
];

type CategoryIconMapping = {
    [K in Category]: ReactElement;
};

export const categoryIconMapping: CategoryIconMapping = {
    housing: <House />,
    food: <Kitchen />,
    transportation: <DirectionsTransit />,
    healthcare: <HealthAndSafety />,
    personalCare: <Spa />,
    entertainment: <Attractions />,
    education: <School />,
    savingsAndInvestments: <Money />,
    debtPayments: <AccountBalance />,
    miscellaneous: <MiscellaneousServices />,
};

export type ExpenseCategoryDescriptionMapping = {
    [K in Category]: string;
};

export const expenseCategoryDescriptionMapping: ExpenseCategoryDescriptionMapping =
    {
        housing: "Housing",
        food: "Food",
        transportation: "Transportation",
        healthcare: "Healthcare",
        personalCare: "Personal Care",
        entertainment: "Entertainment",
        education: "Education",
        savingsAndInvestments: "Savings and Investments",
        debtPayments: "Debt Payments",
        miscellaneous: "Miscellaneous",
    };
