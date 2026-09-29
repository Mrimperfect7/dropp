"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart, toggleWishlist, useShop, type ShopItem } from "@/lib/shop-store";

export function CartBadge() {
  const { itemCount } = useShop();
  return (
    <Link href="/cart" aria-label={`Cart (${itemCount} items)`} className="relative text-gray-500 hover:text-indigo-600 transition-colors">
      <span className="text-xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

export function WishlistBadge() {
  const { wishlist } = useShop();
  return (
    <Link href="/wishlist" aria-label={`Wishlist (${wishlist.length} items)`} className="relative text-gray-500 hover:text-indigo-600 transition-colors">
      <span className="text-xl">❤️</span>
      {wishlist.length > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}

export function AddToCartButton({
  product,
  className,
  children,
  addedLabel = "Added ✓",
  redirectTo,
}: {
  product: ShopItem;
  className?: string;
  children: React.ReactNode;
  addedLabel?: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        if (redirectTo) {
          router.push(redirectTo);
          return;
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? addedLabel : children}
    </button>
  );
}

export function WishlistButton({ product, className = "" }: { product: ShopItem; className?: string }) {
  const { isInWishlist } = useShop();
  const active = isInWishlist(product.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:scale-110 transition-transform ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
    >
      <span className={active ? "text-red-500" : "text-gray-400"}>{active ? "♥" : "♡"}</span>
    </button>
  );
}
