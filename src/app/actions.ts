'use server'

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const getFilePath = () => path.join(process.cwd(), 'products.json');

export async function getProducts() {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) {
    // Return some default products if file doesn't exist
    const defaultProducts = [
      {
        id: "p1",
        title: "Portable Car Vacuum Cleaner",
        price: 1299,
        supplierCost: 450,
        margin: "65%",
        status: "Published",
        image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop",
        originalPrice: 2499,
        rating: 4.8,
        reviews: 124,
        category: "Automotive"
      },
      {
        id: "p2",
        title: "Ergonomic Laptop Stand",
        price: 899,
        supplierCost: 350,
        margin: "61%",
        status: "Published",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
        originalPrice: 1599,
        rating: 4.9,
        reviews: 312,
        category: "Office"
      }
    ];
    fs.writeFileSync(filePath, JSON.stringify(defaultProducts, null, 2));
    return defaultProducts;
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export async function addProduct(product: any) {
  const products = await getProducts();
  const price = Number(product.price);
  
  const newProduct = { 
    ...product, 
    id: `p_${Date.now()}`,
    status: "Published",
    // Set a default original price 40% higher than the selling price if not provided
    originalPrice: product.originalPrice || Math.round(price * 1.4),
    // Give it a default 5-star rating and some reviews so it looks good on the storefront
    rating: product.rating || 5.0,
    reviews: product.reviews || Math.floor(Math.random() * 50) + 10
  };
  products.unshift(newProduct); // Add to beginning
  fs.writeFileSync(getFilePath(), JSON.stringify(products, null, 2));
  
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const products = await getProducts();
  const filtered = products.filter((p: any) => p.id !== id);
  fs.writeFileSync(getFilePath(), JSON.stringify(filtered, null, 2));
  
  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  return { success: true };
}

export async function updateProduct(id: string, updatedData: any) {
  const products = await getProducts();
  const index = products.findIndex((p: any) => p.id === id);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    fs.writeFileSync(getFilePath(), JSON.stringify(products, null, 2));
    
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    revalidatePath('/');
    return { success: true };
  }
  return { error: "Product not found" };
}
