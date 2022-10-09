import { Product } from "./product.model";

export interface CartItem extends Product {
  quantity: number;
}

// id: number;
// name: string;
// imageUrl: string;
// price: number;