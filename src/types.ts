export type Category = 'Baby Care' | 'Diapering' | 'Feeding' | 'Clothing' | 'Toys & Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // in INR (₹)
  originalPrice: number; // MRP in INR
  discountPercentage: number;
  rating: number; // e.g. 4.8
  reviewCount: number;
  stock: number;
  image: string;
  description: string;
  features: string[];
  ageGroup: string; // e.g., '0-6 Months', '6-12 Months', '1-2 Years'
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
}

export type PaymentMethod = 'UPI_QR' | 'UPI_ID' | 'CARD' | 'COD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'PENDING_COD';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string; // e.g. BB-2026-8921
  createdAt: string;
  items: OrderItem[];
  customer: Address;
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentDetails?: {
    transactionId?: string;
    upiReference?: string;
    paidAt?: string;
  };
  tracking?: {
    courierName: string;
    trackingNumber: string;
    estimatedDelivery: string;
    statusHistory: {
      status: OrderStatus;
      timestamp: string;
      note: string;
    }[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses?: Address[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
