"use client";

import { creatProperties } from "@/lib/actions/createProperties";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import {
    FaBuilding,
    FaMapMarkerAlt,
    FaDollarSign,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaImage,
    FaListUl,
    FaPlus,
} from "react-icons/fa";
import { MdOutlineDescription, MdCategory } from "react-icons/md";

const availableAmenities = [
    "WiFi",
    "Parking",
    "Air Conditioning",
    "Lift",
    "Security",
    "Generator",
    "Gym",
    "Swimming Pool",
];

const AddPropertyForm = ({ token }) => {

    const { data: session, isPending, error, } = authClient.useSession()
    const userId = session?.user?.id

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        propertyType: "",
        rentType: "",
        rent: "",
        propertySize: "",
        bedrooms: "",
        bathrooms: "",
        extraFeatures: "",
        imageUrl: "",
        description: "",
        amenities: [],
    });

    const [loading, setLoading] = useState(false);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Amenities Checkbox
    const handleAmenityChange = (amenity) => {
        setFormData((prev) => {
            const exists = prev.amenities.includes(amenity);
            const updatedAmenities = exists
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity];

            return { ...prev, amenities: updatedAmenities };
        });
    };

    // Submit Form Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Formatted Data ready for Backend (API)
        const propertyPayload = {
            title: formData.title,
            location: formData.location,
            propertyType: formData.propertyType,
            rentType: formData.rentType,
            rent: Number(formData.rent),
            propertySize: Number(formData.propertySize),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            extraFeatures: formData.extraFeatures
                ? formData.extraFeatures.split(",").map((item) => item.trim())
                : [],
            imageUrl: formData.imageUrl,
            description: formData.description,
            amenities: formData.amenities,
            userId,
            status: "pending", // Assignment required status
        };

        // console.log("Submitting Property Data:", propertyPayload);

        // try {
        //     // TODO: Replace with your actual Backend API URL

        //     const response = await fetch('http://localhost:8000/api/properties', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json',
        //             // Authorization: `Bearer ${token}` // Add JWT if protected
        //         },
        //         body: JSON.stringify(propertyPayload)
        //     })

        //     const data = await response.json();

        //     if (response.ok) {
        //         alert("Property Added Successfully!");

        //         setFormData({
        //             title: "",
        //             location: "",
        //             propertyType: "",
        //             rentType: "",
        //             rent: "",
        //             propertySize: "",
        //             bedrooms: "",
        //             bathrooms: "",
        //             extraFeatures: "",
        //             imageUrl: "",
        //             description: "",
        //             amenities: [],
        //         });
        //     }

        // } catch (error) {
        //     console.error("Failed to add property:", error);
        // } finally {
        //     setLoading(false);
        // }

        const res = await creatProperties(propertyPayload, token)
        if (res.insertedId) {
            alert("Property Added Successfully!");
            setFormData({
                title: "",
                location: "",
                propertyType: "",
                rentType: "",
                rent: "",
                propertySize: "",
                bedrooms: "",
                bathrooms: "",
                extraFeatures: "",
                imageUrl: "",
                description: "",
                amenities: [],
            });

            setLoading(false)
        }

    };

    return (
        <div className="max-w-7xl mx-10 my-10 p-6 md:p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaBuilding className="text-blue-600" /> List a New Property
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Fill in the details below to publish your rental property listing.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Title & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Property Title
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaBuilding />
                            </span>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Luxury Apartment in Dhaka"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Location
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaMapMarkerAlt />
                            </span>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Gulshan, Dhaka"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2: Property Type & Rent Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Property Type
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <MdCategory />
                            </span>
                            <select
                                name="propertyType"
                                required
                                value={formData.propertyType}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700 bg-white"
                            >
                                <option value="">Select Property Type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Studio">Studio</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rent Type
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaListUl />
                            </span>
                            <select
                                name="rentType"
                                required
                                value={formData.rentType}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700 bg-white"
                            >
                                <option value="">Select Rent Duration</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Daily">Daily</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Row 3: Rent & Property Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rent Amount (BDT)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaDollarSign />
                            </span>
                            <input
                                type="number"
                                name="rent"
                                required
                                min="0"
                                value={formData.rent}
                                onChange={handleChange}
                                placeholder="15000"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Property Size (sqft)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaRulerCombined />
                            </span>
                            <input
                                type="number"
                                name="propertySize"
                                required
                                min="0"
                                value={formData.propertySize}
                                onChange={handleChange}
                                placeholder="1200"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 4: Bedrooms & Bathrooms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bedrooms
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaBed />
                            </span>
                            <input
                                type="number"
                                name="bedrooms"
                                required
                                min="0"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="2"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bathrooms
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaBath />
                            </span>
                            <input
                                type="number"
                                name="bathrooms"
                                required
                                min="0"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="2"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 5: Extra Features & Image URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Extra Features <span className="text-gray-400 text-xs font-normal">(comma separated)</span>
                        </label>
                        <input
                            type="text"
                            name="extraFeatures"
                            value={formData.extraFeatures}
                            onChange={handleChange}
                            placeholder="Balcony, Rooftop, CCTV"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <FaImage />
                            </span>
                            <input
                                type="url"
                                name="imageUrl"
                                required
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://i.ibb.co/example.jpg"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <div className="relative">
                        <span className="absolute top-3.5 left-3.5 text-gray-400">
                            <MdOutlineDescription />
                        </span>
                        <textarea
                            name="description"
                            rows="4"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write property details..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 outline-none text-gray-700 resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Amenities Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Amenities
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {availableAmenities.map((amenity) => (
                            <label
                                key={amenity}
                                className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600 hover:text-gray-900"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(amenity)}
                                    onChange={() => handleAmenityChange(amenity)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                                />
                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? (
                            <span>Submitting...</span>
                        ) : (
                            <>
                                <FaPlus /> Add Property
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPropertyForm;