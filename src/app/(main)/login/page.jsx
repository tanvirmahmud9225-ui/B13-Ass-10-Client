'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import {
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiEye,
    HiEyeSlash,
    HiBolt,
    HiExclamationCircle
} from 'react-icons/hi2';
import { CgSpinner } from 'react-icons/cg';
import { signIn } from '@/lib/auth-client';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const { data, error } = await signIn.email({
                email: email,
                password: password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message || 'Invalid email or password');
            } else if (data) {
                router.push('/');
            }
        } catch (err) {
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const DEMO_OWNER_EMAIL = "owner56@gmail.com";
    const DEMO_OWNER_PASSWORD = "owner56@D";

    const handleDemoSubmit = async () => {
        setErrorMessage('');
        setDemoLoading(true);

        try {
            const { data, error } = await signIn.email({
                email: DEMO_OWNER_EMAIL,
                password: DEMO_OWNER_PASSWORD,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message || "Demo owner login failed");
                return;
            }

            if (data) {
                router.push("/");
            }
        } catch (err) {
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setDemoLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setErrorMessage('');
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: '/',
            });
        } catch (err) {
            setErrorMessage('Failed to sign in with Google');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/70 p-4">
            {/* Main Form Card */}
            <div className="w-full max-w-[420px] bg-white rounded-2xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)]">

                {/* Header */}
                <div className="text-center mb-7">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Please enter your details to sign in
                    </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-5 p-3 bg-red-50/80 border border-red-200/80 text-red-600 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
                        <HiExclamationCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-slate-500 hover:text-slate-900 transition font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-11 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                            >
                                {showPassword ? (
                                    <HiEyeSlash className="w-5 h-5" />
                                ) : (
                                    <HiEye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || demoLoading}
                        className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <CgSpinner className="w-5 h-5 animate-spin" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="absolute bg-white px-3 text-xs text-slate-400 uppercase tracking-wider font-medium">
                        or
                    </span>
                </div>

                {/* Google Sign In Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading || demoLoading}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2.5 transition duration-150 shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <FcGoogle className="text-lg" />
                    <span>Continue with Google</span>
                </button>

                {/* Sign Up Footer Link */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Don’t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-slate-900 font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

                {/* 1-Click Demo Owner Button */}
                <div className="mt-6 pt-5 border-t border-dashed border-slate-200">
                    <button
                        type="button"
                        onClick={handleDemoSubmit}
                        disabled={loading || demoLoading}
                        className="w-full py-2.5 px-3 bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/80 text-amber-900 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                    >
                        {demoLoading ? (
                            <CgSpinner className="w-4 h-4 animate-spin text-amber-700" />
                        ) : (
                            <HiBolt className="w-4 h-4 text-amber-600" />
                        )}
                        <span>{demoLoading ? 'Logging in demo...' : 'One-Click Demo Owner Login'}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}