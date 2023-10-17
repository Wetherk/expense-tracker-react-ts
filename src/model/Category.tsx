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

export type ExpenseCategory =
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

type CategoryIconMapping = {
    [K in ExpenseCategory]: ReactElement;
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
