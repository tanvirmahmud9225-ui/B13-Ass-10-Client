'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import {
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiOutlinePhoto,
    HiEye,
    HiEyeSlash,
    HiExclamationCircle,
    HiCheck,
    HiXMark
} from 'react-icons/hi2';
import { CgSpinner } from 'react-icons/cg';
import { signUp, signIn } from '@/lib/auth-client';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        photoURL: '',
        password: '',
    });

    const router = useRouter();

    // Password validation criteria
    const passwordCriteria = {
        hasMinLength: formData.password.length >= 6,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Password criteria check
        if (!passwordCriteria.hasMinLength || !passwordCriteria.hasUppercase || !passwordCriteria.hasSpecialChar) {
            setErrorMessage('Please satisfy all password requirements');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signUp.email({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                image: formData.photoURL || undefined,
                callbackURL: '/',
            });

            if (error) {
                setErrorMessage(error.message || 'Registration failed. Please try again.');
                setLoading(false);
            } else if (data) {
                // সেশন সাথে সাথে সিঙ্ক ও রিফ্রেশ করার জন্য হার্ড রিডাইরেক্ট
                window.location.href = '/';
            }
        } catch (err) {
            setErrorMessage('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setErrorMessage('');
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: '/',
            });
        } catch (err) {
            setErrorMessage('Failed to sign up with Google');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/70 p-4 py-10">
            {/* Main Form Card */}
            <div className="w-full max-w-[440px] bg-white rounded-2xl p-7 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)]">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Join our property rental platform today
                    </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="mb-5 p-3 bg-red-50/80 border border-red-200/80 text-red-600 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
                        <HiExclamationCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                            />
                        </div>
                    </div>

                    {/* Photo URL (Optional) */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Profile Photo URL <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                            <HiOutlinePhoto className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="https://example.com/avatar.jpg"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
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

                    {/* Password Requirements */}
                    {formData.password && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5">
                            <p className="font-semibold text-slate-600 mb-1">Password Requirements:</p>

                            <div className="flex items-center gap-1.5">
                                {passwordCriteria.hasMinLength ? (
                                    <HiCheck className="w-4 h-4 text-emerald-600 font-bold" />
                                ) : (
                                    <HiXMark className="w-4 h-4 text-slate-400" />
                                )}
                                <span className={passwordCriteria.hasMinLength ? "text-emerald-700 font-medium" : "text-slate-500"}>
                                    At least 6 characters
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {passwordCriteria.hasUppercase ? (
                                    <HiCheck className="w-4 h-4 text-emerald-600 font-bold" />
                                ) : (
                                    <HiXMark className="w-4 h-4 text-slate-400" />
                                )}
                                <span className={passwordCriteria.hasUppercase ? "text-emerald-700 font-medium" : "text-slate-500"}>
                                    At least one uppercase letter (A-Z)
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {passwordCriteria.hasSpecialChar ? (
                                    <HiCheck className="w-4 h-4 text-emerald-600 font-bold" />
                                ) : (
                                    <HiXMark className="w-4 h-4 text-slate-400" />
                                )}
                                <span className={passwordCriteria.hasSpecialChar ? "text-emerald-700 font-medium" : "text-slate-500"}>
                                    At least one special character (!@#$%^&*)
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <CgSpinner className="w-5 h-5 animate-spin" />
                                <span>Creating account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
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

                {/* Google Sign Up */}
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2.5 transition duration-150 shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <FcGoogle className="text-lg" />
                    <span>Continue with Google</span>
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-slate-900 font-semibold hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    );
}