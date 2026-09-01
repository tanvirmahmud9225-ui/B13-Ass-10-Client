"use client";

// import { getProperties } from "@/lib/api/getProperties";
import { FiChevronUp } from "react-icons/fi";

// const users = [
//     {
//         id: 1,
//         name: "Emily Davis",
//         role: "Product Manager",
//         status: "Inactive",
//         email: "emily@acme.com",
//     },
//     {
//         id: 2,
//         name: "John Smith",
//         role: "CTO",
//         status: "Active",
//         email: "john@acme.com",
//     },
//     {
//         id: 3,
//         name: "Kate Moore",
//         role: "CEO",
//         status: "Active",
//         email: "kate@acme.com",
//     },
//     {
//         id: 4,
//         name: "Michael Brown",
//         role: "CFO",
//         status: "Active",
//         email: "michael@acme.com",
//     },
//     {
//         id: 5,
//         name: "Sara Johnson",
//         role: "CMO",
//         status: "On Leave",
//         email: "sara@acme.com",
//     },
// ];

const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-600",
    "On Leave": "bg-amber-100 text-amber-700",
};

export default function BookingTable({ userId, bookingData }) {

    // console.log(userId);


    // const bookingData = async (userId) => {
    //     const data = await getProperties(userId)
    //     console.log(data);
    //     return data
    // }





    return (
        <div className="w-full max-w-11/12 ml-5 mt-5">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left">
                    {/* Header */}
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700">
                                    Name
                                    <FiChevronUp className="w-3.5 h-3.5" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Pick UP Date
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-500">
                                Email
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">
                        {bookingData.map((data) => (
                            <tr
                                key={data._id}
                                className="hover:bg-gray-50/70 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-blue-950">
                                    {data.userName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{data?.date}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[data.status]
                                            }`}
                                    >
                                        {data.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{data.userEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}