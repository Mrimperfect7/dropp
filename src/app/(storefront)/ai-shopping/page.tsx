"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  products?: any[];
}

export default function AIShoppingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hi! I'm Aura's AI Shopping Assistant. What are you looking for today? You can say things like 'I need a gift for my brother under ₹1500' or 'Show me travel accessories'.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const lowerInput = userMessage.content.toLowerCase();
      let aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I couldn't find exactly that, but here are some popular items you might like.",
      };

      if (lowerInput.includes("gift") || lowerInput.includes("brother") || lowerInput.includes("1500") || lowerInput.includes("car")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I found the perfect gift under ₹1500! A Portable Car Vacuum is a very practical and highly-rated gift for anyone who drives. Here are the top options in stock:",
          products: [
            {
              id: "p1",
              title: "Portable Car Vacuum Cleaner High Power",
              price: 1299,
              image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop",
              rating: 4.8
            }
          ]
        };
      } else if (lowerInput.includes("travel") || lowerInput.includes("accessories")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Great! For traveling, comfort and utility are key. These are our best-selling travel accessories:",
          products: [
            {
              id: "p2",
              title: "Wireless Noise-Canceling Earbuds",
              price: 1999,
              image: "https://images.unsplash.com/photo-1606220588913-b3aecb4b27f0?q=80&w=2070&auto=format&fit=crop",
              rating: 4.7
            },
            {
              id: "p3",
              title: "Smart Stainless Steel Thermos",
              price: 699,
              image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
              rating: 4.6
            }
          ]
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-600 text-white flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">
              ✨
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Aura AI Assistant</h1>
              <p className="text-indigo-200 text-xs">Powered by Advanced AI</p>
            </div>
          </div>
          <button className="text-indigo-200 hover:text-white transition-colors">
            Clear Chat
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* AI Avatar */}
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mr-3 mt-1 border border-indigo-200 shadow-sm">
                  <span className="text-sm">✨</span>
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
              }`}>
                <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                  {msg.content}
                </p>

                {/* Product Recommendations */}
                {msg.products && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.products.map(product => (
                      <Link key={product.id} href={`/product/${product.id}`} className="block bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-300 transition-colors group">
                        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{product.title}</h4>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="font-bold text-indigo-600">₹{product.price}</span>
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">View</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mr-3 mt-1 border border-indigo-200 shadow-sm">
                <span className="text-sm">✨</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 flex space-x-1 items-center h-[52px]">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. 'Show me electronics under ₹2000')"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white rounded-full h-[46px] w-[46px] flex items-center justify-center flex-shrink-0 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 font-medium">Suggestions:</span>
            <button onClick={() => setInput("Find a gift for my brother under ₹1500")} className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 px-3 py-1 rounded-full transition-colors">Gift under ₹1500</button>
            <button onClick={() => setInput("Show me travel accessories")} className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 px-3 py-1 rounded-full transition-colors">Travel accessories</button>
          </div>
        </div>

      </div>
    </div>
  );
}
