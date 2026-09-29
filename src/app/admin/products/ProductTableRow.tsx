"use client";

import { useState } from "react";
import { deleteProduct, updateProduct } from "@/app/actions";

export default function ProductTableRow({ p }: { p: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: p.title,
    price: p.price,
    originalPrice: p.originalPrice || "",
    supplierCost: p.supplierCost,
  });

  const confirmDelete = async () => {
    setIsDeleting(true);
    await deleteProduct(p.id);
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
    
    // Recalculate margin
    const finalPrice = Number(editForm.price);
    const cost = Number(editForm.supplierCost);
    const marginCalc = finalPrice > 0 ? Math.round(((finalPrice - cost) / finalPrice) * 100) + "%" : "0%";

    await updateProduct(p.id, {
      title: editForm.title,
      price: finalPrice,
      originalPrice: editForm.originalPrice ? Number(editForm.originalPrice) : null,
      supplierCost: cost,
      margin: marginCalc
    });
    
    setIsEditing(false);
    setShowEditModal(false);
  };

  return (
    <>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to remove this product from your store? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 shadow-sm transition-colors shadow-red-500/20 disabled:bg-red-400">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Edit Product</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                <input required value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                  <input required value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price / MRP (₹)</label>
                  <input value={editForm.originalPrice} onChange={(e) => setEditForm({...editForm, originalPrice: e.target.value})} type="number" placeholder="Optional" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Cost (₹)</label>
                <input required value={editForm.supplierCost} onChange={(e) => setEditForm({...editForm, supplierCost: e.target.value})} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              
              <div className="pt-4 mt-2 border-t border-gray-100 flex space-x-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isEditing} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-sm transition-colors disabled:bg-indigo-400">
                  {isEditing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <tr className="hover:bg-gray-50 group">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
              <img className="h-10 w-10 object-cover" src={p.image} alt="" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]" title={p.title}>{p.title}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{p.price}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.supplierCost}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">{p.margin}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
            {p.status || "Published"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
          <button onClick={() => setShowEditModal(true)} className="text-indigo-600 hover:text-indigo-900 transition-colors">Edit</button>
          <button onClick={() => setShowDeleteModal(true)} className="text-red-500 hover:text-red-700 font-bold transition-colors">Remove</button>
        </td>
      </tr>
    </>
  );
}
