"use client";

import Link from "next/link";
import { moveToCart, removeFromWishlist, useShop } from "@/lib/shop-store";

export default function WishlistPage() {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="text-6xl mb-6">❤️</div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your wishlist is empty</h1>
        <p className="mt-3 text-gray-500">Tap the heart on any product to save it here.</p>
        <Link href="/shop" className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
        Your Wishlist <span className="text-gray-400 text-xl font-bold">({wishlist.length})</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
            <Link href={`/product/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <Link href={`/product/${item.id}`}>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900">₹{item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                )}
              </div>
              <div className="mt-auto pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => moveToCart(item)}
                  className="w-full py-2 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Move to Cart
                </button>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full py-2 text-sm font-semibold text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
