import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">₹1,24,500</p>
          <p className="mt-1 text-sm text-green-600 flex items-center">
            <span className="font-medium">+12.5%</span> <span className="text-gray-400 ml-1">vs last month</span>
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Orders</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">142</p>
          <p className="mt-1 text-sm text-green-600 flex items-center">
            <span className="font-medium">+5.4%</span> <span className="text-gray-400 ml-1">vs last month</span>
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Estimated Profit</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">₹48,200</p>
          <p className="mt-1 text-sm text-green-600 flex items-center">
            <span className="font-medium">+15.2%</span> <span className="text-gray-400 ml-1">vs last month</span>
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Avg. Margin</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">38.7%</p>
          <p className="mt-1 text-sm text-gray-500 flex items-center">
            <span>Steady</span>
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Fulfillment Action Required */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Action Required</h2>
            <Link href="/admin/fulfillment" className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                📦
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-yellow-800">12 Orders Pending Supplier Fulfillment</h3>
                <p className="text-sm text-yellow-700 mt-1">Customers have paid. You need to forward these to suppliers.</p>
              </div>
              <Link href="/admin/fulfillment" className="ml-4 px-4 py-2 bg-white text-yellow-800 border border-yellow-300 rounded-md text-sm font-medium hover:bg-yellow-50">
                Fulfill Now
              </Link>
            </div>
            
            <div className="flex items-center p-4 bg-red-50 rounded-lg border border-red-100 mt-4">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                ⚠️
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-red-800">3 Orders Delayed</h3>
                <p className="text-sm text-red-700 mt-1">Supplier "ABC Electronics" has not provided tracking for 3 days.</p>
              </div>
              <button className="ml-4 px-4 py-2 bg-white text-red-800 border border-red-300 rounded-md text-sm font-medium hover:bg-red-50">
                Contact Supplier
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100">
          <div className="px-6 py-4 border-b border-indigo-100">
            <h2 className="text-lg font-medium text-indigo-900 flex items-center">
              ✨ AI Business Analyst
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <p className="text-sm text-gray-800 leading-relaxed">
                <span className="font-bold text-indigo-700">Insight:</span> The product "Portable Car Vacuum" is currently your most profitable item. However, "Supplier B" has a 12% lower cost than your current primary supplier. Switching could increase margins by 4.5%.
              </p>
              <button className="mt-3 text-sm text-indigo-600 font-medium hover:text-indigo-800">
                Review Suppliers &rarr;
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
              <p className="text-sm text-gray-800 leading-relaxed">
                <span className="font-bold text-indigo-700">Trend:</span> Searches for "travel accessories" are up 25% this week. Consider running the AI Product Research tool to find new items in this niche.
              </p>
              <Link href="/admin/ai/product-research" className="mt-3 inline-block text-sm text-indigo-600 font-medium hover:text-indigo-800">
                Start Research &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
