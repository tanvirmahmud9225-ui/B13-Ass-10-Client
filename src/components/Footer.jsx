'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// আইকন ইমপোর্ট (সব ভার্সনেই ১০০% কাজ করবে)
import {
    FaTwitter,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram
} from 'react-icons/fa';
import {
    HiMail,
    HiPhone,
    HiShieldCheck
} from 'react-icons/hi';

const footerLinks = {
    marketplace: [
        { name: 'All properties', href: '/allProperties?page=1' },
        { name: 'Top locations', href: '/locations' },
        { name: 'New this week', href: '/new-listings' },
        { name: 'Verified owners', href: '/verified-owners' },
    ],
    support: [
        { name: 'Help centre', href: '/help' },
        { name: 'Contact', href: '/contact' },
        { name: 'Safety & trust', href: '/safety' },
        { name: 'Report a listing', href: '/report' },
    ],
    company: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' },
    ],
    legal: [
        { name: 'Privacy policy', href: '/privacy' },
        { name: 'Terms of service', href: '/terms' },
        { name: 'Cookies', href: '/cookies' },
    ],
};

const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
    { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
    { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#070e1b] text-slate-400 border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">

                    {/* Brand & Info Column (Span 4) */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-6">

                        {/* ✅ Navbar-এর আসল লোগো যুক্ত করা হয়েছে */}
                        <Link href="/" className="inline-flex items-center transition-transform hover:scale-105 w-fit">
                            <Image
                                src="/logo.jpg"
                                alt="Nestora Logo"
                                width={130}
                                height={40}
                                className="h-10 w-auto object-contain rounded"
                            />
                        </Link>

                        {/* Description */}
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            A verified rental marketplace. Every listing inspected, every deposit held in escrow until keys change hands.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-3 pt-1">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="w-9 h-9 rounded-full border border-slate-700/80 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-600/20 hover:scale-110 active:scale-95 transition-all duration-300"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Direct Contact Links */}
                        <div className="space-y-2 pt-2 text-sm">
                            <a
                                href="mailto:support@nestora.com"
                                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors w-fit"
                            >
                                <HiMail className="w-4 h-4 text-slate-500" />
                                <span>support@nestora.com</span>
                            </a>
                            <a
                                href="tel:+8801700000000"
                                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors w-fit"
                            >
                                <HiPhone className="w-4 h-4 text-slate-500" />
                                <span>+880 1700-000000</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links Columns (Span 8) */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">

                        {/* Marketplace */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
                                Marketplace
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {footerLinks.marketplace.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
                                Support
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
                                Company
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-semibold text-[10px] text-slate-300">
                            N
                        </div>
                        <p>© {currentYear} Nestora Residential. All rights reserved.</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                        <HiShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Verified letting intermediary · Dhaka, Bangladesh</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}