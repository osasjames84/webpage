import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const [serverError, setServerError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setServerError("");

        post("/admin/login", {
            onError: (err) => {
                if (err.username) {
                    setServerError(err.username);
                    reset("password");
                }
            },
        });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                }}
            >
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
                    Admin Login
                </h1>

                {/* ✅ Display Server Error */}
                {serverError && (
                    <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData("username", e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                        />
                        {errors.username && (
                            <span style={{ color: "red", fontSize: "14px" }}>{errors.username}</span>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                        />
                        {errors.password && (
                            <span style={{ color: "red", fontSize: "14px" }}>{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: processing ? "#6c757d" : "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: processing ? "not-allowed" : "pointer",
                            fontSize: "16px",
                        }}
                    >
                        {processing ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
