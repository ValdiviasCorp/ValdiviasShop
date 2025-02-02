export interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;  // Required
  image?: string;    // Optional
}
