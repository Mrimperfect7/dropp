"use client";

import { useState } from "react";

export default function AIProductResearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResults(null);

    setTimeout(() => {
      setIsSearching(false);
      setResults({
        niche: "Travel Accessories",
        opportunityScore: 85,
        suggestions: [
          { name: "Digital Luggage Scale", estCost: 250, estSelling: 799, margin: "68%" },
          { name: "Universal Travel Adapter", estCost: 350, estSelling: 999, margin: "65%" },
          { name: "Compression Packing Cubes", estCost: 450, estSelling: 1299, margin: "65%" }
        ],
        analysis: "High demand during holiday seasons. Low shipping weight reduces supplier overhead. Strong potential for impulse buys on Instagram Ads."
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">✨ AI Product Research</h1>
      <p className="text-gray-600">Enter a niche or target audience, and the AI will analyze market trends to suggest profitable dropshipping products.</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Niche</label>
              <input required type="text" placeholder="e.g. Pet Owners, Travelers" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Margin (%)</label>
              <input type="number" placeholder="e.g. 50" defaultValue="50" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isSearching ? "Analyzing Market Data..." : "Run Analysis"}
          </button>
        </form>
      </div>

      {results && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-indigo-900">Market Opportunity: {results.niche}</h3>
              <p className="text-indigo-700 mt-2 text-sm">{results.analysis}</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-indigo-100">
              <span className="block text-xs font-bold text-gray-500 uppercase">Score</span>
              <span className="block text-2xl font-black text-green-600">{results.opportunityScore}/100</span>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-4">Recommended Products</h4>
          <div className="space-y-3">
            {results.suggestions.map((s: any, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                <span className="font-medium text-gray-900">{s.name}</span>
                <div className="flex space-x-6 text-sm">
                  <div><span className="text-gray-500 block text-xs">Est. Cost</span>₹{s.estCost}</div>
                  <div><span className="text-gray-500 block text-xs">Selling</span>₹{s.estSelling}</div>
                  <div><span className="text-green-600 font-bold block text-xs">Margin</span>{s.margin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
