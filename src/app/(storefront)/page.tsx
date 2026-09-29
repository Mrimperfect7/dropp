import Link from "next/link";
import { getProducts } from "@/app/actions";
import { WishlistButton } from "@/components/ShopButtons";
import type { Product } from "@/types/product";

export default async function StoreHomepage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4); // Show only top 4 as trending
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Store Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col justify-center min-h-[70vh]">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-sm font-semibold mb-6 tracking-wide">
              NEW ARRIVALS 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Curated Essentials for your Modern Lifestyle.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Discover premium products selected for quality, utility, and design. Shipped directly to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-center hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                Shop Now
              </Link>
              <Link href="/ai-shopping" className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full font-bold text-center hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                <span>✨ Ask AI Assistant</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="bg-indigo-50 border-y border-indigo-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-indigo-900 font-bold">Not sure what to buy?</h3>
              <p className="text-sm text-indigo-700">"I need a gift for my brother under ₹1500"</p>
            </div>
          </div>
          <Link href="/ai-shopping" className="px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
            Try AI Shopping
          </Link>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-2">Our most popular products this week</p>
          </div>
          <Link href="/shop?sort=trending" className="hidden sm:block text-indigo-600 font-semibold hover:text-indigo-800">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product: Product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <WishlistButton
                  product={{ id: product.id, title: product.title, price: product.price, image: product.image, originalPrice: product.originalPrice }}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 text-lg sm:text-xl"
                />
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-sm">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-medium text-gray-600">{product.rating || "5.0"}</span>
                  <span className="text-xs text-gray-400">({product.reviews || "12"})</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {product.title}
                </h3>
                <div className="mt-auto flex items-center space-x-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">🚚</span>
              <h4 className="font-bold text-gray-900 text-sm">Free Shipping</h4>
              <p className="text-xs text-gray-500 mt-1">On orders over ₹999</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">🛡️</span>
              <h4 className="font-bold text-gray-900 text-sm">Secure Payment</h4>
              <p className="text-xs text-gray-500 mt-1">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">🔄</span>
              <h4 className="font-bold text-gray-900 text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-500 mt-1">7 day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-3">💬</span>
              <h4 className="font-bold text-gray-900 text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-500 mt-1">AI & Human assistance</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
