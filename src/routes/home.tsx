import React from "react";
import {
    Typography,
    Container,
    Card,
    CardContent,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Home: React.FC = () => {
    return (
        <Container>
            <Card variant="outlined" sx={{ marginTop: 4, padding: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Welcome to Expense Tracker!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Keeping track of your expenses has never been easier.
                        Our app provides a simple and intuitive interface to
                        log, categorize, and analyze your spending.
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Features Overview:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Log Expenses"
                                    secondary="Easily add new expenses and view recent activity."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <BarChartIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Statistics"
                                    secondary="Visualize your spending with beautiful charts and graphs."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Categorize"
                                    secondary="Organize your expenses into categories for better analysis."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="User Profile"
                                    secondary="Manage your user profile and account settings."
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Home;
