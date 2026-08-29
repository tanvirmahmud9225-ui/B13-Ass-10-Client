import UpdateProperty from '@/components/dashboard/owner/UpdateProperty';
import { getSingleProperties } from '@/lib/api/getProperties';
import React from 'react';

const page = async ({ params }) => {

    const { id } = await params;

    const singleProperty = await getSingleProperties(id)




    return (
        <div>
            <UpdateProperty property={singleProperty} />
        </div>
    );
};

export default page;