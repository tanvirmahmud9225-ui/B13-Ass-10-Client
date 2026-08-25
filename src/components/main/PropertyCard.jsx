"use client";

import Link from "next/link";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
} from "react-icons/fa";

export default function PropertyCard({ property }) {
    const {
        title,
        location,
        propertyType,
        rentType,
        rent,
        propertySize,
        bedrooms,
        bathrooms,
        imageUrl,
        description,
        status,
    } = property;

    return (
        // কার্ডের হাইট সমান রাখতে h-full ব্যবহার করা হয়েছে
        <div className="group flex h-full flex-col relative w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-900">

            {/* Image Wrapper: flex-1 সরিয়ে shrink-0 দেওয়া হয়েছে যাতে ছবির হাইট ফিক্সড থাকে */}
            <div className="relative h-56 w-full shrink-0 overflow-hidden">
                <img
                    src={imageUrl || "/placeholder-property.jpg"}
                    // এখানে h-full w-full যোগ করা হয়েছে এবং group-hover বানান ঠিক করা হয়েছে
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-125"
                    alt={title}
                />

                {/* Status Badge */}
                <div className="absolute left-3 top-3">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {status}
                    </span>
                </div>

                {/* Property Type Badge */}
                <div className="absolute right-3 top-3">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {propertyType}
                    </span>
                </div>
            </div>

            {/* Content: flex-1 দেওয়া হয়েছে যাতে নিচের অংশ পুরো জায়গা নিয়ে নেয় */}
            <div className="flex flex-1 flex-col p-5">

                {/* Title & Location */}
                <div className="mb-3">
                    <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                </div>

                {/* Description */}
                {description && (
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                        {description}
                    </p>
                )}

                {/* mt-auto ব্যবহার করা হয়েছে যাতে নিচের সেকশনগুলো সব কার্ডের একদম নিচে থাকে */}
                <div className="mt-auto">
                    {/* Key Features */}
                    <div className="mb-4 grid grid-cols-3 gap-3 border-y border-gray-100 py-3 dark:border-gray-800">
                        <div className="flex flex-col items-center gap-1">
                            <FaBed className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {bedrooms}
                            </span>
                            <span className="text-xs text-gray-500">Beds</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaBath className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {bathrooms}
                            </span>
                            <span className="text-xs text-gray-500">Baths</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaRulerCombined className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {propertySize}
                            </span>
                            <span className="text-xs text-gray-500">sqft</span>
                        </div>
                    </div>

                    {/* Rent & Button */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ৳{rent}
                            </span>
                            <span className="ml-1 text-sm text-gray-500">
                                / {rentType === "Monthly" ? "month" : rentType}
                            </span>
                        </div>

                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                            <Link href={`/allProperties/${property?._id}`}>View Details</Link>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}