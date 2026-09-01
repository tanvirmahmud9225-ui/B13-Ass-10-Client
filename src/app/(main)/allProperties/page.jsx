
import AllPropertiesSearch from '@/components/main/AllPropertiesSearch';
import { HomepagePagination } from '@/components/main/HomepagePagination';
import PropertyCard from '@/components/main/PropertyCard';
import { getAllProperties, getProperties } from '@/lib/api/getProperties';
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
    const properties = propertyData?.data
    const propertyPage = propertyData?.page;
    const totalPage = propertyData?.totalPage




    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-4xl py-10 font-bold'>This is all poperty page</h2>
            <div className='text-center mb-8'>
                <AllPropertiesSearch />
            </div>
            <div className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    properties?.map((property) => (
                        <PropertyCard key={property?._id} property={property} />
                    ))
                }
            </div>
            <div >
                <HomepagePagination propertyPage={propertyPage} totalPage={totalPage} />
            </div>
        </div>
    );
};

export default page;