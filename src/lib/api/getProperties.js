// get properties
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProperties = async (userId, page) => {
    const res = await fetch(`${baseUrl}/api/properties?userId=${userId}&page=${page}`)
    return res.json();
}



export const getAllProperties = async (token, page) => {

    const res = await fetch(`${baseUrl}/api/allproperties?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();
    return data;
}


// get single properties


export const getSingleProperties = async (propertyId) => {
    const res = await fetch(`${baseUrl}/api/properties/${propertyId}`)
    return res.json();
}


// export const getAllProperties = async () => {
//     const res = await fetch(`${baseUrl}/api/properties/${propertyId}`)
//     return res.json();
// }









