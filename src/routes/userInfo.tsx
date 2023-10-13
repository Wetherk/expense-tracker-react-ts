import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Avatar,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

import { logOut } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/redux";

const UserInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <Container>
            <Card variant="outlined" sx={{ margin: 4, padding: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        User Info
                    </Typography>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: deepOrange[500],
                                    width: 80,
                                    height: 80,
                                    marginBottom: 2,
                                }}
                            >
                                {user.email?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Email: {user.email}
                            </Typography>
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                sx={{ marginTop: 2 }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
};

export default UserInfo;
