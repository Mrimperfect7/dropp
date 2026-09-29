"use client";

import { useState } from "react";
import Link from "next/link";
import { clearCart, useShop } from "@/lib/shop-store";

export default function CheckoutPage() {
  const { cart, subtotal, shipping, total } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsProcessing(true);
    
    // Store Owner's WhatsApp Number (Include country code, no +)
    const storeWhatsappNumber = "918848377746"; 
    
    // Build the message
    const message = `*NEW ORDER RECEIVED!* 🛒
    
*Items:*
${cart.map((item) => `${item.quantity}x ${item.title} (₹${item.price * item.quantity})`).join("\n")}

*Subtotal:* ₹${subtotal}
*Shipping:* ${shipping === 0 ? "Free" : `₹${shipping}`}
*Total Amount:* ₹${total}
*Payment Preference:* ${paymentMethod.toUpperCase()}

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

*Shipping Address:*
${formData.address}
${formData.city}, ${formData.state}
PIN: ${formData.pincode}

Please confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeWhatsappNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    clearCart();
    window.location.href = whatsappUrl;
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-gray-500">Add some products before checking out.</p>
        <Link href="/shop" className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

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
                  <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (WhatsApp)</label>
                  <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="+91 9876543210" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="John Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                  <input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="House/Flat No, Building Name, Street Area" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
                    <option value="">Select State</option>
                    <option value="kerala">Kerala</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="delhi">Delhi</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input required value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="6 Digit PIN" />
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
              className={`w-full py-4 rounded-full font-bold text-lg text-white transition-all flex items-center justify-center space-x-2 ${isProcessing ? 'bg-green-400 cursor-wait' : 'bg-[#25D366] hover:bg-[#1DA851] shadow-lg shadow-green-500/30'}`}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.195 1.603 6.01L.062 24l6.113-1.603A11.966 11.966 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.016a9.92 9.92 0 01-5.07-1.385l-.364-.216-3.771.99.99-3.677-.237-.377A9.923 9.923 0 012.046 12.03C2.046 6.513 6.513 2.046 12.03 2.046s9.985 4.467 9.985 9.984-4.468 9.986-9.984 9.986zm5.474-7.464c-.3-.15-1.776-.877-2.052-.977-.276-.1-.477-.15-.677.15-.2.3-.777.977-.952 1.177-.175.2-.35.225-.65.075-2.023-1.026-3.327-2.31-4.045-3.535-.175-.3-.025-.45.125-.6.125-.125.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.627-.927-2.227-.25-.6-.5-.525-.677-.525-.175 0-.375 0-.575 0s-.525.075-.8.375c-.276.3-1.053 1.027-1.053 2.504 0 1.477 1.077 2.904 1.227 3.104.15.2 2.1 3.205 5.1 4.507 2.053.89 2.7.915 3.3.765.6-.15 1.777-.727 2.027-1.427.25-.7.25-1.3.175-1.427-.075-.125-.276-.2-.576-.35z"/></svg>
              <span>{isProcessing ? "Opening WhatsApp..." : `Checkout via WhatsApp`}</span>
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96 flex-shrink-0 mt-10 lg:mt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm font-medium">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-bold">Free</span>
                ) : (
                  <span>₹{shipping}</span>
                )}
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
