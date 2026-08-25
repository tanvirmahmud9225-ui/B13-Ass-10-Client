'use client';

import React, { useState, useEffect } from 'react';
import {
    HiOutlineMapPin,
    HiOutlineHomeModern,
    HiOutlineCurrencyDollar,
    HiOutlineMagnifyingGlass,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineBuildingOffice2
} from 'react-icons/hi2';
import { LuSparkles } from 'react-icons/lu';

// স্লাইডারের ছবি ও টেক্সট ডেটা
const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        title: 'Find Your Dream Home',
        subtitle: 'Book apartments, villas and houses with trusted owners across Bangladesh.',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
        title: 'Modern Luxury Villas',
        subtitle: 'Discover premium architecture crafted for sophisticated living.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        title: 'Cozy Apartments & Flats',
        subtitle: 'Find the best rentals and shared spaces in prime city locations.',
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTab, setActiveTab] = useState('buy'); // 'buy', 'rent', 'commercial'
    const [searchParams, setSearchParams] = useState({
        location: '',
        propertyType: '',
        minPrice: '',
        maxPrice: ''
    });

    // অটো স্লাইডার টাইমার (প্রতি ৫ সেকেন্ডে পরিবর্তন হবে)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search Filters:', { tab: activeTab, ...searchParams });
        // এখানে আপনার Search/Filter রাউটিং লজিক বসাবেন
    };

    return (
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
            {/* Background Images Slider */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        } transform transition-transform duration-[6000ms]`}
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60" />
                </div>
            ))}

            {/* Slider Navigation Arrows */}
            <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
                <HiOutlineChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
                <HiOutlineChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Hero Content */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">

                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 animate-pulse">
                    <LuSparkles className="w-4 h-4 text-blue-400" />
                    <span>#1 Verified Real Estate Platform in Bangladesh</span>
                </div>

                {/* Dynamic Title & Subtitle */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
                    {slides[currentSlide].title}
                </h1>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-light">
                    {slides[currentSlide].subtitle}
                </p>

                {/* Search Box Container */}
                <div className="w-full mt-10 max-w-4xl">
                    {/* Category Tabs (Buy / Rent / Commercial) */}
                    <div className="flex items-center gap-2 mb-3 px-2">
                        {[
                            { key: 'buy', label: 'Buy' },
                            { key: 'rent', label: 'Rent' },
                            { key: 'commercial', label: 'Commercial' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-t-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.key
                                        ? 'bg-black/60 text-white backdrop-blur-xl border-t border-x border-white/20 shadow-lg'
                                        : 'text-slate-300 hover:text-white bg-black/20 hover:bg-black/40'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Glassmorphic Search Form */}
                    <form
                        onSubmit={handleSearch}
                        className="bg-black/40 backdrop-blur-xl p-3 sm:p-4 rounded-2xl md:rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-3"
                    >
                        {/* 1. Location Input */}
                        <div className="w-full md:flex-1 relative flex items-center bg-white/95 rounded-full px-4 py-3 shadow-inner">
                            <HiOutlineMapPin className="text-slate-400 w-5 h-5 flex-shrink-0 mr-2" />
                            <input
                                type="text"
                                placeholder="Location (e.g. Gulshan, Dhaka)"
                                value={searchParams.location}
                                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none font-medium"
                            />
                        </div>

                        {/* 2. Property Type Select */}
                        <div className="w-full md:w-48 relative flex items-center bg-white/95 rounded-full px-4 py-3 shadow-inner">
                            <HiOutlineHomeModern className="text-slate-400 w-5 h-5 flex-shrink-0 mr-2" />
                            <select
                                value={searchParams.propertyType}
                                onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                                className="w-full bg-transparent text-slate-800 text-sm focus:outline-none font-medium cursor-pointer"
                            >
                                <option value="">Property Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="duplex">Duplex Villa</option>
                                <option value="penthouse">Penthouse</option>
                                <option value="studio">Studio Flat</option>
                                <option value="office">Commercial Space</option>
                            </select>
                        </div>

                        {/* 3. Min Price Input */}
                        <div className="w-full md:w-36 relative flex items-center bg-white/95 rounded-full px-4 py-3 shadow-inner">
                            <HiOutlineCurrencyDollar className="text-slate-400 w-5 h-5 flex-shrink-0 mr-1.5" />
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={searchParams.minPrice}
                                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none font-medium"
                            />
                        </div>

                        {/* 4. Max Price Input */}
                        <div className="w-full md:w-36 relative flex items-center bg-white/95 rounded-full px-4 py-3 shadow-inner">
                            <HiOutlineCurrencyDollar className="text-slate-400 w-5 h-5 flex-shrink-0 mr-1.5" />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={searchParams.maxPrice}
                                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none font-medium"
                            />
                        </div>

                        {/* 5. Search Button */}
                        <button
                            type="submit"
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            <HiOutlineMagnifyingGlass className="w-5 h-5 stroke-2" />
                            <span>Search</span>
                        </button>
                    </form>
                </div>

                {/* Quick Highlights / Stats Counter */}
                <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 text-white border-t border-white/10 pt-8 max-w-2xl w-full">
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-white">12,000+</div>
                        <div className="text-xs sm:text-sm text-slate-300 font-light mt-1">Verified Properties</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-white">8,500+</div>
                        <div className="text-xs sm:text-sm text-slate-300 font-light mt-1">Happy Customers</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div className="text-2xl sm:text-3xl font-bold text-white">64+</div>
                        <div className="text-xs sm:text-sm text-slate-300 font-light mt-1">Districts Covered</div>
                    </div>
                </div>

                {/* Slider Pagination Dots */}
                <div className="flex gap-2 mt-8">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/70'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}