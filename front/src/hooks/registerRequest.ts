import { useMutation } from "react-query";
import { reqService } from "../services/request.service";
import { accountService } from "../services/account.service";
import { Register } from "../helpers/Interface";


export const useRegister = (setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    return useMutation(
        async (credentials: Register) => {
            const res = await reqService.postReq(
                "auth/register",
                {
                    first_name: credentials.firstName,
                    last_name: credentials.lastName,
                    username: credentials.email,
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
