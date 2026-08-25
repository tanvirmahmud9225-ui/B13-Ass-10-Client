'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইমপোর্ট করা হয়েছে
import {
    FiSearch,
    FiCalendar,
    FiClock,
    FiArrowRight,
    FiBookmark,
    FiShare2,
    FiTrendingUp
} from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ডামি ব্লগ ডাটা (রিয়েল এস্টেট প্ল্যাটফর্মের জন্য উপযোগী)
const BLOG_POSTS = [
    {
        id: 1,
        title: "10 Essential Things to Check Before Signing a Rental Agreement",
        slug: "things-to-check-before-signing-rental-agreement",
        excerpt: "Avoid unexpected surprises by inspecting water pressure, electrical safety, lease clauses, and hidden maintenance fees.",
        category: "Tenant Guide",
        author: {
            name: "Sophia Rahman",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            role: "Real Estate Consultant"
        },
        publishedDate: "Aug 20, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
        featured: true,
        tags: ["Rental Tips", "Lease", "Legal"]
    },
    {
        id: 2,
        title: "How Property Owners Can Maximize Rental Yield in 2026",
        slug: "maximize-rental-yield-property-owners",
        excerpt: "Strategic renovations, smart home integrations, and target pricing strategies that attract premium long-term tenants.",
        category: "Owner Strategy",
        author: {
            name: "Tanvir Ahmed",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
            role: "Property Manager"
        },
        publishedDate: "Aug 15, 2026",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
        featured: false,
        tags: ["Investment", "ROI", "Landlords"]
    },
    {
        id: 3,
        title: "Studio vs 1-Bedroom: Which Rental Fits Your Urban Lifestyle?",
        slug: "studio-vs-1-bedroom-rental-guide",
        excerpt: "A comprehensive cost-benefit breakdown for young professionals navigating high-density city living.",
        category: "Lifestyle & Decor",
        author: {
            name: "Anika Tabassum",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            role: "Interior Designer"
        },
        publishedDate: "Aug 10, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
        featured: false,
        tags: ["Apartment", "City Living", "Budget"]
    },
    {
        id: 4,
        title: "Understanding Security Deposits: Rules, Deductions & Rights",
        slug: "understanding-security-deposits-rights",
        excerpt: "A complete legal breakdown of how security deposits work, when they can be withheld, and how to get your full refund.",
        category: "Legal & Finance",
        author: {
            name: "Mahmud Hasan",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            role: "Legal Advisor"
        },
        publishedDate: "Aug 02, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
        featured: false,
        tags: ["Security Deposit", "Tenant Rights", "Finance"]
    },
    {
        id: 5,
        title: "Smart Home Tech Every Rental Apartment Needs Today",
        slug: "smart-home-tech-for-rental-apartments",
        excerpt: "From smart locks to energy-saving thermostats, discover upgrades that add huge value without damaging rental walls.",
        category: "Lifestyle & Decor",
        author: {
            name: "Sophia Rahman",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            role: "Tech Columnist"
        },
        publishedDate: "Jul 28, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
        featured: false,
        tags: ["Smart Home", "Gadgets", "Modern Living"]
    },
    {
        id: 6,
        title: "Top 5 Neighborhood Factors to Consider Before Relocating",
        slug: "neighborhood-factors-before-relocating",
        excerpt: "Commute times, public transport access, safety ratings, and nearby amenities you must evaluate before moving.",
        category: "Tenant Guide",
        author: {
            name: "Tanvir Ahmed",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
            role: "Community Expert"
        },
        publishedDate: "Jul 22, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
        featured: false,
        tags: ["Relocation", "Neighborhood", "Planning"]
    }
];

const CATEGORIES = ["All", "Tenant Guide", "Owner Strategy", "Legal & Finance", "Lifestyle & Decor"];

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [savedPosts, setSavedPosts] = useState([]);

    // বুকমার্ক টগল
    const toggleBookmark = (id) => {
        setSavedPosts(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // লাইভ সার্চ ও ক্যাটাগরি ফিল্টারিং
    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* ১. Hero / Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold tracking-wide">
                        <HiSparkles className="w-4 h-4 text-blue-600" />
                        INSIGHTS, GUIDES & MARKET NEWS
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Rental Insights & <span className="text-blue-600">Expert Advice</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                        Everything you need to know about finding the perfect home, understanding rental laws, and maximizing your property value.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto pt-4">
                        <div className="relative flex items-center">
                            <FiSearch className="absolute left-4 text-slate-400 text-lg" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles by title, keyword, or topic..."
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* ২. Category Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                >
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${selectedCategory === category
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* ৩. Featured Post */}
                {selectedCategory === "All" && !searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                    >
                        <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden relative">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                                <FiTrendingUp className="text-sm" /> Featured Story
                            </span>
                        </div>

                        <div className="lg:col-span-5 space-y-4">
                            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md">
                                {featuredPost.category}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                                {featuredPost.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                <img
                                    src={featuredPost.author.avatar}
                                    alt={featuredPost.author.name}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900">{featuredPost.author.name}</h4>
                                    <p className="text-xs text-slate-500">{featuredPost.publishedDate} • {featuredPost.readTime}</p>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer">
                                    Read Full Article
                                    <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBookmark(featuredPost.id)}
                                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                                        title="Save post"
                                    >
                                        {savedPosts.includes(featuredPost.id) ? (
                                            <FaBookmark className="text-base text-blue-600" />
                                        ) : (
                                            <FiBookmark className="text-base" />
                                        )}
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer" title="Share post">
                                        <FiShare2 className="text-base" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ৪. Blog Posts Grid (3 Columns) */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900">
                            {searchQuery ? `Search Results for "${searchQuery}"` : "Latest Articles"}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                        </span>
                    </div>

                    <AnimatePresence>
                        {filteredPosts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl p-12 text-center border border-slate-200"
                            >
                                <p className="text-lg font-semibold text-slate-700">No blog posts found</p>
                                <p className="text-sm text-slate-500 mt-1">Try adjusting your search query or category filter.</p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                                    >
                                        {/* Thumbnail */}
                                        <div className="h-52 w-full overflow-hidden relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200/40">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5">
                                                        <FiCalendar className="text-slate-400" />
                                                        {post.publishedDate}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FiClock className="text-slate-400" />
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 cursor-pointer">
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            {/* Author & Action Footer */}
                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2.5">
                                                    <img
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                                                    />
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-900">{post.author.name}</p>
                                                        <p className="text-[11px] text-slate-500">{post.author.role}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => toggleBookmark(post.id)}
                                                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                                        title="Save post"
                                                    >
                                                        {savedPosts.includes(post.id) ? (
                                                            <FaBookmark className="text-sm text-blue-600" />
                                                        ) : (
                                                            <FiBookmark className="text-sm" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ৫. Newsletter / Subscription Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl"
                >
                    <div className="max-w-2xl mx-auto space-y-3">
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Stay Updated with Rental Trends & Guides
                        </h3>
                        <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                            Get the latest property listings, landlord tips, and tenant advice delivered right to your inbox weekly. No spam, ever.
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            required
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md cursor-pointer whitespace-nowrap"
                        >
                            Subscribe Now
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
}