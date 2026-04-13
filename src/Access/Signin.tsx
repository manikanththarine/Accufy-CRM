import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { USERS } from "../contexts/AuthContext";
import { api } from '@/apicalls';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { setCurrentUser, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (savedUser && token) {
            setCurrentUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // 1. Call your actual backend API
            const response = await api.Signin(email, password);

            const data = await response.json();
            console.log(data)
            // 2. Check if the server returned an error (e.g., 401 Unauthorized)
            if (!response.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }


            /* 3. AUTHENTICATION SUCCESS
               Assuming your backend returns: 
               { 
                 token: "eyJ...", 
                 user: { id: "1", name: "Manikanth", email: "...", role: "Super Admin" } 
               }
            */

            const { token, user } = data;

            // A. Store the JWT Token for future API calls
            localStorage.setItem('token', token);

            // B. Store user info so it persists on page refresh
            localStorage.setItem('user', JSON.stringify(user));

            // C. Update Global Context State (the hooks from your useAuth)
            setCurrentUser(user);
            setIsAuthenticated(true);

            // 4. Trigger UI Success State
            setSuccess(true);

            // 5. Redirect after a short delay to show the success animation
            setTimeout(() => {
                navigate("/up-next");
            }, 1500);

        } catch (err: any) {
            // Catch network errors or the errors we threw above
            setError(err.message || 'An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-8 md:p-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                            <LogIn className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Welcome back</h1>
                        <p className="text-sm text-gray-500 mt-1">Please enter your details to sign in</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center py-8 text-center"
                            >
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-medium text-gray-900">Success!</h2>
                                <p className="text-gray-500 mt-2">You have been successfully signed in.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-6 text-sm font-medium text-black hover:underline"
                                >
                                    Back to login
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSignIn}
                                className="space-y-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Password
                                        </label>
                                        <a href="#" className="text-[11px] font-medium text-gray-400 hover:text-black transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-xs font-medium"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black text-white rounded-xl py-3.5 text-sm font-medium hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign in'
                                    )}
                                </button>

                                <div className="pt-4 text-center">
                                    <p className="text-xs text-gray-400">
                                        Don't have an account?{' '}
                                        <a href="#" className="text-black font-medium hover:underline">
                                            Sign up for free
                                        </a>
                                    </p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">
                        Protected by AuthFlow Security
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
