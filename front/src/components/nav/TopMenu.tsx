import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCustomerProfile } from "../../hooks/getRequests";

import DrawerMenu from "./DrawerMenu";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import logo from "../../assets/images/logo.png";
import flixit from "../../assets/images/flixit.png";

const TopMenu: React.FC = () => {
    const { data: customer = [], isLoading, isError } = useCustomerProfile();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

            {isMobile ? (
                <MenuIcon sx={{ fontSize: "2em", cursor: "pointer", marginRight: "3%" }} onClick={toggleDrawer(true)} />
            ) : (
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
                        sx={{ fontSize: "2em", cursor: "pointer", marginRight: "5%" }}
                        onClick={toggleDrawer(true)}
                    />
                </div>
            )}

            <DrawerMenu
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
