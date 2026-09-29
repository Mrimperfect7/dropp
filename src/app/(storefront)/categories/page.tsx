import Link from "next/link";

const categories = [
  {
    name: "Automotive & Car Care",
    slug: "automotive",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop",
    itemCount: 24,
  },
  {
    name: "Electronics & Tech",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    itemCount: 56,
  },
  {
    name: "Home & Office",
    slug: "home",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    itemCount: 41,
  },
  {
    name: "Travel & Outdoors",
    slug: "travel",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    itemCount: 18,
  },
  {
    name: "Health & Fitness",
    slug: "fitness",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    itemCount: 32,
  },
  {
    name: "Fashion Accessories",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    itemCount: 47,
  }
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">Shop by Category</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated collections of premium products to find exactly what you're looking for.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category) => (
          <Link key={category.slug} href={`/shop?category=${category.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[4/3] block shadow-sm hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="absolute inset-0">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{category.name}</h3>
                <p className="text-gray-300 font-medium text-sm">{category.itemCount} Products</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
