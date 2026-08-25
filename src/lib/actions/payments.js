
'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const payment = async (data) => {
    const res = await fetch(`${baseUrl}/api/payments`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await res.json();
    return result;
}









