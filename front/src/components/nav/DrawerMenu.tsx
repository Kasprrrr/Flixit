import React from "react";
import { accountService } from "../../services/account.service";

import { AccountCircle, Error } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom"; // Import NavLink

interface DrawerMenuProps {
    customer: string[];
    isLoggedIn: boolean;
    open: boolean;
    onClose: () => void;
    isLoading: boolean;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
    customer,
    isLoggedIn,
    open,
    onClose,
    isLoading,
}) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose} className="drawerMenu">
            <div className="drawerContent">
                {isLoading ? (
                    <CircularProgress />
                ) : isLoggedIn ? (
                    <>
                        <AccountCircle sx={{ fontSize: "5vh" }} />
                        <p className="drawerName">
                            {customer[1]} {customer[2]}
                        </p>
                        <p className="drawerEmail">{customer[3]}</p>

                        <NavLink
                            to="/user/profil"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Profil
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/user/catalog"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Catalog
                        </NavLink>
                        <NavLink
                            to="/user/media"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Media
                        </NavLink>
                        <NavLink
                            to="/user/game"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Game
                        </NavLink>
                        <NavLink
                            to="/auth/logout"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={() => {
                                onClose();
                                accountService.logOut();
                                window.location.href = "/";
                            }}
                        >
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <Error sx={{ fontSize: "5vw" }} />
                        <p className="errorMessage">You're not connected</p>

                        <NavLink
                            to="/auth/login"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/auth/register"
                            className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                            onClick={onClose}
                        >
                            Sign in
                        </NavLink>
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default DrawerMenu;
