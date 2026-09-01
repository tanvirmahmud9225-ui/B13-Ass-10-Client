'use server'

import { toast } from "@heroui/react";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteProperties = async (token, id) => {


    const res = await fetch(`${baseUrl}/api/properties`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();

    if (data.acknowledged) {
        toast.success(`${petName} is deleted`)
        router.refresh()
    }

    return data
}


