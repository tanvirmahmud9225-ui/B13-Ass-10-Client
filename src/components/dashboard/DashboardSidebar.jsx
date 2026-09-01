'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// ✅ react-icons/hi থেকে আইকন ইমপোর্ট
import {
    HiHome,
    HiViewGrid,
    HiPlusCircle,
    HiOfficeBuilding,
    HiHeart,
    HiUser,
    HiCog,
    HiCalendar,
    HiMenu,
    HiX,
    HiShieldCheck,
    HiLogout
} from 'react-icons/hi';
import { authClient } from '@/lib/auth-client';

export default function DashboardSidebarClient({ user }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // 🔴 লগআউট হ্যান্ডলার ফাংশন
    const handleLogout = async () => {
        setIsMobileOpen(false);

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    // setIsOpen(false);
                    router.replace("/login");
                },
            },
        });

        // উদাহরণ হিসেবে লগইন পেইজে রিডাইরেক্ট:
        // router.push('/login');


    };

    // রোল অনুযায়ী মেনু আইটেম
    const dashBoardItem = {
        tenant: [
            { icon: HiHome, label: "Back to Home", link: '/' },
            { icon: HiViewGrid, label: "Overview", link: '/dashboard/tenant/overview' },
            { icon: HiCalendar, label: "My Booking", link: '/dashboard/tenant/booking' },
            { icon: HiHeart, label: "Favourites", link: '/dashboard/tenant/favourites' },
            { icon: HiUser, label: "My Profile", link: '/dashboard/tenant/profile' },
        ],
        owner: [
            { icon: HiHome, label: "Back to Home", link: '/' },
            { icon: HiViewGrid, label: "Overview", link: '/dashboard/owner/overview' },
            { icon: HiPlusCircle, label: "Add Property", link: '/dashboard/owner/property' },
            { icon: HiOfficeBuilding, label: "My Properties", link: '/dashboard/owner/properties?page=1' },
            { icon: HiCalendar, label: "Booking Requests", link: '/dashboard/owner/booking' },
            { icon: HiUser, label: "Profile", link: '/dashboard/owner/profile' },
        ],
        admin: [
            { icon: HiHome, label: "Back to Home", link: '/' },
            { icon: HiViewGrid, label: "Overview", link: '/dashboard/admin' },
            { icon: HiOfficeBuilding, label: "All Properties", link: '/dashboard/admin/allProperties' },
            { icon: HiCalendar, label: "Manage Bookings", link: '/dashboard/admin/bookings' },
            { icon: HiUser, label: "User Management", link: '/dashboard/admin/users' },
            { icon: HiShieldCheck, label: "Verification", link: '/dashboard/admin/verification' },
            // { icon: HiCog, label: "System Settings", link: '/dashboard/admin/settings' },
        ]
    };

    const currentRole = user?.role;
    const navItems = dashBoardItem[currentRole] || dashBoardItem.tenant;




    // সাইডবারের মূল কনটেন্ট
    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#070e1b] text-slate-300 border-r border-slate-800">

            {/* Brand & Role Tag */}
            <div className="p-6 border-b border-slate-800/80">
                <Link href="/" className="inline-flex items-center gap-2">
                    <Image
                        src="/logo.jpg"
                        alt="Nestora Logo"
                        width={120}
                        height={36}
                        className="h-8 w-auto object-contain rounded"
                    />
                </Link>
                <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {currentRole} Portal
                    </span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    // const basePath = item.link.split('?')[0];

                    // const isActive =
                    //     pathname === basePath ||
                    //     (pathname === `/dashboard/${currentRole}` &&
                    //         basePath === `/dashboard/${currentRole}/overview`);

                    const basePath = item.link.split("?")[0];

                    const isActive =
                        pathname === basePath ||
                        (
                            pathname === `/dashboard/${currentRole}` &&
                            basePath === `/dashboard/${currentRole}/overview`
                        );


                    return (
                        <Link
                            key={item.label}
                            href={item.link || '#'}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                                }`}
                        >
                            <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom User Card & Logout Option */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-sm uppercase">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate capitalize">
                            {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* 🔴 Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all duration-200 group"
                >
                    <HiLogout className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Log Out</span>
                </button>
            </div>

        </div>
    );

    return (
        <>
            {/* 💻 Tablet & Desktop Sidebar (md Screen and above) */}
            <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-40">
                <SidebarContent />
            </aside>

            {/* 📱 Mobile Top Bar & Hamburger Trigger */}
            <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-[#070e1b] px-4 py-3 border-b border-slate-800 text-white w-full">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.jpg"
                        alt="Nestora"
                        width={100}
                        height={30}
                        className="h-7 w-auto object-contain rounded"
                    />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 uppercase">
                        {currentRole}
                    </span>
                </div>

                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95"
                    aria-label="Open Sidebar Menu"
                >
                    <HiMenu className="w-6 h-6" />
                </button>
            </div>

            {/* 📱 Mobile Drawer Backdrop & Sliding Sidebar */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Sliding Drawer Container */}
                    <div className="relative flex flex-col w-72 max-w-full h-full bg-[#070e1b] shadow-2xl z-10 animate-in slide-in-from-left duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            aria-label="Close menu"
                        >
                            <HiX className="w-5 h-5" />
                        </button>

                        {/* Render Sidebar inside Drawer */}
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}