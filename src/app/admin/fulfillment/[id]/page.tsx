"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderFulfillmentDetail() {
  const params = useParams();
  
  // Dummy order data
  const order = {
    id: params.id,
    orderNumber: "ORD-20260929-0001",
    customer: {
      name: "John Doe",
      phone: "+91 9876543210",
      email: "john@example.com",
      address: "123 Marine Drive",
      city: "Kochi",
      state: "Kerala",
      pinCode: "682031"
    },
    product: {
      title: "Portable Car Vacuum Cleaner High Power",
      sku: "PCV-001",
      variant: null
    },
    quantity: 1,
    sellingPrice: 1299,
    supplier: {
      name: "ABC Electronics",
      contactPerson: "Rajesh Kumar",
      whatsapp: "+919999999999",
      email: "orders@abcelectronics.in",
      cost: 450
    },
    status: "PAYMENT_RECEIVED",
    createdAt: new Date().toISOString(),
  };

  const profit = order.sellingPrice - order.supplier.cost;

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const message = `Hello ${order.supplier.name},\n\nI would like to place the following dropshipping order.\n\n*Order Reference:*\n${order.orderNumber}\n\n*Product:*\n${order.product.title}\n*SKU:* ${order.product.sku}\n*Quantity:* ${order.quantity}\n\nPlease ship directly to the following customer:\n\n*Customer Name:*\n${order.customer.name}\n\n*Phone:*\n${order.customer.phone}\n\n*Address:*\n${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pinCode}\n\nPlease confirm the order and provide:\n1. Supplier order confirmation\n2. Courier name\n3. Tracking number\n4. Expected delivery date\n\nThank you.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${order.supplier.whatsapp.replace(/\+/g, '')}?text=${generateWhatsAppMessage()}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Dropshipping Order – ${order.orderNumber}`);
    const body = generateWhatsAppMessage();
    window.location.href = `mailto:${order.supplier.email}?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decodeURIComponent(generateWhatsAppMessage()));
    alert("Order details copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/fulfillment" className="text-gray-500 hover:text-gray-900">
            &larr; Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Fulfill {order.orderNumber}</h1>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors">
            ✅ Mark Supplier Confirmed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Customer Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">👤 Customer Shipping Details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1 text-base text-gray-900 font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="mt-1 text-base text-gray-900">{order.customer.phone}</p>
                <p className="text-base text-gray-900">{order.customer.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                <p className="mt-1 text-base text-gray-900">
                  {order.customer.address}<br />
                  {order.customer.city}, {order.customer.state}<br />
                  PIN: {order.customer.pinCode}
                </p>
              </div>
            </div>
          </section>

          {/* Product Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">📦 Product Details</h2>
            </div>
            <div className="p-6 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">{order.product.title}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">SKU: <span className="font-medium text-gray-900">{order.product.sku}</span></p>
                  <p className="text-sm text-gray-600">Variant: <span className="font-medium text-gray-900">{order.product.variant || 'Default'}</span></p>
                  <p className="text-sm text-gray-600">Quantity: <span className="font-medium text-gray-900">{order.quantity}</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Selling Price</p>
                <p className="text-xl font-bold text-gray-900">₹{order.sellingPrice}</p>
              </div>
            </div>
          </section>

          {/* Tracking Input */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">🚚 Shipping & Tracking</h2>
            </div>
            <div className="p-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Courier Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g. Delhivery, Bluedart" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="AWB Number" />
                </div>
                <div className="md:col-span-2 mt-4 text-right">
                  <button type="button" className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
                    Update Tracking
                  </button>
                </div>
              </form>
            </div>
          </section>

        </div>

        {/* Right Column - Actions & Supplier */}
        <div className="space-y-8">
          
          {/* Supplier Details */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">🏭 Supplier</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p className="text-base text-gray-900 font-medium">{order.supplier.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="text-sm text-gray-900">{order.supplier.contactPerson}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Cost</p>
                  <p className="text-lg font-bold text-gray-900">₹{order.supplier.cost}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Profit Estimate */}
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-6">
            <h2 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-4">Profit Estimate</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium">₹{order.sellingPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Supplier Cost</span>
                <span className="font-medium text-red-600">-₹{order.supplier.cost}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Fees (2%)</span>
                <span className="font-medium text-red-600">-₹{Math.round(order.sellingPrice * 0.02)}</span>
              </div>
              <div className="pt-2 mt-2 border-t border-green-200 flex justify-between">
                <span className="font-bold text-gray-900">Est. Profit</span>
                <span className="font-bold text-green-600 text-lg">₹{profit - Math.round(order.sellingPrice * 0.02)}</span>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Fulfillment Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                <span className="text-xl">📱</span>
                <span>Send via WhatsApp</span>
              </button>
              
              <button 
                onClick={handleEmail}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                <span className="text-xl">✉️</span>
                <span>Send via Email</span>
              </button>
              
              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors border border-gray-300"
              >
                <span className="text-xl">📋</span>
                <span>Copy Order Text</span>
              </button>
              
              <button 
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors border border-gray-300"
              >
                <span className="text-xl">📄</span>
                <span>Download PDF PO</span>
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
