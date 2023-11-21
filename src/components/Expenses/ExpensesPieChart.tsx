import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

import { RootState } from "../../store/redux";
import { Expense } from "../../model/Expense";
import {
    Category,
    categoryColorMapping,
    expenseCategoryDescriptionMapping,
} from "../../model/Category";
import { convertToBaseCurrency } from "../../service/CurrencyConversionRate";

type SpendingPerCategory = {
    [key in Category]?: number;
};

const ExpensesPieChart: React.FC = () => {
    const expenses: Expense[] = useSelector(
        (state: RootState) => state.expenses.items
    );

    const spendingPerCategory: SpendingPerCategory = {};

    let totalSpendingAmount = 0;

    expenses.reduce((prevValue: SpendingPerCategory, currentValue: Expense) => {
        if (!prevValue[currentValue.category.type])
            prevValue[currentValue.category.type] = 0;

        const convertedAmount = convertToBaseCurrency(
            currentValue.amount,
            currentValue.currency.code
        );

        prevValue[currentValue.category.type]! += convertedAmount;

        totalSpendingAmount += convertedAmount;

        return prevValue;
    }, spendingPerCategory);

    const chartExpenseData = Object.entries(spendingPerCategory).map(
        ([category, amount]) => {
            const spendingPercent = (
                (100 * amount) /
                totalSpendingAmount
            ).toFixed();

            return {
                id: category,
                value: amount,
                color: categoryColorMapping[category as Category],
                label: `${
                    expenseCategoryDescriptionMapping[category as Category]
                } ${spendingPercent}%`,
            };
        }
    );

    return (
        <>
            <PieChart
                series={[
                    {
                        data: chartExpenseData,
                        highlightScope: {
                            faded: "global",
                            highlighted: "item",
                        },
                        faded: {
                            innerRadius: 70,
                            additionalRadius: -30,
                            color: "gray",
                        },
                        innerRadius: 70,
                        outerRadius: 150,
                        cx: 200,
                        cy: 200,
                    },
                ]}
                width={700}
                height={500}
            />
        </>
    );
};

export default ExpensesPieChart;
