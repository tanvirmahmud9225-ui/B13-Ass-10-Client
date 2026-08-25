import { payment } from '@/lib/actions/payments'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { FaCheckCircle, FaEnvelope, FaHome, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const {
        status,
        metadata,
        customer_details: { email: customerEmail, name: customerName },
        amount_total,
        currency
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        // Save payment data
        const pay_Data = await payment({ ...metadata })
        console.log('Payment saved:', pay_Data)

        const amount = (amount_total / 100).toFixed(2)

        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
                <div className="max-w-lg w-full">
                    {/* Success Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">

                        {/* Top Banner */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-10 text-center">
                            <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-5">
                                <FaCheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Payment Successful!
                            </h1>
                            <p className="text-emerald-100 text-lg">
                                Thank you for your purchase
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 py-8 space-y-6">

                            {/* Amount */}
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                                <p className="text-4xl font-bold text-gray-900">
                                    {currency?.toUpperCase()} {amount}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Customer Info */}
                            <div className="space-y-4">
                                {customerName && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                                            <span className="text-emerald-600 font-semibold text-sm">
                                                {customerName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Customer</p>
                                            <p className="font-medium text-gray-900">{customerName}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                        <FaEnvelope className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Confirmation sent to</p>
                                        <p className="font-medium text-gray-900">{customerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                                <p className="text-sm text-emerald-800 leading-relaxed">
                                    We appreciate your business! A confirmation email has been sent.
                                    If you have any questions, feel free to contact us.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link
                                    href="/"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <FaHome className="w-5 h-5" />
                                    Back to Home
                                </Link>

                                <Link
                                    href="/allProperties"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-6 rounded-xl border border-gray-200 transition-all duration-200"
                                >
                                    View Property
                                    <FaArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Need help? Contact us at{' '}
                        <a href="mailto:orders@example.com" className="text-emerald-600 hover:underline">
                            orders@example.com
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    // Fallback
    return redirect('/')
}