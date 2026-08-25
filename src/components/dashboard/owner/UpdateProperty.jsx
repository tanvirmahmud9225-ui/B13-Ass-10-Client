"use client";

import { toast } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import {
    FaHome,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaImage,
    FaAlignLeft,
    FaCheckCircle,
    FaPlus,
    FaTimes,
    FaSave,
} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

export default function UpdateProperty({ property }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: property?.title || "",
        location: property?.location || "",
        propertyType: property?.propertyType || "House",
        rentType: property?.rentType || "Monthly",
        rent: property?.rent || "",
        propertySize: property?.propertySize || "",
        bedrooms: property?.bedrooms || "",
        bathrooms: property?.bathrooms || "",
        imageUrl: property?.imageUrl || "",
        description: property?.description || "",
        status: property?.status || "pending",
        amenities: property?.amenities || [],
        extraFeatures: property?.extraFeatures || [],
    });

    const [newAmenity, setNewAmenity] = useState("");
    const [newFeature, setNewFeature] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addAmenity = () => {
        if (newAmenity.trim()) {
            setFormData((prev) => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()],
            }));
            setNewAmenity("");
        }
    };

    const removeAmenity = (index) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.filter((_, i) => i !== index),
        }));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData((prev) => ({
                ...prev,
                extraFeatures: [...prev.extraFeatures, newFeature.trim()],
            }));
            setNewFeature("");
        }
    };

    const removeFeature = (index) => {
        setFormData((prev) => ({
            ...prev,
            extraFeatures: prev.extraFeatures.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            rent: Number(formData.rent),
            propertySize: Number(formData.propertySize),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
        };

        console.log(updatedData);


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${property._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                throw new Error("Update failed");
            }

            const data = await res.json();
            if (data) {
                toast.success('suc')
            }

        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-10/12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Edit Property</h1>
                    <p className="text-gray-500 mt-1">Update the details of this property listing</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
                    {/* Basic Info */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FaHome className="text-blue-500" /> Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Property title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    <FaMapMarkerAlt className="inline mr-1 text-red-400" /> Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Location"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Property Type</label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                                >
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Condo">Condo</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Studio">Studio</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Rent Type</label>
                                <select
                                    name="rentType"
                                    value={formData.rentType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Yearly">Yearly</option>
                                    <option value="Daily">Daily</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Size */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FaMoneyBillWave className="text-green-500" /> Pricing & Size
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Rent</label>
                                <input
                                    type="number"
                                    name="rent"
                                    value={formData.rent}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    <FaRulerCombined className="inline mr-1" /> Size (sqft)
                                </label>
                                <input
                                    type="number"
                                    name="propertySize"
                                    value={formData.propertySize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    <FaBed className="inline mr-1" /> Bedrooms
                                </label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    <FaBath className="inline mr-1" /> Bathrooms
                                </label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Image & Description */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FaImage className="text-purple-500" /> Media & Description
                        </h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="https://..."
                                />
                                {formData.imageUrl && (
                                    <div className="mt-3">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="h-100 w-full object-cover rounded-lg border"
                                            onError={(e) => (e.target.style.display = "none")}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    <FaAlignLeft className="inline mr-1" /> Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                    placeholder="Write a detailed description..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Status */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <FaCheckCircle className="text-emerald-500" /> Status
                        </h2>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="rented">Rented</option>
                        </select>
                    </section>

                    {/* Amenities */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Amenities</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Add amenity (e.g. WiFi, Parking)"
                            />
                            <button
                                type="button"
                                onClick={addAmenity}
                                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.amenities.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => removeAmenity(index)}
                                        className="text-blue-400 hover:text-red-500 transition"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </span>
                            ))}
                            {formData.amenities.length === 0 && (
                                <p className="text-gray-400 text-sm">No amenities added yet</p>
                            )}
                        </div>
                    </section>

                    {/* Extra Features */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Extra Features</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Add extra feature"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.extraFeatures.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="text-indigo-400 hover:text-red-500 transition"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </span>
                            ))}
                            {formData.extraFeatures.length === 0 && (
                                <p className="text-gray-400 text-sm">No extra features added yet</p>
                            )}
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
                        >
                            <FaSave /> Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FcCancel size={20} /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}