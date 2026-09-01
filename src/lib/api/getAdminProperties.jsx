// get properties
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getAdminProperties = async () => {
    const res = await fetch(`${baseUrl}/api/admin/properties?status='pending'`)
    return res.json();
}

