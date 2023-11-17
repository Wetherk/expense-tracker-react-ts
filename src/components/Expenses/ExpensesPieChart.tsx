import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

import { RootState } from "../../store/redux";
import { Expense } from "../../model/Expense";
import {
    Category,
    expenseCategoryDescriptionMapping,
} from "../../model/Category";

const ExpensesPieChart: React.FC = () => {
    type SpendingPerCategory = {
        [key in Category]?: number;
    };

    const expenses: Expense[] = useSelector(
        (state: RootState) => state.expenses.items
    );

    const spendingPerCategory: SpendingPerCategory = {};

    let totalSpendingAmount = 0;

    expenses.reduce((prevValue: SpendingPerCategory, currentValue: Expense) => {
        if (!prevValue[currentValue.category.type])
            prevValue[currentValue.category.type] = 0;

        prevValue[currentValue.category.type]! += currentValue.amount;

        totalSpendingAmount += currentValue.amount;

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
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                        },
                        innerRadius: 30,
                        outerRadius: 100,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                width={500}
                height={500}
            />
        </>
    );
};

export default ExpensesPieChart;
