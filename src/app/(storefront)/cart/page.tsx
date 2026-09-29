import Link from "next/link";

export default function CartPage() {
  const cartItems = [
    {
      id: "1",
      title: "Portable Car Vacuum Cleaner High Power",
      price: 1299,
      image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: "2",
      title: "Ergonomic Laptop Stand",
      price: 899,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
      quantity: 2
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden mb-4 sm:mb-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="sm:ml-6 flex-1 w-full">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 pr-4">{item.title}</h3>
                  <p className="text-lg font-black text-indigo-600">₹{item.price}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                    <button className="px-3 py-1 text-gray-600 hover:text-indigo-600 font-bold">-</button>
                    <span className="px-3 py-1 font-semibold text-gray-900">{item.quantity}</span>
                    <button className="px-3 py-1 text-gray-600 hover:text-indigo-600 font-bold">+</button>
                  </div>
                  <button className="text-sm font-semibold text-red-500 hover:text-red-700 underline underline-offset-4">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* AI Recommendations */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span>✨ Recommended based on your cart</span>
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              <div className="min-w-[200px] border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                  <img src="https://images.unsplash.com/photo-1606220588913-b3aecb4b27f0?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" alt="" />
                </div>
                <p className="text-sm font-bold text-gray-900 truncate">Wireless Earbuds</p>
                <p className="text-sm font-bold text-indigo-600 mt-1">₹1999</p>
                <button className="w-full mt-2 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                  Add +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
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
