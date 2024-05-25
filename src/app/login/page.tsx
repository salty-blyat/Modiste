'use client'
import { Button, Alert } from 'antd';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import Cart from '../components/Cart/cart';
import { useAuthContext } from '../components/Context/auth';
import Navbar from '../components/Navbar/navbar';
import Loading from '../Loading';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const { login, signIn, errorMessage, setErrorMessage } = useAuthContext();

    const handleClear = () => {
        setEmail('')
        setPassword('')
        setUsername('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await signIn(username, email, password);
            } else {
                await login(email, password);
            }
            handleClear();
        } catch (error: unknown) {
            // Set error message using state
            if (error instanceof Error && 'response' in error && typeof error.response === 'object') {
                const axiosError = error as { response?: { data?: { message?: string } } };
                setErrorMessage(axiosError.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Suspense fallback={<Loading />}>

                <Navbar />
                <Cart />
                <section className="text-black h-screen px-5 bg-gray-100 flex justify-center items-center">
                    <div className="w-full max-w-md">
                        <div>
                            {errorMessage && (
                                <Alert
                                    message={errorMessage}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            )}
                        </div>
                        <Link href="/" className="mb-6 flex justify-center text-5xl items-center font-semibold text-black">
                            <span>Modiste</span>
                        </Link>
                        <div className="w-full bg-white rounded-lg md:mt-0 shadow-md">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                                    {isSignUp ? 'Sign up' : 'Log in'}
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    {isSignUp && (
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Username"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className='flex justify-center'>
                                        <Button htmlType='submit' type='primary'  >
                                            {isSignUp ? 'Sign up' : 'Log in'}
                                        </Button>
                                    </div>
                                    <p className="text-sm font-light text-black">
                                        {isSignUp ? (
                                            <>
                                                Already have an account?{' '}
                                                <button
                                                    type='button'
                                                    onClick={() => setIsSignUp(false)}
                                                    className="text-black font-medium text-primary-600 hover:underline"
                                                >
                                                    Log in
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                Don’t have an account yet?{' '}
                                                <button
                                                    type='button'
                                                    onClick={() => setIsSignUp(true)}
                                                    className="font-medium text-black text-primary-600 hover:underline"
                                                >
                                                    Sign up
                                                </button>
                                            </>
                                        )}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Suspense>

        </>
    );
}

export default LoginForm;
