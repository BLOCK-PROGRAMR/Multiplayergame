// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem("token", token); // Store token in local storage
                alert("Login successful!");
                navigate("/game"); // Redirect to game board
            } else {
                alert("Login failed!");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4">Login</h2>
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
                Login
            </button>
        </form>
    );
};

export default Login;
