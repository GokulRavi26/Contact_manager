import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin, setIsLogin }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ phone, password, role });
        navigate('/contact'); 
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); 
    };

    return (
        <div className="login-container">
            <div className="image-section"></div>
            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? 
                </p>
                <button onClick={handleRegisterRedirect} className="register-button">Register</button>
            </div>
        </div>
    );
}

export default Login;
