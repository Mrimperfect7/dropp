export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  supplierCost?: number;
  margin?: string;
  status?: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  category?: string;
  images?: string[];
  benefits?: string[];
  specifications?: ProductSpecification[];
  description?: string;
  shortDescription?: string;
  [key: string]: unknown;
}
