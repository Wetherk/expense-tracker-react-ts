import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import { RootState } from "../../store/redux";
import { Expense } from "../../model/Expense";
import {
    Category,
    categoryColorMapping,
    categoryIconMapping,
    expenseCategoryDescriptionMapping,
} from "../../model/Category";
import { convertToBaseCurrency } from "../../service/CurrencyConversionRate";
import { Currency } from "../../model/Currency";
import ExpensesPieChartSorter from "./ExpensesPieChartSorter";

type SpendingPerCategory = {
    [key in Category]?: number;
};

type ChartDataItem = {
    color: string;
    id: string;
    value: number;
    label: string;
    data: number;
    index: number;
    startAngle: number;
    endAngle: number;
    padAngle: number;
    formattedValue: string;
};

const ExpensesPieChart: React.FC = () => {
    const [chartFilter, setChartFilter] = useState<{
        from: Date;
        to: Date;
    } | null>(null);

    const expenses: Expense[] = useSelector(
        (state: RootState) => state.expenses.items
    );

    const baseCurrency: Currency = useSelector(
        (state: RootState) => state.expenses.baseCurrency
    );

    const spendingPerCategory: SpendingPerCategory = {};

    let totalSpendingAmount = 0;

    expenses.reduce((prevValue: SpendingPerCategory, currentValue: Expense) => {
        if (chartFilter) {
            const expenseDate = new Date(currentValue.date);
            if (expenseDate < chartFilter.from || expenseDate > chartFilter.to)
                return prevValue;
        }

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

    const handlePieSort = (value: { from: Date; to: Date } | null) => {
        setChartFilter(value);
    };

    return (
        <>
            <ExpensesPieChartSorter onSort={handlePieSort} />
            {!!chartExpenseData.length && (
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
                    height={500}
                    width={700}
                    tooltip={{
                        trigger: "item",
                        slots: {
                            itemContent: (props) => {
                                const { itemData, series } = props;

                                const item = series.data[
                                    itemData.dataIndex!
                                ] as ChartDataItem;

                                return (
                                    <Paper sx={{ display: "flex", padding: 3 }}>
                                        <Avatar
                                            sx={{
                                                marginRight: "10px",
                                                bgcolor: item.color,
                                            }}
                                        >
                                            {
                                                categoryIconMapping[
                                                    item.id as Category
                                                ]
                                            }
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1">
                                                {item.label}
                                            </Typography>
                                            <Typography variant="body1">
                                                {item.formattedValue}{" "}
                                                {baseCurrency}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                );
                            },
                        },
                    }}
                />
            )}
            {!chartExpenseData.length && (
                <Typography
                    sx={{ marginTop: 10 }}
                    variant="h6"
                    color="textSecondary"
                >
                    No expenses found...
                </Typography>
            )}
        </>
    );
};

export default ExpensesPieChart;
