import Link from "next/link";
import { ReactNode } from "react";
import { CartBadge, WishlistBadge } from "@/components/ShopButtons";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Promotional Banner */}
      <div className="bg-indigo-600 text-white text-xs font-medium text-center py-2 px-4 sm:px-6 lg:px-8">
        Free shipping on all orders over ₹999. Use code FREESHIP.
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-black tracking-tighter text-indigo-950">AURA<span className="text-indigo-600">.</span></span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Shop</Link>
                <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Categories</Link>
                <Link href="/deals" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Deals</Link>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              <div className="hidden md:block">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-4 pr-10 py-2 w-64 bg-gray-50 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <span className="absolute right-3 top-2 text-gray-400">🔍</span>
                </div>
              </div>
              <Link href="/ai-shopping" className="hidden lg:flex items-center space-x-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors">
                <span>✨ Ask AI</span>
              </Link>
              <WishlistBadge />
              <CartBadge />
              <Link href="/account" className="hidden sm:block text-gray-500 hover:text-indigo-600 transition-colors">
                <span className="text-xl">👤</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-black tracking-tighter text-indigo-950">AURA<span className="text-indigo-600">.</span></span>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Premium products curated specially for you. Fast shipping, easy returns, and AI-powered shopping assistance.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Shop</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li><Link href="/shop" className="hover:text-indigo-600">All Products</Link></li>
                <li><Link href="/new" className="hover:text-indigo-600">New Arrivals</Link></li>
                <li><Link href="/deals" className="hover:text-indigo-600">Special Deals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li><Link href="/track-order" className="hover:text-indigo-600">Track Order</Link></li>
                <li><Link href="/return-policy" className="hover:text-indigo-600">Returns & Refunds</Link></li>
                <li><Link href="/shipping-policy" className="hover:text-indigo-600">Shipping Info</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-600">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">Stay Updated</h3>
              <p className="mt-4 text-sm text-gray-500">Subscribe for exclusive deals.</p>
              <div className="mt-3 flex">
                <input type="email" placeholder="Email address" className="px-4 py-2 w-full bg-white border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-indigo-700">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; 2026 Aura Dropshipping. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
