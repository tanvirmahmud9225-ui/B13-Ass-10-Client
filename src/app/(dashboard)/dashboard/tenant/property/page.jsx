
import AddPropertyForm from '@/components/dashboard/owner/AddPropertyForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async () => {


    const { token } = await auth?.api.getToken({
        headers: await headers()
    })



    return (
        <div>
            <AddPropertyForm token={token} />
        </div>
    );
};

export default page;