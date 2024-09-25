import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <nav className="bg-gray-800 p-4">
            <h1 className="text-white text-center text-2xl">Tic-Tac-Toe Multiplayer</h1>
            <div className="text-white text-center mt-2">
                {!localStorage.getItem('token') ? (
                    <>
                        <Link to="/signup" className="mr-4">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
