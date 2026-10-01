import { api } from "./client";
import type { Category, Paginated, Product, ProductFilters } from "../types";

export async function fetchProducts(filters: ProductFilters = {}) {
  const { data } = await api.get<Paginated<Product>>("/products/", {
    params: filters,
  });
  return data;
}

export async function fetchProduct(slug: string) {
  const { data } = await api.get<Product>(`/products/${slug}/`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get<Paginated<Category>>("/categories/");
  return data;
}