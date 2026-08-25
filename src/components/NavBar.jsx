'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ react-icons/hi থেকে ১০০% কাজ করা সঠিক আইকনগুলো ইমপোর্ট করা হলো
import {
    HiViewGrid,
    HiLogout,
    HiMenu,
    HiX
} from 'react-icons/hi';

import { authClient } from '@/lib/auth-client';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setIsOpen(false);
                    router.replace("/login");
                },
            },
        });
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All properties', href: '/allProperties?page=1' },
        { name: 'Services', href: '/services' },
        { name: 'Blog', href: '/blogs' },
    ];

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: 'easeInOut' }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: 'easeOut' }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: 'easeInOut' }
        }
    };

    return (
        <nav className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Left Side: Logo & Navigation Links */}
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <Link href="/" className="flex items-center transition-transform hover:scale-105">
                            <Image
                                src="/logo.jpg"
                                alt="Nestora Logo"
                                width={130}
                                height={40}
                                className="h-10 w-auto object-contain rounded"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center gap-7">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href.split('?')[0];
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative py-1 text-sm font-medium transition-colors duration-200 ${isActive
                                                ? 'text-blue-600 font-semibold'
                                                : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Auth Section (Desktop) */}
                    <div className="hidden lg:flex items-center">
                        {isPending ? (
                            <div className="flex items-center gap-3 animate-pulse">
                                <div className="w-8 h-8 rounded-full bg-slate-200" />
                                <div className="h-4 w-20 bg-slate-200 rounded" />
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                {/* User Info Capsule */}
                                <div className="flex items-center gap-3 pr-3 border-r border-slate-200">
                                    <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold flex items-center justify-center text-sm shadow-inner uppercase">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-800 truncate max-w-[130px] leading-tight">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate max-w-[150px] leading-tight">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Dashboard Link */}
                                <Link
                                    href="/dashboard/owner/overview"
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all duration-200"
                                >
                                    <HiViewGrid className="w-4 h-4 text-slate-500" />
                                    <span>Dashboard</span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
                                >
                                    <HiLogout className="w-4 h-4" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
                                >
                                    Create account
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-slate-700 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile & Tablet Drawer Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 absolute top-20 left-0 w-full z-40 shadow-xl"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                    >
                        <div className="px-4 pt-3 pb-6 space-y-4">

                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col space-y-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href.split('?')[0];
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors ${isActive
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Auth Area */}
                            <div className="pt-4 border-t border-slate-100">
                                {isPending ? (
                                    <div className="p-3 text-sm text-slate-400">Loading session...</div>
                                ) : user ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center uppercase text-sm">
                                                {user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href="/dashboard/owner/overview"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 p-2.5 rounded-xl transition-colors"
                                        >
                                            <HiViewGrid className="w-4 h-4 text-slate-500" />
                                            <span>Dashboard</span>
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 w-full text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 p-2.5 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <HiLogout className="w-4 h-4" />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 pt-1">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 py-2.5 rounded-xl transition-colors border border-slate-200"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href="/signup"
                                            onClick={() => setIsOpen(false)}
                                            className="bg-slate-900 hover:bg-blue-600 text-white text-center text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
                                        >
                                            Create account
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}