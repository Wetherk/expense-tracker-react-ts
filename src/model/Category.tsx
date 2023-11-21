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

type CategoryColorMapping = {
    [K in Category]: string;
};

export const categoryColorMapping: CategoryColorMapping = {
    housing: "#FF7043",
    food: "#FFCA28",
    transportation: "#29B6F6",
    healthcare: "#66BB6A",
    personalCare: "#BA68C8",
    entertainment: "#ff4f4f",
    education: "#7986CB",
    savingsAndInvestments: "#8D6E63",
    debtPayments: "#A1887F",
    miscellaneous: "#90A4AE",
};
