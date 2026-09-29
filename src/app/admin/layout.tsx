import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-indigo-600">OS Admin</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/fulfillment"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Fulfillment Center
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/suppliers"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Suppliers
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/ai/product-research"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 mt-4"
                >
                  ✨ AI Tools
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-medium text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Settings
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
