import { Box } from "@mui/material";

import ExpensesTable from "../components/Expenses/ExpensesTable";

const Expenses = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
                height: "100%",
            }}
        >
            <ExpensesTable />
        </Box>
    );
};

export default Expenses;
