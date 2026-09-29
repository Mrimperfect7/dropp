import Link from "next/link";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h1>

      <div className="bg-white shadow sm:rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4 mb-4">Store Performance (Last 30 Days)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Gross Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹1,24,500</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Total Supplier Costs</p>
            <p className="text-2xl font-bold text-red-600 mt-1">₹76,300</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <p className="text-sm text-indigo-800 font-medium">Net Profit (Est)</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">₹48,200</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center h-64 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
          <p className="text-gray-500">Chart Visualization Area (Connect charting library here)</p>
        </div>
      </div>
    </div>
  );
}
