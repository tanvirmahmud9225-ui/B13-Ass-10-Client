import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const DashboardLayout = async ({ children }) => {


    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user




    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* সাইডবার */}
            <DashboardSidebar user={user} />

            {/* মূল কনটেন্ট */}
            <main className="flex-1 w-full p-4 md:p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;