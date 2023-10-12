import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const LoadingScreen: React.FC = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Box mb={2}>
                <CircularProgress />
            </Box>
            <Typography variant="h6" color="textSecondary">
                Loading, please wait...
            </Typography>
        </Container>
    );
};

export default LoadingScreen;
