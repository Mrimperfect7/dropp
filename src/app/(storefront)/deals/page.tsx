import Link from "next/link";
import { AddToCartButton, WishlistButton } from "@/components/ShopButtons";

const dealProducts = [
  {
    id: "p1",
    title: "Portable Car Vacuum Cleaner",
    price: 1299,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
    dealEndsIn: "12h 45m"
  },
  {
    id: "p4",
    title: "Smart Stainless Steel Thermos",
    price: 699,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    rating: 4.6,
    reviews: 45,
    dealEndsIn: "05h 12m"
  },
  {
    id: "p7",
    title: "Adjustable Phone Tripod",
    price: 499,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1527011045974-4b3fc6d3ff69?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    reviews: 218,
    dealEndsIn: "02h 30m"
  },
  {
    id: "p3",
    title: "Wireless Noise-Canceling Earbuds",
    price: 1999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aecb4b27f0?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    reviews: 89,
    dealEndsIn: "21h 10m"
  }
];

export default function DealsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Deals Hero */}
      <section className="bg-red-600 text-white py-12 md:py-20 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonal-stripes" width="40" height="40" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white text-red-600 text-sm font-bold mb-6 shadow-sm">
            LIMITED TIME OFFERS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Flash Deals up to 60% OFF
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
            Grab these exclusive discounts before the timer runs out. Stock is limited!
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dealProducts.map((product) => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 border border-red-100 relative">
                {/* Timer Badge */}
                <div className="absolute top-4 right-4 z-10 bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1">
                  <span className="text-red-400">⏱</span>
                  <span>{product.dealEndsIn}</span>
                </div>

                <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <WishlistButton product={product} className="absolute top-4 right-4 w-9 h-9 text-xl" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-md shadow-red-600/30">
                      {discountPercent}% OFF
                    </span>
                  </div>
                </Link>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-red-600">₹{product.price}</span>
                      <div className="text-sm text-gray-400 line-through font-medium">₹{product.originalPrice}</div>
                    </div>
                    <AddToCartButton product={product} addedLabel={<span className="text-lg font-bold">✓</span>} className="w-10 h-10 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                      <span className="text-xl font-bold">+</span>
                    </AddToCartButton>
                  </div>
                </div>
                
                {/* Stock progress bar */}
                <div className="px-5 pb-5">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-red-500 font-medium mt-1.5">Almost sold out!</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
