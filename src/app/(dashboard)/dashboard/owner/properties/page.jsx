import MyProperties from '@/components/dashboard/owner/MyProperties';
import { MyPropertiesPagination } from '@/components/dashboard/owner/MyPropertiesPagination';
import { getProperties } from '@/lib/api/getProperties';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const page = async ({ searchParams }) => {
    const { page } = await searchParams;

    const { token } = await auth?.api.getToken({
        headers: await headers()
    })




    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;

    const dashboardPropertyData = await getProperties(userId, page);

    const properties = dashboardPropertyData?.data
    const propertyPage = dashboardPropertyData?.page;
    const totalPage = dashboardPropertyData?.totalPage
    // console.log(properties, propertyPage, totalPage);


    return (
        <div className="p-6">
            <MyProperties properties={properties} token={token} />
            <div >
                <MyPropertiesPagination propertyPage={propertyPage} totalPage={totalPage} />
            </div>
        </div>
    );
};

export default page;