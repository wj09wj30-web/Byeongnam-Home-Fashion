export interface Product {
  id: string;
  name: string;
  category: 'curtain' | 'bedding' | 'accessory';
  price: number;
  description: string;
  materials: string[];
  features: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  isBest?: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  customDimensions?: {
    width: number;
    height: number;
  };
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
}
