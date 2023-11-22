import { useState, useMemo } from "react";
import { Button, ButtonGroup, Box, Typography } from "@mui/material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface ExpensesPieChartSorterProps {
    onSort: (value: { from: Date; to: Date } | null) => void;
}

type ChartModes = "overall" | "range";

const ExpensesPieChartSorter: React.FC<ExpensesPieChartSorterProps> = ({
    onSort,
}) => {
    const [chartMode, setChartMode] = useState<ChartModes>("overall");
    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = useState<Dayjs | null>(null);

    const handleOverallClick = () => {
        onSort(null);
        setChartMode("overall");
    };

    const handleRangeClick = () => {
        handleSort();
        setChartMode("range");
    };

    const handleClear = () => {
        setDateFrom(null);
        setDateTo(null);
        onSort(null);
    };

    const handleSort = () => {
        if (dateFrom && dateTo)
            onSort({ from: dateFrom.toDate(), to: dateTo.toDate() });
    };

    const [fromError, setFromError] = useState<DateValidationError | null>(
        null
    );
    const [toError, setToError] = useState<DateValidationError | null>(null);

    const fromErrorMessage = useMemo(() => {
        switch (fromError) {
            case "maxDate":
            case "minDate":
            case "invalidDate": {
                return "Your date is not valid";
            }

            default: {
                return "";
            }
        }
    }, [fromError]);

    const toErrorMessage = useMemo(() => {
        switch (toError) {
            case "minDate": {
                return "Please enter correct date interval";
            }
            case "maxDate":
            case "invalidDate": {
                return "Your date is not valid";
            }

            default: {
                return "";
            }
        }
    }, [toError]);

    return (
        <>
            <ButtonGroup variant="contained">
                <Button
                    disabled={chartMode === "overall"}
                    onClick={handleOverallClick}
                >
                    Overall Statistics
                </Button>
                <Button
                    disabled={chartMode === "range"}
                    onClick={handleRangeClick}
                >
                    Date Range
                </Button>
            </ButtonGroup>
            {chartMode === "range" && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px",
                        }}
                    >
                        <DatePicker
                            onError={(newError) => setFromError(newError)}
                            slotProps={{
                                textField: {
                                    helperText: fromErrorMessage,
                                },
                            }}
                            label="From"
                            value={dateFrom}
                            onChange={(newValue) => setDateFrom(newValue)}
                        />
                        <Typography sx={{ margin: "0 10px" }} variant="h5">
                            -
                        </Typography>
                        <DatePicker
                            onError={(newError) => setToError(newError)}
                            slotProps={{
                                textField: {
                                    helperText: toErrorMessage,
                                },
                            }}
                            minDate={dateFrom}
                            label="To"
                            value={dateTo}
                            onChange={(newValue) => setDateTo(newValue)}
                        />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <Button onClick={handleSort} variant="contained">
                            Sort
                        </Button>
                        <Button onClick={handleClear}>Clear</Button>
                    </Box>
                </>
            )}
        </>
    );
};

export default ExpensesPieChartSorter;
