
import AdminPropertiesPage from '@/components/dashboard/admin/AdminPropertiesPage';
import { getAdminProperties } from '@/lib/api/getAdminProperties';
import { getAllProperties } from '@/lib/api/getProperties';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async ({ searchParams }) => {

    const { page, allProductSearch } = await searchParams;

    const session = await auth.api.getSession({
        headers: await headers(),
    });


    const { token } = await auth?.api.getToken({
        headers: await headers()
    })



    const userId = session?.user?.id;

    // const properties = await getProperties(userId);
    const propertyData = await getAllProperties(token, page, allProductSearch);
    // const properties = propertyData?.data
    const propertyPage = propertyData?.page;
    const totalPage = propertyData?.totalPage
    console.log(propertyData);


    const properties = await getAdminProperties();



    return (
        <div>
            <AdminPropertiesPage properties={properties} />
        </div>
    );
};

export default page;