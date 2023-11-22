import { Box } from "@mui/material";

import ExpensesTable from "../components/Expenses/Table/ExpensesTable";

const Expenses = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                height: "100%",
            }}
        >
            <ExpensesTable />
        </Box>
    );
};

export default Expenses;
