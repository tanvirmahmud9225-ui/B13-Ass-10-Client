"use client";

import { toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    FiCheckCircle,
    FiXCircle,
    FiEye,
} from "react-icons/fi";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminProperties({ properties = [] }) {

    const [selectedProperty, setSelectedProperty] = useState(null);

    const [showRejectModal, setShowRejectModal] = useState(false);

    const [rejectionReason, setRejectionReason] = useState("");

    const [loading, setLoading] = useState(false);


    // =========================
    // Approve Property
    // =========================

    const router = useRouter();

    const handleApprove = async (propertyId) => {

        try {

            setLoading(true);

            const res = await fetch(
                `${baseUrl}/api/admin/properties/approve/${propertyId}`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.acknowledged) {
                toast.success(`Your property has been approved.`)
                router.refresh()
            }

        } catch (error) {

            console.error("Approve error:", error);

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // Open Reject Modal
    // =========================

    const handleRejectClick = (property) => {

        setSelectedProperty(property);

        setRejectionReason("");

        setShowRejectModal(true);
    };


    // =========================
    // Reject Property
    // =========================

    const handleReject = async () => {

        if (!rejectionReason.trim()) {
            return;
        }

        try {

            setLoading(true);

            const res = await fetch(
                `${baseUrl}/api/admin/properties/reject/${selectedProperty._id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        rejectionReason:
                            rejectionReason.trim(),
                    }),
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.success) {

                setShowRejectModal(false);

                setSelectedProperty(null);

                setRejectionReason("");

                window.location.reload();
            }

        } catch (error) {

            console.error("Reject error:", error);

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* =========================
                Header
            ========================= */}

            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    Property Management
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Review and manage property submissions
                </p>

            </div>


            {/* =========================
                Property Table
            ========================= */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px] text-left">

                        {/* Table Header */}

                        <thead className="border-b bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Location
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Type
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        {/* Table Body */}

                        <tbody className="divide-y">

                            {properties.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="py-16 text-center text-gray-500"
                                    >
                                        No properties found
                                    </td>

                                </tr>

                            ) : (

                                properties.map((property) => (

                                    <tr
                                        key={property._id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* Title */}

                                        <td className="px-6 py-4">

                                            <div className="max-w-[220px] truncate font-medium text-gray-800">

                                                {property.title}

                                            </div>

                                        </td>


                                        {/* Location */}

                                        <td className="px-6 py-4 text-sm text-gray-600">

                                            {property.location}

                                        </td>


                                        {/* Price */}

                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">

                                            ৳{property.rent}

                                        </td>


                                        {/* Property Type */}

                                        <td className="px-6 py-4 text-sm text-gray-600">

                                            {property.propertyType}

                                        </td>


                                        {/* Status */}

                                        <td className="px-6 py-4">

                                            <span
                                                className={`
                                                    inline-flex
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-semibold
                                                    uppercase

                                                    ${property.status ===
                                                        "approved"

                                                        ? "bg-green-50 text-green-600"

                                                        : property.status ===
                                                            "rejected"

                                                            ? "bg-red-50 text-red-600"

                                                            : "bg-yellow-50 text-yellow-600"
                                                    }
                                                `}
                                            >

                                                {property.status}

                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2">


                                                {/* View */}

                                                <button
                                                    type="button"
                                                    title="View Property"
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                                >
                                                    <Link href={`allProperties/${property._id}`}>
                                                        <FiEye size={19} />
                                                    </Link>

                                                </button>


                                                {/* Approve */}

                                                {property.status !==
                                                    "approved" && (

                                                        <button
                                                            type="button"
                                                            title="Approve Property"
                                                            disabled={loading}
                                                            onClick={() =>
                                                                handleApprove(
                                                                    property._id
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-green-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            <FiCheckCircle
                                                                size={20}
                                                            />

                                                        </button>

                                                    )}


                                                {/* Reject */}

                                                {property.status !==
                                                    "rejected" && (

                                                        <button
                                                            type="button"
                                                            title="Reject Property"
                                                            disabled={loading}
                                                            onClick={() =>
                                                                handleRejectClick(
                                                                    property
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            <FiXCircle
                                                                size={20}
                                                            />

                                                        </button>

                                                    )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =========================
                Reject Modal
            ========================= */}

            {showRejectModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">


                        {/* Modal Header */}

                        <div className="mb-5">

                            <h2 className="text-xl font-bold text-gray-800">
                                Reject Property
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Please provide a reason for rejecting this
                                property.
                            </p>

                        </div>


                        {/* Property Name */}

                        {selectedProperty && (

                            <div className="mb-4 rounded-lg bg-gray-50 p-3">

                                <p className="text-xs text-gray-500">
                                    Property
                                </p>

                                <p className="font-medium text-gray-800">
                                    {selectedProperty.title}
                                </p>

                            </div>

                        )}


                        {/* Rejection Reason */}

                        <textarea
                            value={rejectionReason}
                            onChange={(e) =>
                                setRejectionReason(e.target.value)
                            }
                            rows={5}
                            placeholder="Write rejection reason..."
                            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        />


                        {/* Modal Buttons */}

                        <div className="mt-5 flex justify-end gap-3">

                            {/* Cancel */}

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => {

                                    setShowRejectModal(false);

                                    setSelectedProperty(null);

                                    setRejectionReason("");

                                }}
                                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>


                            {/* Reject */}

                            <button
                                type="button"
                                disabled={
                                    !rejectionReason.trim() ||
                                    loading
                                }
                                onClick={handleReject}
                                className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {loading
                                    ? "Processing..."
                                    : "Reject Property"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}