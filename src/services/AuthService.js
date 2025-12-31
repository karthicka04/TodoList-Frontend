import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_API_URL || "http://localhost:8080/api/auth";

// Login user
export const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

// Signup user
export const signup = (username, password, email) => {
    return axios.post(`${API_URL}/signup`, { username, password, email });
};

// Request password reset - sends email with reset link
export const forgotPassword = (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};

// Reset password with token
export const resetPassword = (token, newPassword) => {
    return axios.post(`${API_URL}/reset-password`, { token, newPassword });
};

