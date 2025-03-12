import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthRouter: FC = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
};

export default AuthRouter;
