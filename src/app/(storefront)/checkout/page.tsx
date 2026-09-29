"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const total = 3097; // Dummy total from Cart

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing and order creation
    setTimeout(() => {
      router.push("/order-success?order=ORD-20260929-0003");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Checkout Form */}
        <div className="lg:col-span-2 flex-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input required type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="+91 9876543210" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="John Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="House/Flat No, Building Name, Street Area" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white">
                    <option value="">Select State</option>
                    <option value="kerala">Kerala</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="delhi">Delhi</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" placeholder="6 Digit PIN" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span className="ml-3 font-medium text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                </label>
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span className="ml-3 font-medium text-gray-900">Credit / Debit Card</span>
                </label>
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span className="ml-3 font-medium text-gray-900">Cash on Delivery (COD)</span>
                </label>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-4 rounded-full font-bold text-lg text-white transition-all ${isProcessing ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'}`}
            >
              {isProcessing ? "Processing Securely..." : `Pay ₹${total} & Place Order`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96 flex-shrink-0 mt-10 lg:mt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {/* Dummy Item 1 */}
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-1">Portable Car Vacuum...</h4>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">₹1299</p>
                </div>
              </div>
              
              {/* Dummy Item 2 */}
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-1">Ergonomic Laptop Stand</h4>
                  <p className="text-sm text-gray-500">Qty: 2</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">₹1798</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm font-medium">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹3097</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-gray-900">Total to pay</span>
                <span className="text-3xl font-black text-indigo-600">₹{total}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
