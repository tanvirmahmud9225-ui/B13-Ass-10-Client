'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleGoogleSignIn = () => {
        console.log('Signing in with Google...');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] p-4">
            {/* Form Card Container */}
            <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[#111827] flex items-center justify-center gap-2">
                        Welcome Back <span className="inline-block animate-bounce">👋</span>
                    </h1>
                    <p className="text-gray-500 font-serif text-sm mt-1">
                        Login to continue
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 font-serif rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 font-serif rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#18181b] hover:bg-black text-white font-serif font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm"
                    >
                        Login
                    </button>
                </form>

                {/* Divider (OR) */}
                <div className="relative my-7 flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full" />
                    <span className="absolute bg-white px-3 font-serif text-xs text-gray-400 uppercase tracking-wider">
                        OR
                    </span>
                </div>

                {/* Google Sign In Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-white hover:bg-gray-50 text-gray-800 font-serif font-medium border border-gray-200 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                    <FcGoogle className="text-lg" />
                    <span>Continue with Google</span>
                </button>

                {/* Footer Link */}
                <div className="text-center mt-8 font-serif text-sm text-gray-700">
                    Don’t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}