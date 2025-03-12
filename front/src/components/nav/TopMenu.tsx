import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCustomerProfile } from "../../hooks/getRequests";

import AccountMenu from "./AccountMenu";
import { AccountCircle } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import flixit from "../../assets/images/flixit.png";

const TopMenu: React.FC = () => {
    const { data: customer = [], isLoading, isError } = useCustomerProfile();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <div className="TopMenu">
            <div className="logoContainer">
                <NavLink to="">
                    <img src={logo} alt="Logo" className="logo" />
                    <img src={flixit} alt="Logo" className="flixit" />
                </NavLink>
            </div>
            <div className="navLinks">
                <NavLink
                    to=""
                    className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/user/catalog"
                    className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                >
                    Catalog
                </NavLink>
                <NavLink
                    to="/user/media"
                    className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                >
                    Media
                </NavLink>
                <NavLink
                    to="/user/game"
                    className={({ isActive }) => (isActive ? "navActive" : "navDisabled")}
                >
                    Game
                </NavLink>
                <AccountCircle
                    sx={{ fontSize: "5vh", cursor: "pointer" }}
                    onClick={toggleDrawer(true)}
                />
            </div>
            <AccountMenu
                customer={customer}
                isLoggedIn={!isError}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                isLoading={isLoading}
            />
        </div>
    );
};

export default TopMenu;
