import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api.js';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            // Store the user information in local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            // Redirect to the dashboard
            history.push('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Log In" />
        </form>
    );
}

export default LoginForm;
