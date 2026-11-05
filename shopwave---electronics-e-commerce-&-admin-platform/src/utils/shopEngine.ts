import { CartItem, Coupon, Order, Product, AdminRole } from '../types';

/**
 * Format amounts into Bangladeshi Taka (৳) format.
 * Example: 125000 -> ৳ 125,000
 */
export function formatBDT(amount: number): string {
  const rounded = Math.round(amount);
  return `৳${rounded.toLocaleString('en-BD')}`;
}

/**
 * Calculate cart subtotal
 */
export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculate delivery fee based on zone and subtotal
 */
export function calculateDeliveryFee(
  zone: 'inside_dhaka' | 'outside_dhaka',
  subtotal: number,
  feeInside = 60,
  feeOutside = 120,
  freeThreshold = 50000
): number {
  if (subtotal >= freeThreshold) {
    return 0;
  }
  return zone === 'inside_dhaka' ? feeInside : feeOutside;
}

/**
 * Validate and calculate coupon discount
 */
export function calculateCouponDiscount(
  coupon: Coupon | null | undefined,
  subtotal: number,
  categoryItems?: { category: string; price: number; quantity: number }[]
): { valid: boolean; discountAmount: number; message: string } {
  if (!coupon) {
    return { valid: false, discountAmount: 0, message: '' };
  }

  if (!coupon.isActive) {
    return { valid: false, discountAmount: 0, message: 'This coupon is inactive.' };
  }

  if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, discountAmount: 0, message: 'This coupon has reached its usage limit.' };
  }

  const now = new Date();
  const expiry = new Date(coupon.expiryDate);
  if (now > expiry) {
    return { valid: false, discountAmount: 0, message: 'This coupon has expired.' };
  }

  // Calculate eligible subtotal
  let eligibleSubtotal = subtotal;
  if (coupon.applicableCategory && categoryItems) {
    eligibleSubtotal = categoryItems
      .filter((i) => i.category.toLowerCase() === coupon.applicableCategory?.toLowerCase())
      .reduce((sum, i) => sum + i.price * i.quantity, 0);

    if (eligibleSubtotal === 0) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Coupon is only applicable to ${coupon.applicableCategory} products.`,
      };
    }
  }

  if (eligibleSubtotal < coupon.minPurchase) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Minimum purchase of ${formatBDT(coupon.minPurchase)} required for this coupon.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (eligibleSubtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && coupon.maxDiscount > 0) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else {
    discount = Math.min(coupon.discountValue, eligibleSubtotal);
  }

  return {
    valid: true,
    discountAmount: Math.round(discount),
    message: 'Coupon applied successfully!',
  };
}

/**
 * Validate whether stock is sufficient for cart items
 */
export function validateCartStock(
  items: CartItem[],
  products: Product[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      errors.push(`Product "${item.name}" is no longer available.`);
      continue;
    }
    if (product.visibility !== 'published') {
      errors.push(`Product "${item.name}" is currently unavailable.`);
      continue;
    }
    if (!product.allowBackorders && product.stock < item.quantity) {
      errors.push(
        `Only ${product.stock} units available for "${item.name}" (requested ${item.quantity}).`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Deduct inventory for an order
 */
export function deductStockForOrder(
  products: Product[],
  orderItems: { productId: string; quantity: number }[]
): { updatedProducts: Product[]; lowStockAlerts: string[] } {
  const lowStockAlerts: string[] = [];
  const updatedProducts = products.map((product) => {
    const ordered = orderItems.find((oi) => oi.productId === product.id);
    if (!ordered) return product;

    const newStock = Math.max(0, product.stock - ordered.quantity);
    let newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (newStock === 0) {
      newStatus = 'out_of_stock';
      lowStockAlerts.push(`"${product.name}" is now OUT OF STOCK!`);
    } else if (newStock <= product.lowStockThreshold) {
      newStatus = 'low_stock';
      lowStockAlerts.push(
        `"${product.name}" has reached low stock (${newStock} units left)!`
      );
    }

    return {
      ...product,
      stock: newStock,
      stockStatus: newStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  return { updatedProducts, lowStockAlerts };
}

/**
 * Restore inventory when an order is cancelled or returned
 */
export function restoreStockForOrder(
  products: Product[],
  orderItems: { productId: string; quantity: number }[]
): Product[] {
  return products.map((product) => {
    const ordered = orderItems.find((oi) => oi.productId === product.id);
    if (!ordered) return product;

    const newStock = product.stock + ordered.quantity;
    let newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (newStock === 0) {
      newStatus = 'out_of_stock';
    } else if (newStock <= product.lowStockThreshold) {
      newStatus = 'low_stock';
    }

    return {
      ...product,
      stock: newStock,
      stockStatus: newStatus,
      updatedAt: new Date().toISOString(),
    };
  });
}

/**
 * Generate unique order ID
 */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `SW-${year}-${random}`;
}

/**
 * Check Role-Based Access Control permissions
 */
export function checkAdminPermission(
  role: AdminRole,
  section:
    | 'dashboard'
    | 'products'
    | 'orders'
    | 'customers'
    | 'inventory'
    | 'coupons'
    | 'banners'
    | 'settings'
    | 'users'
    | 'reports'
    | 'reviews'
): boolean {
  if (role === 'super_admin') return true;

  switch (role) {
    case 'store_manager':
      return [
        'dashboard',
        'products',
        'orders',
        'customers',
        'inventory',
        'coupons',
        'banners',
        'reports',
        'reviews',
      ].includes(section);
    case 'product_manager':
      return ['dashboard', 'products', 'inventory', 'reviews'].includes(section);
    case 'order_manager':
      return ['dashboard', 'orders', 'customers', 'inventory'].includes(section);
    case 'support_manager':
      return ['dashboard', 'orders', 'customers', 'reviews'].includes(section);
    default:
      return false;
  }
}
