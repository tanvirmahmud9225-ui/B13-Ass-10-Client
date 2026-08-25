const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBookings = async (userId) => {
    const res = await fetch(`${baseUrl}/api/bookings?userId=${userId}`)
    return res.json();
}




