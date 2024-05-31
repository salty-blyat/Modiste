'use client';
import { UserProps } from '@/app/Types/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Define the authentication context interface
interface AuthContextType {
    user: UserProps | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void | string>;
    logout: () => void;
    signIn: (username: string, email: string, password: string) => Promise<void | string>;
    errorMessage: string;
    setErrorMessage: Dispatch<React.SetStateAction<string>>;
    successMessage: string;
    setSuccessMessage: Dispatch<React.SetStateAction<string>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const url = process.env.NEXT_PUBLIC_LOGIN;
            if (!url) throw new Error('The login URL is not defined.');
            const response = await axios.post(url, { email, password });

            if (response.status === 200 && response.data.user) {
                const user = response.data.user;
                setSuccessMessage("Success login")
                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                setUser(user);
                setIsAuthenticated(true);
                router.push('/');
            } else {
                console.error('Unexpected response from server:', response);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } catch (error: unknown) {
            console.error('Error during login:', error);

            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (axios.isAxiosError(error) && error.request) {
                setErrorMessage('No response received from the server. Please try again later.');
            } else if (error instanceof Error) {
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An unknown error occurred. Please try again.');
            }
        }
    };

    const signIn = async (username: string, email: string, password: string) => {
        try {
            const url = process.env.NEXT_PUBLIC_SIGNIN;
            if (!url) throw new Error('The sign-in URL is not defined.');
            const response = await axios.post(url, { username, email, password });

            console.log('SignIn Response:', response); // Add this line for debugging

            if (response.status === 201 && response.data.user) {
                setSuccessMessage("Success signin");
                const user = response.data.user;
                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                setUser(user);
                setIsAuthenticated(true);
                return "Successfully signed in";
            } else {
                console.error('Unexpected response from server:', response);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } catch (error: unknown) {
            console.error('Error during sign-in:', error);

            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else if (axios.isAxiosError(error) && error.request) {
                setErrorMessage('No response received from the server. Please try again later.');
            } else if (error instanceof Error) {
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An unknown error occurred. Please try again.');
            }
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('user');
        setIsAuthenticated(false);
        router.push('/');
    };

    const authContext: AuthContextType = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        signIn,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
