import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TextField, Button, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff, AlternateEmail } from "@mui/icons-material";
import { useLogin } from "../hooks/loginRequest";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const { mutate: login, isLoading } = useLogin(setErrorMessage);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(credentials);
    };

    return (
        <>
            <img
                src="https://images7.alphacoders.com/138/thumb-1920-1382622.png"
                alt="Description"
                className="imageLarge"
            />
            <div className="circleOverlay" />
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="accountTemplate"
            >
                <div className="text">
                    <h1 className="title">
                        Login<span className="title-dot">.</span>
                    </h1>
                    <p className="subTitle">
                        Don't have an account?{" "}
                        <span className="subTitle-link" onClick={() => navigate("/auth/register")}>
                            Create one
                        </span>
                    </p>
                </div>

                <div style={{ height: "10px", marginTop: "20px" }}>
                    {errorMessage && <p style={{ color: "red", margin: 0 }}>{errorMessage}</p>}
                </div>

                <form className="accountForm" onSubmit={handleSubmit}>
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmail />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="inputForm"
                        required
                        fullWidth
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={onChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start" style={{ cursor: "pointer" }}>
                                        {showPassword ? (
                                            <Visibility onClick={toggleShowPassword} />
                                        ) : (
                                            <VisibilityOff onClick={toggleShowPassword} />
                                        )}
                                    </InputAdornment>
                                ),
                            },
                        }}
                        className="inputForm"
                        required
                        fullWidth
                    />
                    <div className="buttonForm">
                        <Button
                            type="submit"
                            variant="contained"
                            className="buttonSecond"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Login"}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </>
    );
};

export default Login;
