"use client";

import { useSyncExternalStore } from "react";

export interface ShopItem {
  id: string;
  title: string;
  price: number;
  image: string;
  originalPrice?: number;
}

export interface CartItem extends ShopItem {
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: ShopItem[];
}

const STORAGE_KEY = "aura-shop-v1";
const EMPTY: ShopState = { cart: [], wishlist: [] };

let state: ShopState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        cart: Array.isArray(parsed.cart) ? parsed.cart : [],
        wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      };
    }
  } catch {
    state = EMPTY;
  }
  // Keep multiple tabs in sync
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listeners.forEach((l) => l());
  });
}

function setState(next: ShopState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable; state still lives for this session
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return EMPTY;
}

function toItem(p: ShopItem): ShopItem {
  return { id: p.id, title: p.title, price: Number(p.price) || 0, image: p.image, originalPrice: p.originalPrice };
}

export function addToCart(product: ShopItem, quantity = 1) {
  const existing = state.cart.find((i) => i.id === product.id);
  const cart = existing
    ? state.cart.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
    : [...state.cart, { ...toItem(product), quantity }];
  setState({ ...state, cart });
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity < 1) return removeFromCart(id);
  setState({ ...state, cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)) });
}

export function removeFromCart(id: string) {
  setState({ ...state, cart: state.cart.filter((i) => i.id !== id) });
}

export function clearCart() {
  setState({ ...state, cart: [] });
}

export function toggleWishlist(product: ShopItem) {
  const inList = state.wishlist.some((i) => i.id === product.id);
  const wishlist = inList
    ? state.wishlist.filter((i) => i.id !== product.id)
    : [...state.wishlist, toItem(product)];
  setState({ ...state, wishlist });
}

export function removeFromWishlist(id: string) {
  setState({ ...state, wishlist: state.wishlist.filter((i) => i.id !== id) });
}

export function moveToCart(product: ShopItem) {
  const wishlist = state.wishlist.filter((i) => i.id !== product.id);
  setState({ ...state, wishlist });
  addToCart(product);
}

export function useShop() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const itemCount = s.cart.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = s.cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  return {
    cart: s.cart,
    wishlist: s.wishlist,
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
    isInWishlist: (id: string) => s.wishlist.some((i) => i.id === id),
  };
}
