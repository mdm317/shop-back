export const BACK_URL = process.env.REACT_APP_DBURL;
export interface User {
  id: string;
  userId: string;
  name: string;
  point: number;
  email?: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: number;
  basket: Basket;
}
export interface Basket {
  id: string;
  products: Product[];
  userId: string;
}
//product 안에 리뷰와 질문 포함
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  productImage: Image[];
  description: string;
  thumbnail?: string;
  willDelete?: boolean;
  createdAt?: number;
  qnas: Qna[];
  reviews: Review[];
}
export interface Image {
  id: string;
  url: string;
}
export interface Address {
  address: string;
  additional?: string;
  zipcode: string;
}
export interface Review {
  id: string;
  content: string;
  rating: number;
  image?: string;
  orderId: string;
  productId: string;
}

export interface Qna {
  id: string;
  content: string;
  user: User;
  product: {
    id: string;
  };
  answer?: Qna;
  question?: Qna;
  createdAt: string;
  userId: string;
}
interface ProductInOrder extends Product {
  existReview: boolean;
  count: number;
}
export interface Order {
  id: string;
  products: ProductInOrder[];
  name: string;
  address1: string;
  address2: string;
  zipcode: string;
  phone: string;
  message?: string;
  orderNumber: string;
  createdAt: string;
  user?: {
    userId: string;
  };
}
