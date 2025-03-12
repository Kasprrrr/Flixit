export interface Credentials {
    email: string;
    password: string;
}

let saveTokens = (accessToken: string, refreshToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

let saveEmail = (email: string): void => {
    localStorage.setItem("email", email);
};

let logOut = (): void => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

let isLogged = (): boolean => {
    let accessToken = localStorage.getItem("accessToken");
    let email = localStorage.getItem("email");
    return !!accessToken && !!email;
};

export const accountService = {
    saveTokens,
    saveEmail,
    logOut,
    isLogged,
};
