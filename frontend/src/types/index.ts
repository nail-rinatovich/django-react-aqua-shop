export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

export interface ProductImage {
  id: number;
  image: string;
  is_main: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  old_price: string | null;
  volume: string;
  stock: number;
  category: Category;
  main_image: string | null;
  description?: string;
  images?: ProductImage[];
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ProductFilters {
  category?: string;
  search?: string;
  ordering?: string;
  page?: number;
}