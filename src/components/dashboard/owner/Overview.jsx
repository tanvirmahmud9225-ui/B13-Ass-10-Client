import { useSession } from "@/lib/auth-client";
import React from "react";
import { HiOutlineCalendar, HiOutlineHeart, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";

export default function Overview() {
    // স্ট্যাট কার্ডগুলোর ডেটা (ডাইনামিক ব্যবহারের সুবিধার্থে)
    const stats = [
        {
            id: 1,
            title: "Total Bookings",
            value: "12",
            icon: <HiOutlineCalendar className="w-5 h-5 text-gray-700" />,
        },
        {
            id: 2,
            title: "Favorites",
            value: "8",
            icon: <HiOutlineHeart className="w-5 h-5 text-gray-700" />,
        },
        {
            id: 3,
            title: "Active Rentals",
            value: "2",
            icon: <HiOutlineHome className="w-5 h-5 text-gray-700" />,
        },
        {
            id: 4,
            title: "Profile Status",
            value: "Completed",
            icon: <HiOutlineUser className="w-5 h-5 text-gray-700" />,
        },
    ];

    //  অ্যাক্টিভিটি ডেটা
    const recentActivities = [
        "Booked a 2-bedroom apartment in Dhaka.",
        'Added "Luxury Family Flat" to favorites.',
        "Updated profile information.",
        "Viewed 5 new rental properties.",
    ];


    const { data: session, isPending } = useSession();



    if (isPending) {
        return <div>
            Loading..........
        </div>
    }

    const user = session?.user


    return (
        <div className="bg-[#f8f9fa] min-h-screen p-6 md:p-10 space-y-6 text-gray-800">
            {/* 1. Header Banner Banner */}
            <div className="bg-[#18181b] text-white p-6 md:p-8 rounded-2xl shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    Welcome Back <span>"{user?.name}"</span> <span >👋</span>
                </h1>
                <p className="text-gray-300 text-sm md:text-base mt-2">
                    Manage your bookings, favorite properties, and profile from your dashboard.
                </p>
            </div>

            {/* 2. Stats Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                            {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* 3. Recent Activity Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <ul className="space-y-3 text-sm md:text-base text-gray-600">
                    {recentActivities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mr-2 text-gray-400">•</span>
                            <span>{activity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}