export type ProductVisibility = 'draft' | 'published' | 'hidden';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  brand: string;
  productType?: string;
  regularPrice: number;
  salePrice: number;
  discountPercentage: number;
  purchaseCost: number; // admin only
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  lowStockThreshold: number;
  allowBackorders: boolean;
  mainImage: string;
  galleryImages: string[];
  specifications: ProductSpec[];
  colors: string[];
  tags: string[];
  warranty: string;
  weight?: string;
  dimensions?: string;
  visibility: ProductVisibility;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isFlashSale: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isVisible: boolean;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  regularPrice: number;
  quantity: number;
  selectedColor?: string;
  image: string;
  maxStock: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export type PaymentStatus = 'pending' | 'verified' | 'failed' | 'refunded';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  color?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  district: string;
  city: string;
  area: string;
  address: string;
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  deliveryFee: number;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  senderNumber?: string;
  orderStatus: OrderStatus;
  internalNotes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  applicableCategory?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  district: string;
  city: string;
  area: string;
  address: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'disabled';
  totalOrders: number;
  totalSpent: number;
  addresses: SavedAddress[];
  createdAt: string;
}

export type AdminRole =
  | 'super_admin'
  | 'store_manager'
  | 'product_manager'
  | 'order_manager'
  | 'support_manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  currency: string;
  deliveryFeeInsideDhaka: number;
  deliveryFeeOutsideDhaka: number;
  freeDeliveryThreshold: number;
  heroHeading: string;
  heroSubheading: string;
  heroCtaText: string;
  heroCtaLink: string;
  announcementBanner: string;
  showAnnouncement: boolean;
  isStoreOpen: boolean;
  maintenanceMode: boolean;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  details: string;
  timestamp: string;
}
