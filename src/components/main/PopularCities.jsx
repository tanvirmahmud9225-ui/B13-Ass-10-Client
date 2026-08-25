'use client';

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineMapPin } from 'react-icons/hi2';
import { LuSparkles, LuBuilding } from 'react-icons/lu';

// শহরগুলোর ডেটা, ইমেজ ও প্রপার্টি সংখ্যা
const cities = [
    {
        id: 1,
        name: 'Dhaka',
        subtitle: 'Capital & Megacity',
        properties: '1,450+ Properties',
        slug: 'dhaka',
        image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Chattogram',
        subtitle: 'Port City & Hills',
        properties: '890+ Properties',
        slug: 'chattogram',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Sylhet',
        subtitle: 'Tea Capital & Greenery',
        properties: '520+ Properties',
        slug: 'sylhet',
        image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Khulna',
        subtitle: 'Gateway to Sundarbans',
        properties: '430+ Properties',
        slug: 'khulna',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 5,
        name: 'Rajshahi',
        subtitle: 'Silk & Education City',
        properties: '380+ Properties',
        slug: 'rajshahi',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 6,
        name: 'Barishal',
        subtitle: 'Venice of Bengal',
        properties: '290+ Properties',
        slug: 'barishal',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    },
];

export default function PopularCities() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            <LuSparkles className="w-3.5 h-3.5" />
                            <span>Explore Locations</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Popular Cities
                        </h2>
                        <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-xl">
                            Explore thousands of verified homes, luxury apartments, and commercial spaces across top cities.
                        </p>
                    </div>

                    <Link
                        href="/cities"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                        <span>View All Cities</span>
                        <HiOutlineArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Cities Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/properties?city=${city.slug}`}
                            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 cursor-pointer block border border-slate-200/50 dark:border-slate-800"
                        >
                            {/* Background Image with Zoom on Hover */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${city.image})` }}
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                            {/* Top Badge: Property Count */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                                    <LuBuilding className="w-3.5 h-3.5 text-blue-300" />
                                    {city.properties}
                                </span>
                            </div>

                            {/* Card Bottom Content */}
                            <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5 text-blue-300 text-xs font-medium mb-1">
                                        <HiOutlineMapPin className="w-4 h-4" />
                                        <span>{city.subtitle}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-200 transition-colors">
                                        {city.name}
                                    </h3>
                                </div>

                                {/* Circular Action Button */}
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 shadow-lg">
                                    <HiOutlineArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </div>
                            </div>

                            {/* Subtle Border Glow on Hover */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/40 transition-colors duration-300 pointer-events-none" />
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}