export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  tag?: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  id: string; // unique identification combinining product.id, chosen size, chosen color
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}
