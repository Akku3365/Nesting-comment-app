/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const [oldUser, setOldUser] = useState(false);

    const handleNav = useNavigate();

    const handleSignUp = () => {
        const userData = localStorage.getItem("user");
        const savedUser = userData ? JSON.parse(userData) : "";

        if (!email || !password) {
            setError("Both the fields are required");
        } else if (!isValidEmail(email)) {
            setError("Invalid email format");
        } else if (savedUser.email !== email) {
            const userData = { id: Date.now(), email, password, isChecked };
            localStorage.setItem("user", JSON.stringify(userData));
            setEmail("");
            setPassword("");
            setIsChecked(false);
            alert("Signup successful!");
            handleNav("/login");
        } else {
            setOldUser(true);
        }
    };

    const isValidEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    const goToLogin = () => {
        handleNav("/login");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Signup</h3>
                            <div className="mb-3">
                                <input type="email" value={email} placeholder="Enter your Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" value={password} placeholder="Enter your password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" checked={isChecked} className="form-check-input" onChange={() => setIsChecked(!isChecked)} />
                                <label className="form-check-label fw-bold">Check if you are an Admin</label>
                            </div>
                            <button onClick={handleSignUp} className="btn btn-primary">
                                Signup
                            </button>
                            <br />
                            <p className="fw-bold mt-4">
                                Old user ??
                                <button className="btn btn-dark" onClick={goToLogin}>
                                    Login
                                </button>
                            </p>
                            <br />
                            {error && (
                                <p className="mt-3" style={{ color: "red" }}>
                                    {error}
                                </p>
                            )}
                            {oldUser && <p className="fw-bold text-danger">Old User?? please Login first</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
