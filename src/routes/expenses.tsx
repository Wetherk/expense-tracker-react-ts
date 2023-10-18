import { Box } from "@mui/material";

import ExpensesTable from "../components/Expenses/ExpensesTable";
import NewExpense from "../components/Expenses/NewExpense";

const Expenses = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
            }}
        >
            <NewExpense />
            <ExpensesTable />
        </Box>
    );
};

export default Expenses;
