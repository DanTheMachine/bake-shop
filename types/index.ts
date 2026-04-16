// Type definitions for the bakery application

export type ProductCategory = 'CUSTOM_CAKE' | 'READY_MADE' | 'SEASONAL' | 'GIFT_BOX';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CASH_ON_PICKUP';
export type FulfillmentStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
export type CustomOrderStatus = 'PENDING' | 'QUOTED' | 'ACCEPTED' | 'DECLINED';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  images: string[];
  available: boolean;
  requiresCustomForm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  image?: string;
  customDetails?: Record<string, any>;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  pickupDate?: Date;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  stripePaymentIntentId?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  customDetails?: Record<string, any>;
}

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: Date;
  cakeSize: string;
  flavors: string;
  designDescription: string;
  referenceImages: string[];
  budget?: string;
  status: CustomOrderStatus;
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  pickupDate?: string;
  specialInstructions?: string;
  paymentMethod: 'online' | 'cash';
}

export interface CustomCakeFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  cakeSize: string;
  flavors: string;
  designDescription: string;
  budget?: string;
  referenceImages?: File[];
}
