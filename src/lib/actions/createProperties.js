'use server'



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const creatProperties = async (newProperty, token) => {


    const res = await fetch(`${baseUrl}/api/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProperty)
    });
    const data = await res.json();
    console.log(data);


    return data
}
















