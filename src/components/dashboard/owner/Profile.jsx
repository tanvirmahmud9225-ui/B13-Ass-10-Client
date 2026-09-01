'use client';

import React, { useState } from 'react';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiEdit3,
    FiCamera,
    FiCheckCircle,
    FiLock,
    FiSave,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';

export default function Profile({ userData }) {

    const { email, id, image, name, plan, role, emailVerified } = userData;




    // ডামি ইউজার ডাটা (আপনার AuthContext / Backend API থেকে সেট করবেন)

    const [user, setUser] = useState({
        name: name,
        email: email,
        role, // 'Tenant' | 'Owner' | 'Admin'
        photo: image,
        isVerified: emailVerified,
    });

    // ফর্ম এবং ট্যাব স্টেট
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'edit' | 'security'
    const [formData, setFormData] = useState({ ...user });
    const [showPassword, setShowPassword] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // ইনপুট হ্যান্ডলার
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // প্রোফাইল সেভ হ্যান্ডলার
    const handleSaveProfile = (e) => {
        e.preventDefault();
        setUser({ ...formData });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setActiveTab('overview');
    };

    // রোল অনুযায়ী ব্যাজ কালার
    const getRoleBadge = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Owner':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">

            {/* ১. কভার ও প্রোফাইল হেডার কার্ড */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
                {/* Cover Gradient */}
                <div className="h-44 sm:h-52 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Profile Details Header */}
                <div className="px-6 sm:px-8 pb-8 pt-0 relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">

                        {/* Avatar */}
                        <div className="relative group">
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-white shadow-xl bg-white"
                            />
                            <button
                                title="Change Photo"
                                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg transition-transform transform active:scale-95 cursor-pointer"
                            >
                                <FiCamera className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveTab(activeTab === 'edit' ? 'overview' : 'edit')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                            >
                                <FiEdit3 className="w-4 h-4" />
                                {activeTab === 'edit' ? 'View Profile' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    {/* User Name, Role & Details */}
                    <div className="text-center sm:text-left space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                                {user.name}
                                {user.isVerified && (
                                    <BsPatchCheckFill className="w-5 h-5 text-blue-500 inline" title="Verified Account" />
                                )}
                            </h1>
                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold border self-center sm:self-auto ${getRoleBadge(user.role)}`}>
                                {user.role}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 max-w-2xl">{user.bio}</p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-3 text-xs sm:text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <FiMail className="text-slate-400" /> {user.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FiMapPin className="text-slate-400" /> {user.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FiCalendar className="text-slate-400" /> Joined {user.joinedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* সেভ সাকসেস মেসেজ */}
            {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm">
                    <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Profile updated successfully!</span>
                </div>
            )}

            {/* ২. ট্যাব হেডার */}
            <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'overview' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                        }`}
                >
                    Account Overview
                    {activeTab === 'overview' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                </button>

                <button
                    onClick={() => setActiveTab('edit')}
                    className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'edit' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                        }`}
                >
                    Edit Profile
                    {activeTab === 'edit' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                </button>

                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-3 transition-colors relative cursor-pointer ${activeTab === 'security' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                        }`}
                >
                    Security & Password
                    {activeTab === 'security' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                </button>
            </div>

            {/* ৩. ট্যাব কনটেন্ট */}
            <div>

                {/* Tab: OVERVIEW (Full Width) */}
                {activeTab === 'overview' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{user.name}</p>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{user.email}</p>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{user.phone}</p>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Role</label>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{user.role}</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Present Address</label>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{user.location}</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">About / Bio</label>
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{user.bio}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: EDIT PROFILE */}
                {activeTab === 'edit' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                            Update Profile Details
                        </h3>

                        <form onSubmit={handleSaveProfile} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3.5 top-3.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Email Address (Read Only)</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3.5 top-3.5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3.5 top-3.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Photo URL</label>
                                    <div className="relative">
                                        <FiCamera className="absolute left-3.5 top-3.5 text-slate-400" />
                                        <input
                                            type="url"
                                            name="photo"
                                            value={formData.photo}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Location / Address</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-3.5 top-3.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-2">Short Bio</label>
                                    <textarea
                                        rows={3}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                                >
                                    <FiSave className="w-4 h-4" /> Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('overview')}
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tab: SECURITY & PASSWORD */}
                {activeTab === 'security' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-2xl">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                            Password & Account Security
                        </h3>

                        <form onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-3.5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">New Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-3.5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 6 characters"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-3.5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Re-type new password"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="pt-3">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                                >
                                    <FiLock className="w-4 h-4" /> Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}