import { useMutation } from "react-query";
import { reqService } from "../services/request.service";
import { accountService } from "../services/account.service";
import { Login } from "../helpers/Interface";

export const useLogin = (setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    return useMutation(
        async (credentials: Login) => {
            const res = await reqService.postReq(
                "auth/login",
                {
                    email: credentials.email,
                    password: credentials.password,
                },
                "",
            );
            return res.data;
        },
        {
            onSuccess: (data) => {
                if (data.accessToken && data.refreshToken) {
                    accountService.saveEmail(data.email);
                    accountService.saveTokens(data.accessToken, data.refreshToken);
                    window.location.href = "/";
                } else {
                    setErrorMessage(data.message || "Unknown error");
                }
            },
            onError: () => {
                setErrorMessage("An error occurred. Please try again.");
            },
        },
    );
};
