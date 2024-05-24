'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode, Dispatch } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Define the user interface
interface User {
    email: string;
    img_url?: string;
    password: string;
    user_id: number;
    user_name?: string;
    user_role?: string;
}

// Define the authentication context interface
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signIn: (username: string, email: string, password: string) => Promise<void>;
    errorMessage: string;
    setErrorMessage: Dispatch<string>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        // Check if user data is stored in cookies
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password
            });

            if (response.status === 200 && response.data.user) {
                const user = response.data.user;
                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                setUser(user);
                setIsAuthenticated(true);
                router.push('/');
            } else {
                // Handle unexpected responses from the server
                console.error('Unexpected response from server:', response);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                // Request made and server responded with a status code
                console.error('Error response from server:', error.response.data);
                // Set error message based on server response
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server:', error.request);
                // Set a general error message
                setErrorMessage('No response received from the server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                // Set a general error message
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const signIn = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3000/api/signin', {
                username,
                email,
                password
            });

            if (response.status === 200 && response.data.user) {
                const user = response.data.user;
                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                setUser(user);
                setIsAuthenticated(true);
                router.push('/');
            } else {
                console.error('Unexpected response from server:', response);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            console.log(error)
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (error.request) {
                setErrorMessage('No response received from the server. Please try again later.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const logout = () => {
        // Implement logout logic here
        setUser(null);
        Cookies.remove('user');
        router.push('/')
    };

    const authContext: AuthContextType = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        signIn,
        errorMessage,
        setErrorMessage
    };


    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
