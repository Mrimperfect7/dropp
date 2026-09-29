import Link from "next/link";

// Dummy data to simulate the database output before we fully connect Prisma
const dummyOrders = [
  {
    id: "clkx123",
    orderNumber: "ORD-20260929-0001",
    customer: { name: "John Doe" },
    product: { title: "Portable Car Vacuum" },
    variant: null,
    supplier: { name: "ABC Electronics" },
    quantity: 1,
    sellingPrice: 1299,
    supplierCost: 450,
    paymentStatus: "PAID",
    fulfillmentStatus: "PAYMENT_RECEIVED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "clkx124",
    orderNumber: "ORD-20260929-0002",
    customer: { name: "Jane Smith" },
    product: { title: "Wireless Earbuds" },
    variant: { sku: "WE-BLK-01" },
    supplier: { name: "AudioTech India" },
    quantity: 2,
    sellingPrice: 1999,
    supplierCost: 800,
    paymentStatus: "PAID",
    fulfillmentStatus: "SUPPLIER_CONFIRMED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function FulfillmentCenterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Fulfillment Center</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Pending Supplier Orders
          </h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
              <option>Status: All</option>
              <option>Payment Received</option>
              <option>Pending Supplier</option>
              <option>Confirmed</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Financials
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyOrders.map((order) => {
                const profit = order.sellingPrice * order.quantity - order.supplierCost * order.quantity;
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {order.orderNumber}
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="text-gray-900 font-medium truncate max-w-[200px]">
                        {order.product.title}
                      </div>
                      {order.variant && (
                        <div className="text-xs mt-1">SKU: {order.variant.sku}</div>
                      )}
                      <div className="text-xs mt-1">Qty: {order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.supplier.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <div className="text-gray-900 font-medium">₹{order.sellingPrice}</div>
                      <div className="text-xs text-red-500 mt-1">-₹{order.supplierCost}</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        Est. +₹{profit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.fulfillmentStatus === 'PAYMENT_RECEIVED' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.fulfillmentStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/fulfillment/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100"
                      >
                        Fulfill Order
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
