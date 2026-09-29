"use client";

import Link from "next/link";
import { removeFromCart, toggleWishlist, updateQuantity, useShop } from "@/lib/shop-store";

export default function CartPage() {
  const { cart, itemCount, subtotal, shipping, total, isInWishlist } = useShop();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-gray-500">Looks like you haven&apos;t added anything yet.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
            Start Shopping
          </Link>
          <Link href="/wishlist" className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors">
            View Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <Link href={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden mb-4 sm:mb-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </Link>
              <div className="sm:ml-6 flex-1 w-full">
                <div className="flex justify-between">
                  <Link href={`/product/${item.id}`} className="text-lg font-bold text-gray-900 line-clamp-2 pr-4 hover:text-indigo-600">{item.title}</Link>
                  <div className="text-right">
                    <p className="text-lg font-black text-indigo-600">₹{item.price * item.quantity}</p>
                    {item.quantity > 1 && <p className="text-xs text-gray-400">₹{item.price} each</p>}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-indigo-600 font-bold"
                    >-</button>
                    <span className="px-3 py-1 font-semibold text-gray-900">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-indigo-600 font-bold"
                    >+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    {!isInWishlist(item.id) && (
                      <button
                        type="button"
                        onClick={() => {
                          toggleWishlist(item);
                          removeFromCart(item.id);
                        }}
                        className="text-sm font-semibold text-gray-500 hover:text-indigo-600 underline underline-offset-4"
                      >
                        Save for later
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700 underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link href="/shop" className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            &larr; Continue shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
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
              {shipping > 0 && (
                <p className="text-xs text-gray-500">Add ₹{1000 - subtotal} more for free shipping.</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-indigo-600">₹{total}</span>
              </div>
            </div>

            <Link href="/checkout" className="mt-8 w-full block text-center bg-indigo-600 text-white py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              Proceed to Checkout
            </Link>
            
            <div className="mt-6 flex justify-center space-x-2 text-xs font-semibold text-gray-400">
              <span>🔒 Secure Checkout</span>
              <span>•</span>
              <span>Returns within 7 days</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
