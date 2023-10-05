import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFound: React.FC = () => (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
        <SentimentVeryDissatisfiedIcon
            style={{ fontSize: "4rem", color: "#ff4242" }}
        />
        <Typography variant="h4" style={{ margin: "1rem 0" }}>
            Page Not Found
        </Typography>
        <Typography variant="subtitle1">
            Sorry, the page you're looking for doesn't exist.
        </Typography>
        <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "1rem" }}
            component={Link}
            to="/"
        >
            Go Home
        </Button>
    </Container>
);

export default NotFound;
