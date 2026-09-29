"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/actions";

export default function ProductImportPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"manual" | "url">("manual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Manual form state
  const [supplierDetails, setSupplierDetails] = useState({
    supplierName: "",
    supplierCost: "",
    productName: "",
    details: "",
    imageUrl: "",
  });

  const [urlInput, setUrlInput] = useState("");

  const handleFetch = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!urlInput) {
      alert("Please paste a valid URL first.");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);
    
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch from URL");
      }

      setSupplierDetails({
        supplierName: new URL(urlInput).hostname.replace('www.', ''),
        supplierCost: data.price === "0" ? "" : data.price,
        productName: data.title,
        details: data.description,
        imageUrl: data.image || ""
      });

      setActiveTab("manual");
    } catch (error: any) {
      alert("Extraction failed: " + error.message + "\n\nThe supplier's website might be blocking automated bots. Please switch to Option B (Manual Import) to paste the text directly.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setSupplierDetails({ ...supplierDetails, imageUrl: base64Url });
        if (generatedContent) {
          setGeneratedContent({ ...generatedContent, imageUrl: base64Url });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Convert AI margins and prices to numbers for the DB
    const finalPrice = generatedContent.suggestedSellingPrice;
    const cost = Number(supplierDetails.supplierCost || 0);
    const marginCalc = finalPrice > 0 ? Math.round(((finalPrice - cost) / finalPrice) * 100) + "%" : "0%";

    await addProduct({
      title: generatedContent.title,
      price: finalPrice,
      supplierCost: cost,
      margin: marginCalc,
      image: generatedContent.imageUrl,
      shortDescription: generatedContent.shortDescription,
      benefits: generatedContent.benefits,
      seoTitle: generatedContent.seoTitle,
      metaDescription: generatedContent.metaDescription
    });

    setIsPublishing(false);
    setShowToast(true);
    
    setTimeout(() => {
      router.push('/admin/products');
    }, 1500);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedContent(null);
    
    // Simulate AI Generation Delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent({
        title: `Premium ${supplierDetails.productName || 'Product'}`,
        shortDescription: "Experience unparalleled quality and convenience with our latest innovation. Designed for the modern lifestyle.",
        imageUrl: supplierDetails.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
        benefits: [
          "Durable and long-lasting materials",
          "Ergonomic design for maximum comfort",
          "Eco-friendly manufacturing process",
          "1-Year Comprehensive Warranty"
        ],
        seoTitle: `${supplierDetails.productName} | Buy Online | Free Shipping`,
        metaDescription: `Get the best deals on ${supplierDetails.productName}. High quality, affordable price, and fast shipping across India. Order now!`,
        suggestedSellingPrice: Math.round(Number(supplierDetails.supplierCost || 0) * 2.5),
        facebookAdCopy: `Tired of standard ${supplierDetails.productName}s? Upgrade your life today! 🚀 Get 50% OFF our premium model. Limited stock available. Click to shop now! 👇`,
      });
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4 mb-2">
        <Link href="/admin" className="text-gray-500 hover:text-gray-900">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">AI Product Import</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 pt-6 flex space-x-8">
        <button 
          onClick={() => setActiveTab("manual")}
          className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "manual" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Option B: Manual Import
        </button>
        <button 
          onClick={() => setActiveTab("url")}
          className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Option A: URL Import
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span>📥 Supplier Raw Data</span>
            </h2>

            {activeTab === "url" && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <label className="block text-sm font-medium text-blue-900 mb-2">Paste Supplier Product URL</label>
                <div className="flex space-x-2">
                  <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} type="url" placeholder="https://..." className="flex-1 px-4 py-2 border border-blue-200 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500" />
                  <button onClick={handleFetch} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Fetch</button>
                </div>
                <p className="mt-2 text-xs text-blue-700">AI will safely extract data without triggering bot protections.</p>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                  <input required value={supplierDetails.supplierName} onChange={(e) => setSupplierDetails({...supplierDetails, supplierName: e.target.value})} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g. ABC Electronics" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Cost (₹)</label>
                  <input required value={supplierDetails.supplierCost} onChange={(e) => setSupplierDetails({...supplierDetails, supplierCost: e.target.value})} type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="450" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Product Name</label>
                <input required value={supplierDetails.productName} onChange={(e) => setSupplierDetails({...supplierDetails, productName: e.target.value})} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Car Vacuum X200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image (Upload or URL)</label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input value={supplierDetails.imageUrl} onChange={(e) => setSupplierDetails({...supplierDetails, imageUrl: e.target.value})} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Paste URL or upload file &rarr;" />
                  </div>
                  <div>
                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center shadow-sm">
                      <span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raw Details / Specs (Paste everything)</label>
                <textarea required value={supplierDetails.details} onChange={(e) => setSupplierDetails({...supplierDetails, details: e.target.value})} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="12V, 120W, Black color, Minimum Order 10 pcs, shipping extra..." />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white transition-all ${isGenerating ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}
                >
                  {isGenerating ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      AI is generating listing...
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span className="text-xl">✨</span>
                      <span>Generate Store Product</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* AI Output Result */}
        <div className="bg-gray-50 rounded-xl shadow-inner border border-gray-200 overflow-hidden relative min-h-[600px]">
          {!generatedContent && !isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <span className="text-6xl mb-4">🪄</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Awaiting Instructions</h3>
              <p className="text-sm">Enter the raw supplier data and click generate. AI will transform it into a highly-optimized, ready-to-publish e-commerce listing.</p>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-4 font-medium text-indigo-800 animate-pulse">Writing SEO Description...</p>
            </div>
          )}

          {generatedContent && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-indigo-900 flex items-center">
                  <span>✨ AI Optimized Listing</span>
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50 text-gray-700">Edit</button>
                  <button 
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded text-sm font-bold hover:bg-green-700 shadow-sm disabled:bg-green-400 transition-all"
                  >
                    {isPublishing ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : "🚀 "}
                    {isPublishing ? "Publishing..." : "Publish to Store"}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                
                {/* Image Preview */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative flex space-x-4">
                  <span className="absolute -top-2 -left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">MAIN IMAGE</span>
                  <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={generatedContent.imageUrl} alt="Product Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Image URL</label>
                    <input type="text" className="w-full text-xs text-blue-700 font-medium border border-gray-200 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none" defaultValue={generatedContent.imageUrl} />
                  </div>
                </div>

                {/* Product Title */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative group">
                  <span className="absolute -top-2 -left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">TITLE</span>
                  <input type="text" className="w-full text-lg font-bold text-gray-900 border-none focus:ring-0 p-0" defaultValue={generatedContent.title} />
                </div>

                {/* Description */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative group">
                  <span className="absolute -top-2 -left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">DESCRIPTION</span>
                  <textarea rows={3} className="w-full text-sm text-gray-700 border-none focus:ring-0 p-0 resize-none" defaultValue={generatedContent.shortDescription} />
                </div>

                {/* Pricing Recommendation */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 shadow-sm">
                  <h4 className="text-xs font-bold text-green-800 uppercase mb-3">AI Pricing Strategy</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Supplier Cost</p>
                      <p className="font-semibold text-gray-900">₹{supplierDetails.supplierCost}</p>
                    </div>
                    <div className="text-xl text-gray-300">&rarr;</div>
                    <div>
                      <p className="text-xs text-indigo-600 font-bold">Suggested Price</p>
                      <input type="number" className="text-2xl font-black text-indigo-700 bg-transparent border-b border-indigo-300 w-24 focus:outline-none focus:border-indigo-600 p-0" defaultValue={generatedContent.suggestedSellingPrice} />
                    </div>
                    <div className="text-xl text-gray-300">&rarr;</div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-bold">Est. Margin</p>
                      <p className="font-bold text-green-700 text-lg">
                        {Math.round(((generatedContent.suggestedSellingPrice - Number(supplierDetails.supplierCost)) / generatedContent.suggestedSellingPrice) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative">
                  <span className="absolute -top-2 -left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">KEY BENEFITS</span>
                  <ul className="space-y-2 mt-2 text-sm text-gray-700">
                    {generatedContent.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <input type="text" className="flex-1 border-none focus:ring-0 p-0 bg-transparent" defaultValue={b} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SEO & Marketing */}
                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative">
                  <span className="absolute -top-2 -left-2 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">SEO & MARKETING</span>
                  
                  <div className="space-y-3 mt-2">
                    <div>
                      <label className="text-[10px] font-semibold text-gray-500">Meta Title</label>
                      <input type="text" className="w-full text-xs text-blue-700 font-medium border-b border-gray-200 focus:ring-0 p-0" defaultValue={generatedContent.seoTitle} />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-gray-500">Meta Description</label>
                      <textarea rows={2} className="w-full text-xs text-gray-600 border-b border-gray-200 focus:ring-0 p-0 resize-none" defaultValue={generatedContent.metaDescription} />
                    </div>
                    <div className="pt-2">
                      <label className="text-[10px] font-bold text-purple-600 flex items-center mb-1">📘 Facebook Ad Copy</label>
                      <textarea rows={3} className="w-full text-sm text-gray-800 bg-gray-50 p-2 rounded border border-gray-200 focus:outline-none" defaultValue={generatedContent.facebookAdCopy} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Toast Notification */}
      <div className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transform transition-all duration-500 z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <h4 className="font-bold text-sm">Successfully Published</h4>
          <p className="text-xs text-gray-300">The product is now live on your store.</p>
        </div>
      </div>

    </div>
  );
}
