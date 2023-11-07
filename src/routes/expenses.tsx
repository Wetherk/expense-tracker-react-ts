import { Box } from "@mui/material";

import ExpensesTable from "../components/Expenses/ExpensesTable";

const Expenses = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                height: "90%",
            }}
        >
            <ExpensesTable />
        </Box>
    );
};

export default Expenses;
