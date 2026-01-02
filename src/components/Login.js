import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(username, password);
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            // Redirect to home/todo page
            navigate('/todo');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password.');
            } else if (err.response && err.response.data) {
                setError(typeof err.response.data === 'string'
                    ? err.response.data
                    : 'Login failed. Please try again.');
            } else {
                setError('Failed to connect to server. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <div style={{ marginBottom: '10px' }}>OR</div>
                    <button 
                        type="button"
                        onClick={() => window.location.href = `${process.env.REACT_APP_AUTH_API_URL}/oauth2/authorization/google`}
                        style={{ padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Sign in with Google
                    </button>
                </div>

                <div className="links">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    {' | '}
                    <Link to="/signup">Create Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
