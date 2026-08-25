"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiEye, FiChevronUp } from "react-icons/fi";

const statusStyles = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    active: "bg-blue-100 text-blue-700",
    inactive: "bg-gray-100 text-gray-600",
};

export default function MyProperties({ properties = [] }) {
    if (!properties || properties.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-lg">No properties found</p>
            </div>
        );
    }



    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left">
                    {/* Header */}
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    Title
                                    <FiChevronUp className="w-3.5 h-3.5" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Location
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Price
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Type
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">
                        {properties?.map((property) => (
                            <tr
                                key={property?._id}
                                className="hover:bg-gray-50/70 transition-colors"
                            >
                                {/* Title */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                            <img
                                                src={property.imageUrl}
                                                alt={property.title || "Property"}
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {property.title}
                                        </span>
                                    </div>
                                </td>

                                {/* Location */}
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {property.location}
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    ৳{property.rent}
                                    <span className="text-gray-500 font-normal ml-1">
                                        / {property.rentType}
                                    </span>
                                </td>

                                {/* Type */}
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {property.propertyType}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[property.status] || "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {property.status}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Link href={`/allProperties/${property?._id}`}>
                                                <FiEye className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        <button
                                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Link href={`/dashboard/owner/editProperties/${property?._id}`}><FiEdit2 className="w-4 h-4" /></Link>
                                        </button>
                                        <button
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}