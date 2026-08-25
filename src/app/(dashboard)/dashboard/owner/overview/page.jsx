'use client'
import Overview from '@/components/dashboard/owner/Overview';
import { useSession } from '@/lib/auth-client';

import React from 'react';




const OwnerDashboardHomePage = () => {

    const { data: session, isPending } = useSession();



    if (isPending) {
        return <div>
            Loading..........
        </div>
    }

    const user = session?.user



    return (
        <div>
            {/* <h2 className='text-3xl font-bold'>Wellcome back, {user?.name}</h2> */}
            <Overview />

        </div>
    );
};

export default OwnerDashboardHomePage;