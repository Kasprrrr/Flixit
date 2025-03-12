import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRouter from "./router/PublicRouter";
import UserRouter from "./router/UserRouter";
import AuthRouter from "./router/AuthRouter";
import AuthGuard from "./helpers/AuthGuard";

import TopMenu from "./components/nav/TopMenu";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <TopMenu />
            <div>
                <Routes>
                    <Route path="/*" element={<PublicRouter />} />
                    <Route
                        path="/user/*"
                        element={
                            <AuthGuard>
                                <UserRouter />
                            </AuthGuard>
                        }
                    />
                    <Route path="/auth/*" element={<AuthRouter />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
