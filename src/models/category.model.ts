import { Product } from "./product.model";

export interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

export interface CategoryDb {
  title: string;
  items: Product[];
}

export interface CategoryMap {
  [key: string]: Product[];
}
