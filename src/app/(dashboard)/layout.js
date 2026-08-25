import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* সাইডবার */}
            <DashboardSidebar />

            {/* মূল কনটেন্ট */}
            <main className="flex-1 w-full p-4 md:p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;