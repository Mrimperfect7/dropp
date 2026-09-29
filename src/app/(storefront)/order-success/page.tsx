"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "ORD-00000000-0000";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100/50">
        <span className="text-5xl">✅</span>
      </div>
      
      <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Thank you for your purchase. We've received your order and are getting it ready to ship.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-10 max-w-md mx-auto text-left">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Order Reference</p>
        <p className="text-2xl font-black text-indigo-600 font-mono bg-indigo-50 px-4 py-2 rounded-lg inline-block">{orderNumber}</p>
        
        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b border-gray-200 pb-4">
            <span className="text-gray-600 font-medium">Payment Status</span>
            <span className="text-green-600 font-bold flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Successful
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-4">
            <span className="text-gray-600 font-medium">Expected Delivery</span>
            <span className="text-gray-900 font-bold">Oct 4 - Oct 6</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Confirmation Email</span>
            <span className="text-gray-900 font-bold">Sent ✅</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href={`/track-order?order=${orderNumber}`} className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
          Track Order
        </Link>
        <Link href="/shop" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold text-lg hover:border-gray-900 hover:bg-gray-50 transition-all">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
