import Link from "next/link";
import { getProducts } from "@/app/actions";

export default async function ShopPage() {
  // Fetch real products from our JSON DB
  const allProducts = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-10">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Categories</h3>
          <ul className="space-y-3 text-sm text-gray-600 font-medium">
            <li><Link href="/shop" className="text-indigo-600 font-bold">All Products</Link></li>
            <li><Link href="/shop?category=electronics" className="hover:text-indigo-600">Electronics</Link></li>
            <li><Link href="/shop?category=home" className="hover:text-indigo-600">Home & Living</Link></li>
            <li><Link href="/shop?category=automotive" className="hover:text-indigo-600">Automotive</Link></li>
            <li><Link href="/shop?category=travel" className="hover:text-indigo-600">Travel & Outdoors</Link></li>
          </ul>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Range</h3>
          <div className="flex items-center space-x-2">
            <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <span className="text-gray-400">-</span>
            <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
          </div>
          <button className="mt-4 w-full bg-gray-900 text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition-colors text-sm">
            Apply Filter
          </button>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">All Products</h1>
          <div className="flex items-center space-x-3 text-sm font-medium">
            <span className="text-gray-500 hidden sm:block">Sort by:</span>
            <select className="border-none bg-gray-50 font-semibold text-gray-900 py-2 pl-4 pr-8 rounded-lg cursor-pointer focus:ring-0">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {allProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
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
      </div>

    </div>
  );
}
