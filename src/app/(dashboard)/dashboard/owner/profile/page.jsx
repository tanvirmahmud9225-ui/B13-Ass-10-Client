import Profile from '@/components/dashboard/owner/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    console.log(user);



    return (
        <div>
            <Profile userData={user} />
        </div>
    );
};

export default page;