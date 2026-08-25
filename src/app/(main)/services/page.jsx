'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Self-contained custom SVG icons (No external icon package required)
const Icons = {
    SearchCheck: () => (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <polyline points="8 11 10 13 14 9" />
        </svg>
    ),
    CreditCard: () => (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    ),
    KeyRound: () => (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M21 2l-2 2m-1.5 1.5L14 9m-1.5 1.5l-2-2-4.5 4.5a5 5 0 1 0 7 7l4.5-4.5-2-2m-3-3L19 4" />
        </svg>
    ),
    Building2: () => (
        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
        </svg>
    ),
    UserCheck: () => (
        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
        </svg>
    ),
    TrendingUp: () => (
        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    ),
    ShieldCheck: () => (
        <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    ),
    FileText: () => (
        <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
    Headphones: () => (
        <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
    ),
    ArrowRight: () => (
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    CheckCircle2: () => (
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    )
};

export default function ServicesPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const tenantServices = [
        {
            icon: <Icons.SearchCheck />,
            title: "Verified Property Discovery",
            desc: "Browse 100% admin-moderated and verified property listings with real photos, transparent pricing, and accurate location data."
        },
        {
            icon: <Icons.CreditCard />,
            title: "Instant & Secure Stripe Booking",
            desc: "Reserve your desired rental with encrypted Stripe payment gateway. Pay reservation fees safely with instant confirmation."
        },
        {
            icon: <Icons.KeyRound />,
            title: "Smooth Move-In Assistance",
            desc: "Coordinate directly with property owners, review lease agreements, and manage your favorites & bookings right from your dashboard."
        }
    ];

    const ownerServices = [
        {
            icon: <Icons.Building2 />,
            title: "Hassle-free Property Listing",
            desc: "List residential and commercial properties with multi-image uploads, custom amenities, rent types, and detailed descriptions."
        },
        {
            icon: <Icons.UserCheck />,
            title: "Tenant Verification & Management",
            desc: "Review incoming tenant booking requests with full control to approve or reject with transparent feedback systems."
        },
        {
            icon: <Icons.TrendingUp />,
            title: "Real-Time Earnings & Analytics",
            desc: "Monitor your monthly earnings, successful transactions, and property performance using intuitive visual charts and reports."
        }
    ];

    const platformGuarantees = [
        {
            icon: <Icons.ShieldCheck />,
            title: "Role-Based Secure Access",
            desc: "JWT-authenticated role protection ensuring strict data boundaries between Tenants, Owners, and Administrators."
        },
        {
            icon: <Icons.FileText />,
            title: "Transparent Admin Moderation",
            desc: "Every listing goes through strict quality checks to avoid spam, fake rentals, and misleading price points."
        },
        {
            icon: <Icons.Headphones />,
            title: "24/7 Dedicated Dispute Support",
            desc: "Fast resolution mechanism for payment queries, booking cancellations, or listing moderation feedback."
        }
    ];

    const steps = [
        { number: "01", title: "Explore & Filter", desc: "Search properties by location, type, and price range." },
        { number: "02", title: "Book & Pay", desc: "Submit move-in details and pay safely via Stripe." },
        { number: "03", title: "Owner Approval", desc: "Get confirmation directly from the verified owner." },
        { number: "04", title: "Collect Keys & Move", desc: "Enjoy your hassle-free new rental experience." }
    ];

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen">

            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm">
                        End-to-End Rental Solutions
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        Services Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Tenants & Owners</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        From smart property listings and automated earnings analytics to secure Stripe reservation workflows — we make renting seamless and transparent.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/all-properties"
                            className="px-8 py-3.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center gap-2 group"
                        >
                            Browse Properties
                            <Icons.ArrowRight />
                        </Link>
                        <Link
                            href="/register"
                            className="px-8 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all duration-200"
                        >
                            Become an Owner
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* 2. TENANT SERVICES */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">For Home Seekers</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">Services For Tenants</h2>
                    <p className="text-slate-600 mt-3">Find verified homes, manage bookings in real time, and pay with confidence.</p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {tenantServices.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="p-3.5 bg-blue-50 w-fit rounded-xl mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-blue-600 font-semibold text-sm">
                                <span>Verified Service</span>
                                <Icons.CheckCircle2 />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 3. OWNER SERVICES */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">For Landlords & Hosts</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-slate-900">Services For Property Owners</h2>
                        <p className="text-slate-600 mt-3">Maximize your rental yield with automated booking systems and analytical tools.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {ownerServices.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="p-3.5 bg-emerald-50 w-fit rounded-xl mb-6">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-emerald-600 font-semibold text-sm">
                                    <span>Growth Focused</span>
                                    <Icons.CheckCircle2 />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. WORKFLOW PROCESS */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How The Platform Works</h2>
                    <p className="text-slate-600 mt-3">Simple 4-step workflow connecting tenants directly to verified property owners.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl border border-slate-200 relative overflow-hidden group hover:border-blue-400 transition-colors"
                        >
                            <span className="text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors absolute top-2 right-4">
                                {step.number}
                            </span>
                            <div className="relative z-10">
                                <span className="inline-block w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm leading-8 text-center mb-4">
                                    {idx + 1}
                                </span>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. TRUST & SECURITY */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Security & Compliance</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2">Why Our Platform Is Safe</h2>
                        <p className="text-slate-400 mt-3">Advanced security architecture protecting every user interaction and transaction.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {platformGuarantees.map((item, index) => (
                            <div key={index} className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
                                <div className="p-3 bg-slate-700/60 w-fit rounded-xl mb-5 text-blue-400">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Ready to find or list your next property?
                        </h3>
                        <p className="mt-4 text-blue-100 text-base sm:text-lg">
                            Join hundreds of happy tenants and property owners managing seamless rentals today.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/register"
                                className="px-8 py-3.5 rounded-xl font-bold bg-white text-blue-700 hover:bg-slate-100 shadow-md transition-all duration-200"
                            >
                                Create Free Account
                            </Link>
                            <Link
                                href="/all-properties"
                                className="px-8 py-3.5 rounded-xl font-bold bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400/40 transition-all duration-200"
                            >
                                Explore Properties
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}