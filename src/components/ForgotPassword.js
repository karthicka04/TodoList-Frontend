import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/AuthService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await forgotPassword(email);

            if (response.data && response.data.message) {
                setMessage(response.data.message);
            } else {
                setMessage('Password reset link has been sent to your email.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(typeof err.response.data === 'string'
                    ? err.response.data
                    : 'Failed to send reset email.');
            } else {
                setError('Failed to connect to server.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a reset link.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}


                <div className="links">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
