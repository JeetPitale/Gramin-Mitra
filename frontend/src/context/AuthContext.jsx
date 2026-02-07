import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:5001';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check local storage for user session on load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, role) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

            const userData = response.data.user;

            // Check if role matches
            if (userData.role !== role) {
                return {
                    success: false,
                    message: "Role mismatch. Please select the correct role."
                };
            }

            // Set user session
            const sessionUser = { ...userData, isAuthenticated: true };
            setUser(sessionUser);
            localStorage.setItem('user', JSON.stringify(sessionUser));

            // Navigate based on role
            if (role === 'farmer') {
                navigate('/farmer-dashboard');
            } else if (role === 'wholesale') {
                navigate('/wholesale-dashboard');
            } else {
                navigate('/');
            }

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Invalid credentials or role mismatch.';
            return { success: false, message: errorMessage };
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password,
                role
            });

            // After successful signup, redirect to login
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            console.error('Signup error:', error);
            const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
            return { success: false, message: errorMessage };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
