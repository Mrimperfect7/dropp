import Link from "next/link";
import { getProducts } from "@/app/actions";
import { notFound } from "next/navigation";
import type { ProductSpecification } from "@/types/product";
import { AddToCartButton, WishlistButton } from "@/components/ShopButtons";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Fetch real products from our JSON DB and find by ID (slug)
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === slug);
  
  if (!product) {
    notFound();
  }

  // Ensure default arrays exist for the template if they are missing
  product.images = product.images || [product.image];
  product.benefits = product.benefits || [];
  product.specifications = product.specifications || [];
  product.description = product.description || product.shortDescription || "High quality product from verified suppliers.";

  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    originalPrice: product.originalPrice,
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500 font-medium">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-indigo-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/category/auto" className="hover:text-indigo-600">Automotive</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.title}</li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
              <WishlistButton product={cartItem} className="absolute top-4 right-4 w-11 h-11 text-2xl" />
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-indigo-600' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl ${i < Math.floor(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">
                {product.reviews} Reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline space-x-3">
              <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>
            
            <p className="mt-6 text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Key Benefits */}
            <div className="mt-8 space-y-3">
              {product.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Delivery Estimate */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center space-x-4">
              <div className="text-3xl">🚚</div>
              <div>
                <p className="font-semibold text-gray-900">Free Standard Delivery</p>
                <p className="text-sm text-gray-500">Order now to get it by <span className="font-medium text-gray-900">Oct 4 - Oct 6</span></p>
              </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex mt-10 space-x-4">
              <AddToCartButton product={cartItem} className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors text-center">
                Add to Cart
              </AddToCartButton>
              <AddToCartButton product={cartItem} redirectTo="/checkout" className="flex-1 bg-indigo-600 text-white py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-center">
                Buy Now
              </AddToCartButton>
            </div>
          </div>
        </div>

        {/* Specifications Tab */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec: ProductSpecification, idx: number) => (
              <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">{spec.label}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex space-x-3">
        <AddToCartButton product={cartItem} addedLabel={<span className="text-xl">✓</span>} className="w-1/3 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-full font-bold">
          <span className="text-xl">🛒 +</span>
        </AddToCartButton>
        <AddToCartButton product={cartItem} redirectTo="/checkout" className="w-2/3 flex items-center justify-center bg-indigo-600 text-white py-3 rounded-full font-bold text-lg shadow-lg shadow-indigo-500/30">
          Buy Now
        </AddToCartButton>
      </div>

    </div>
  );
}
