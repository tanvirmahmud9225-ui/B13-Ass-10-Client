'use client';

import React, { useState, useEffect } from 'react';
import {
    HiStar,
    HiCheckBadge,
    HiOutlineChevronLeft,
    HiOutlineChevronRight
} from 'react-icons/hi2';
import { LuSparkles, LuQuote } from 'react-icons/lu';

// ৬টি রিভিউ ডেটা রাখা হয়েছে যাতে স্লাইড হওয়া স্পষ্ট বোঝা যায়
const reviews = [
    {
        id: 1,
        name: 'Tanvir Ahmed',
        role: 'Software Engineer',
        location: 'Gulshan 2, Dhaka',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Luxury 3BHK Apartment',
        comment: 'Amazing booking experience! The physical verification gave me peace of mind. What I saw in the pictures was 100% accurate in reality. Highly recommended!',
    },
    {
        id: 2,
        name: 'Nusrat Jahan',
        role: 'Interior Designer',
        location: 'Nasirabad, Chattogram',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Modern Duplex Villa',
        comment: 'The escrow deposit system made the transaction completely risk-free. Direct communication with the verified landlord saved a lot of broker fees!',
    },
    {
        id: 3,
        name: 'Rahim Chowdhury',
        role: 'Business Consultant',
        location: 'Zindabazar, Sylhet',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Commercial Office Space',
        comment: '24/7 customer support was extraordinarily responsive when I needed lease documentation help. Meridian sets the gold standard for property hunting.',
    },
    {
        id: 4,
        name: 'Sadia Islam',
        role: 'Architect',
        location: 'Dhanmondi, Dhaka',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Studio Apartment',
        comment: 'Finding a flat without middlemen in Dhaka used to be a nightmare. Meridian made it super smooth and 100% transparent. Fantastic experience!',
    },
    {
        id: 5,
        name: 'Farhan Kabir',
        role: 'Marketing Lead',
        location: 'Khulna Sadar, Khulna',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Family Penthouse',
        comment: 'The quality of listings here is unmatched. Verified property certificates and hassle-free agreement signing made our relocation so easy.',
    },
    {
        id: 6,
        name: 'Mehnaz Karim',
        role: 'Doctor',
        location: 'Kazir Dewri, Chattogram',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        propertyRented: 'Furnished Condo',
        comment: 'Great security and immediate assistance from support. Highly satisfied with the verified landlord network. Will surely use again.',
    }
];

export default function CustomerReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // অটো স্লাইডার টাইমার (৪ সেকেন্ড পর পর পরিবর্তন হবে)
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Section Header with Arrows */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <LuSparkles className="w-3.5 h-3.5" />
                            <span>Real Feedback</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Customer Reviews
                        </h2>
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="w-4 h-4 fill-amber-400" />
                                ))}
                            </div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100">4.9 / 5</span>
                            <span>(Over 2,500+ happy tenants)</span>
                        </div>
                    </div>

                    {/* Prev/Next Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous Review"
                            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-all duration-200 active:scale-95 shadow-sm"
                        >
                            <HiOutlineChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next Review"
                            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-all duration-200 active:scale-95 shadow-sm"
                        >
                            <HiOutlineChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Slider Track (Hover করলে অটো-প্লে পজ হবে) */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1))}%)`
                        }}
                    >
                        {reviews.map((item) => (
                            <div
                                key={item.id}
                                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3.5"
                            >
                                <div className="group relative h-full bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                    {/* Decorative Quote Icon Background */}
                                    <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-800/60 group-hover:text-blue-50 dark:group-hover:text-blue-950/40 transition-colors pointer-events-none">
                                        <LuQuote className="w-10 h-10 stroke-1" />
                                    </div>

                                    <div>
                                        {/* Rating Stars */}
                                        <div className="flex gap-1 text-amber-400 mb-4">
                                            {[...Array(item.rating)].map((_, index) => (
                                                <HiStar key={index} className="w-5 h-5 fill-amber-400" />
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed italic min-h-[72px]">
                                            "{item.comment}"
                                        </p>

                                        {/* Property Tag */}
                                        <div className="mt-4 inline-block bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-400">
                                            🏠 {item.propertyRented}
                                        </div>
                                    </div>

                                    {/* User Profile */}
                                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                    {item.name}
                                                </h4>
                                                <HiCheckBadge className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {item.role} · {item.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Indicators (Dots) */}
                <div className="flex justify-center items-center gap-2 mt-10">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i
                                    ? 'w-7 bg-blue-600'
                                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}