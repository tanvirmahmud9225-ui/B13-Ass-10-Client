<tbody className="divide-y divide-gray-100">
    {properties.map((property) => (
        <tr
            key={property._id}
            className="hover:bg-gray-50/70 transition-colors"
        >
            {/* Title */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={property.imageUrl}
                            alt={property.title}
                            fill
                            className="object-cover"
                            sizes="48px"
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
                        <FiEye className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <FiEdit2 className="w-4 h-4" />
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