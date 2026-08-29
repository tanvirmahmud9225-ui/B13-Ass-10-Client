"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaBuilding,
    FaCheckCircle,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
    FaArrowLeft,
} from "react-icons/fa";
import { BooknowModal } from "./BooknowModal";
import Image from "next/image";

export default function PropertyDetailsPage({ property }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [ratingHover, setRatingHover] = useState(0);
    const [userRating, setUserRating] = useState(0);




    // যদি প্রপস থেকে ডেটা না আসে, তবে আপনার দেওয়া ডেমো ডেটা ফলব্যাক হিসেবে কাজ করবে
    const data = property || {
        title: "Cozy Family Apartment",
        location: "Dhanmondi, Dhaka",
        propertyType: "Apartment",
        rentType: "Monthly",
        rent: 22628,
        propertySize: 1526,
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: "https://images.unsplash.com/photo-1494783367193-149034c05e8f",
        description: "A well-maintained property located in a peaceful neighborhood, close to schools, hospitals, and shopping centers. Perfect for individuals or small families seeking comfort and convenience.",
        amenities: ["Air Conditioning", "High-speed Internet", "24/7 Security", "Backup Generator"],
        status: "pending"
    };

    // ডেমো রিভিউজ
    const reviews = [
        { id: 1, name: "Md Sajib Hossain", rating: 5, comment: "Nice and cozy place!" },
        { id: 2, name: "Rahim Uddin", rating: 4, comment: "Good environment and peaceful location." },
    ];





    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Back to All Properties Button */}
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/allProperties"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    <FaArrowLeft className="text-blue-500" />
                    Back to All Properties
                </Link>

                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm ${data.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                    Status: {data.status}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ---------------- LEFT COLUMN (Main Content) ---------------- */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Main Image */}
                    <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-md">
                        <Image
                            src={data?.imageUrl}
                            alt="Picture of the author"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            width={5000}
                            height={5000}
                        />
                        {/* <img
                            src={data.imageUrl}
                            alt={data.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        /> */}
                    </div>

                    {/* Title & Location */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {data.title}
                        </h1>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                            <span className="font-medium">{data.location}</span>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {data.description}
                        </p>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { icon: FaBed, label: "Bedrooms", value: data.bedrooms },
                            { icon: FaBath, label: "Bathrooms", value: data.bathrooms },
                            { icon: FaRulerCombined, label: "Area", value: `${data.propertySize} sqft` },
                            { icon: FaBuilding, label: "Type", value: data.propertyType },
                        ].map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                                <feature.icon className="text-3xl text-blue-500 mb-2" />
                                <span className="text-gray-900 dark:text-white font-bold text-lg">{feature.value}</span>
                                <span className="text-gray-500 text-sm">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Amenities Box */}
                    {data.amenities && data.amenities.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                                Amenities & Features
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {data.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200">
                                        <FaCheckCircle className="text-green-500 shrink-0" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews & Comments Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                            Reviews & Comments
                        </h2>

                        {/* Review Form */}
                        <div className="mb-8 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center mb-3">
                                <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">Your Rating:</span>
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i} className="cursor-pointer">
                                            <input type="radio" name="rating" className="hidden" onClick={() => setUserRating(ratingValue)} />
                                            <FaStar
                                                className="text-2xl transition-colors duration-200"
                                                color={ratingValue <= (ratingHover || userRating) ? "#ffc107" : "#e4e5e9"}
                                                onMouseEnter={() => setRatingHover(ratingValue)}
                                                onMouseLeave={() => setRatingHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <textarea
                                rows="3"
                                placeholder="Write your review here..."
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none resize-none mb-3"
                            ></textarea>
                            <button className="w-full md:w-auto px-6 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition">
                                Submit Review
                            </button>
                        </div>

                        {/* Review List */}
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------------- RIGHT COLUMN (Sticky Booking Sidebar) ---------------- */}
                <div className="lg:col-span-1">
                    <div className="sticky top-25 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">

                        {/* Price */}
                        <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-blue-600 dark:text-blue-400 text-3xl font-extrabold flex items-baseline">
                                ৳{data.rent?.toLocaleString()}
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium ml-2">/ {data.rentType}</span>
                            </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">

                            <BooknowModal property={property} />
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`w-full flex justify-center items-center gap-2 font-semibold py-3 px-4 rounded-xl border-2 transition-all ${isFavorite
                                    ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-500/10"
                                    : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {isFavorite ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-xl" />}
                                {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <FaCheckCircle className="text-blue-500 text-lg" />
                                <span>Verified Property</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <FaCheckCircle className="text-blue-500 text-lg" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <FaCheckCircle className="text-blue-500 text-lg" />
                                <span>Instant Booking</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}