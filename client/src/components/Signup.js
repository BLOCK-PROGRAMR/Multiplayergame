// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Signup successful, please login!");
                navigate("/"); // Redirect to login page after signup
            } else {
                alert("Signup failed!");
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4">Signup</h2>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="p-2 border rounded w-full mb-2"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Signup
            </button>
        </form>
    );
};

export default Signup;
