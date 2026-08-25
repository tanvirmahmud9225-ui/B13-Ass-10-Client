'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    HiOutlineLocationMarker,
    HiOutlineArrowRight,
    HiOutlineSparkles
} from 'react-icons/hi';
import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaHeart,
    FaRegHeart
} from 'react-icons/fa';

// নতুন যুক্ত হওয়া প্রপার্টি ডেটা
const recentProperties = [
    {
        id: 1,
        title: 'Green Villa',
        location: 'Khulna Sadar, Khulna',
        price: '15,000',
        rentType: 'month',
        propertyType: 'Villa',
        beds: 3,
        baths: 2,
        size: '1,650',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop',
        isNew: true,
    },
    {
        id: 2,
        title: 'Lake View Apartment',
        location: 'Gulshan 1, Dhaka',
        price: '25,000',
        rentType: 'month',
        propertyType: 'Apartment',
        beds: 3,
        baths: 3,
        size: '1,920',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
        isNew: true,
    },
    {
        id: 3,
        title: 'Royal Residence',
        location: 'Khulshi, Chattogram',
        price: '18,500',
        rentType: 'month',
        propertyType: 'Condo',
        beds: 2,
        baths: 2,
        size: '1,400',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        isNew: true,
    },
    {
        id: 4,
        title: 'Modern Family Home',
        location: 'Kazihata, Rajshahi',
        price: '22,000',
        rentType: 'month',
        propertyType: 'Duplex',
        beds: 4,
        baths: 3,
        size: '2,200',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
        isNew: true,
    }
];

export default function RecentlyAdded() {
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (id, e) => {
        e.preventDefault();
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <HiOutlineSparkles className="w-3.5 h-3.5" />
                            <span>Fresh Listings</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Recently Added
                        </h2>
                        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                            Discover the latest verified rental properties added in the last 24 hours.
                        </p>
                    </div>

                    <Link
                        href="/allProperties?page=1"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                        <span>Explore All Listings</span>
                        <HiOutlineArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentProperties.map((property) => (
                        <div
                            key={property.id}
                            className="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                        >
                            {/* Image Container */}
                            <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Top Badges */}
                                <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                                    {property.isNew && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                            New
                                        </span>
                                    )}

                                    <span className="ml-auto px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/10">
                                        {property.propertyType}
                                    </span>
                                </div>

                                {/* Favorite Heart Button */}
                                <button
                                    type="button"
                                    onClick={(e) => toggleFavorite(property.id, e)}
                                    aria-label="Save Property"
                                    className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-500 flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow cursor-pointer"
                                >
                                    {favorites[property.id] ? (
                                        <FaHeart className="w-4 h-4" />
                                    ) : (
                                        <FaRegHeart className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                                    )}
                                </button>
                            </div>

                            {/* Card Details */}
                            <div className="flex flex-1 flex-col p-4 sm:p-5">
                                {/* Title & Location */}
                                <div className="mb-3">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                        {property.title}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                        <HiOutlineLocationMarker className="w-4 h-4 text-blue-500 shrink-0" />
                                        <span className="truncate">{property.location}</span>
                                    </div>
                                </div>

                                {/* Key Specs Pills */}
                                <div className="grid grid-cols-3 gap-1.5 py-2.5 px-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-slate-100 dark:border-slate-800/80 mb-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <FaBed className="w-3.5 h-3.5 text-blue-500" />
                                        <span>{property.beds} Bed</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1 border-x border-slate-200 dark:border-slate-700">
                                        <FaBath className="w-3 h-3 text-blue-500" />
                                        <span>{property.baths} Bath</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                        <FaRulerCombined className="w-3 h-3 text-blue-500" />
                                        <span>{property.size} sqft</span>
                                    </div>
                                </div>

                                {/* Price & Action Button */}
                                <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                                            ৳{property.price}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            /{property.rentType}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/allProperties/${property.id}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-all duration-200 shadow-sm"
                                    >
                                        <span>Details</span>
                                        <HiOutlineArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}