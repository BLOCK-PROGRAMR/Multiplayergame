import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ReactDOM from "react-dom/client";

const App = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);

    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mt-6">
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                </Routes>
            </div>
        </Router>
    );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
