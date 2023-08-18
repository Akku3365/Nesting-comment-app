import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleNav = useNavigate();

    const handleLogin = () => {
        const savedUser = JSON.parse(localStorage.getItem('user'));

        if (savedUser && savedUser.email === email && savedUser.password === password) {
            // Successful login
            setError(false);
            handleNav('/blog');
        } else {
            // Invalid login
            setError(true);
        }
    };

    const goToSignup = () => {
        handleNav("/")
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Login</h3>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Enter your Email"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleLogin} className="btn btn-primary">
                                Login
                            </button>
                            {error && <p className="mt-3" style={{ color: 'red' }}>Invalid credentials??<br/>
                              <div className='text-dark fs-5 mt-4'>Try <button className='btn btn-dark' onClick={goToSignup}>Sign Up</button></div>
                            </p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
