import PropertyDetails from '@/components/main/PropertyDetails';
import { getSingleProperties } from '@/lib/api/getProperties';
import React from 'react';

const page = async ({ params }) => {
    const { id } = await params;

    const singleProperty = await getSingleProperties(id)

    

    return (
        <div>
            <PropertyDetails property={singleProperty} />
        </div>
    );
};

export default page;