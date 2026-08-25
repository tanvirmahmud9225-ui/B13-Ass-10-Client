import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')


        const userSession = await auth.api.getSession({
            headers: await headers()
        })

        const user = userSession?.user;
        const formData = await request.formData();
        const price = formData.get('price');
        const title = formData.get('title');
        const productId = formData.get('productId')
        const status = formData.get('status')
        const phone = formData.get('phone')
        const date = formData.get('date')




        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price_data: {
                        currency: "usd",
                        unit_amount: Number(price) * 100,
                        product_data: {
                            name: title,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: Number(price),
                userId: user?.id,
                userEmail: user?.email,
                userName: user?.name,
                title,
                productId,
                status,
                phone,
                date,
            },
            mode: 'payment',
            success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
            // integration_identifier: '{{INTEGRATION_ID}}',
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}