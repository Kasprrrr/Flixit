import React from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../services/account.service";

import { AccountCircle, Error } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

interface AccountMenuProps {
    customer: string[];
    isLoggedIn: boolean;
    open: boolean;
    onClose: () => void;
    isLoading: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    customer,
    isLoggedIn,
    open,
    onClose,
    isLoading,
}) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        onClose();
        navigate("/auth/login");
    };

    const handleRegisterClick = () => {
        onClose();
        navigate("/auth/register");
    };

    const handleLogoutClick = () => {
        onClose();
        accountService.logOut();
        window.location.href = "/";
    };

    const handleAppletClick = () => {
        onClose();
        navigate("/applet");
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                width: "25%",
                "& .MuiDrawer-paper": {
                    width: "25%",
                    background: "linear-gradient(315deg, #272A37 30%, black 90%)",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            <List sx={{ padding: 2, height: "100%" }}>
                <div className="drawerContent">
                    {isLoading ? (
                        <CircularProgress />
                    ) : isLoggedIn ? (
                        <>
                            <AccountCircle sx={{ fontSize: "5vw" }} />
                            <p className="drawerName">
                                {customer[1]} {customer[2]}
                            </p>
                            <p className="drawerEmail">{customer[3]}</p>
                            <div className="buttonsContainer">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAppletClick}
                                >
                                    My List
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Error sx={{ fontSize: "5vw" }} />
                            <p className="errorMessage">You're not connected</p>
                            <div className="buttonsContainer">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleRegisterClick}
                                >
                                    Sign in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </List>
        </Drawer>
    );
};

export default AccountMenu;
