import React from 'react';
import {
    HiOutlineShieldCheck,
    HiOutlineBadgeCheck,
    HiOutlineUserGroup,
    HiOutlineSupport
} from 'react-icons/hi';
import { LuSparkles } from 'react-icons/lu';

const features = [
    {
        id: 1,
        title: 'Verified Properties',
        description: 'Every property is physically verified to ensure quality, safety, and authenticity.',
        icon: HiOutlineBadgeCheck,
        color: 'from-blue-500/20 to-cyan-500/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        borderColor: 'group-hover:border-blue-500/50',
        glowColor: 'group-hover:shadow-blue-500/10'
    },
    {
        id: 2,
        title: 'Secure Booking',
        description: 'End-to-end encrypted transactions and guaranteed refund protection policies.',
        icon: HiOutlineShieldCheck,
        color: 'from-emerald-500/20 to-teal-500/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        borderColor: 'group-hover:border-emerald-500/50',
        glowColor: 'group-hover:shadow-emerald-500/10'
    },
    {
        id: 3,
        title: 'Trusted Owners',
        description: 'Direct communication with background-checked and highly-rated landlords.',
        icon: HiOutlineUserGroup,
        color: 'from-amber-500/20 to-orange-500/20',
        iconColor: 'text-amber-600 dark:text-amber-400',
        borderColor: 'group-hover:border-amber-500/50',
        glowColor: 'group-hover:shadow-amber-500/10'
    },
    {
        id: 4,
        title: '24/7 Dedicated Support',
        description: 'Our customer support team is always available to help you anytime, anywhere.',
        icon: HiOutlineSupport,
        color: 'from-purple-500/20 to-pink-500/20',
        iconColor: 'text-purple-600 dark:text-purple-400',
        borderColor: 'group-hover:border-purple-500/50',
        glowColor: 'group-hover:shadow-purple-500/10'
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        <LuSparkles className="w-3.5 h-3.5" />
                        <span>Our Commitment</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Why Choose Us
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        We provide a hassle-free, transparent, and trustworthy real estate experience for everyone.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className={`group relative bg-white dark:bg-slate-900/80 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.glowColor} ${item.borderColor}`}
                            >
                                {/* Background Gradient Accent on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 dark:to-slate-800/30 rounded-2xl pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-start h-full">
                                    {/* Icon Container */}
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} mb-6 transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <Icon className={`w-7 h-7 ${item.iconColor}`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Bottom Highlight Indicator */}
                                    <div className="mt-auto pt-6 w-full">
                                        <div className="h-0.5 w-8 bg-slate-200 dark:bg-slate-700 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}