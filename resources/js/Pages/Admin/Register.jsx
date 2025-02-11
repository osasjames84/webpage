import React from "react";
import { useForm, router } from "@inertiajs/react";

const RegisterAdmin = () => {
    const { data, setData, post, errors } = useForm({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/create", {
            onSuccess: () => {
                router.visit("/admin/login");
            }
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "400px" }}>
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Create Admin Account</h1>
                <form onSubmit={handleSubmit}>
                    {["username", "email"].map((field) => (
                        <div key={field} style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                            />
                            {errors[field] && (
                                <span style={{ color: "red", fontSize: "14px" }}>{errors[field]}</span>
                            )}
                        </div>
                    ))}

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {errors.password && (
                            <span style={{ color: "red", fontSize: "14px" }}>{errors.password}</span>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {errors.password_confirmation && (
                            <span style={{ color: "red", fontSize: "14px" }}>{errors.password_confirmation}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}
                    >
                        Create Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterAdmin;
