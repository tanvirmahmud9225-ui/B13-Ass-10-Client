import BookingTable from '@/components/dashboard/owner/BookingTable';
import { getBookings } from '@/lib/api/getBookings';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async () => {


    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = session?.user?.id

    const bookingData = await getBookings(userId)

    return (

        <div>
            <BookingTable userId={userId} bookingData={bookingData} />
        </div>
    );
};

export default page;