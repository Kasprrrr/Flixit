import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { accountService } from "../services/account.service";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    if (!accountService.isLogged()) {
        return <Navigate to="/auth/login" />;
    }

    return <> {children} </>;
};

export default AuthGuard;
