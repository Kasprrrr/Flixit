import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TextField, Button, InputAdornment, CircularProgress } from "@mui/material";
import { AccountCircle, AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegister } from "../hooks/registerRequest";

const CreateAccount: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const { mutate: register, isLoading } = useRegister(setErrorMessage);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        register(credentials);
    };

    return (
        <>
            <img
                src="https://images6.alphacoders.com/133/thumb-1920-1330710.png"
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
                        Create new account<span className="title-dot">.</span>
                    </h1>
                    <p className="subTitle">
                        Already A Member?{" "}
                        <span className="subTitle-link" onClick={() => navigate("/auth/login")}>
                            Log In
                        </span>
                    </p>
                </div>

                <div style={{ height: "10px", marginTop: "20px" }}>
                    {errorMessage && <p style={{ color: "red", margin: 0 }}>{errorMessage}</p>}
                </div>

                <form className="accountForm" onSubmit={handleSubmit}>
                    <div className="name-surname-container">
                        <TextField
                            name="firstName"
                            label="First name"
                            value={credentials.firstName}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            className="inputForm"
                            required
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            label="Last name"
                            value={credentials.lastName}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            className="inputForm"
                            required
                            fullWidth
                        />
                    </div>
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
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
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={handleChange}
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
                    />
                    <div className="buttonForm">
                        <Button variant="contained" className="buttonFirst" fullWidth>
                            Change method
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            className="buttonSecond"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Create account"}{" "}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </>
    );
};

export default CreateAccount;
