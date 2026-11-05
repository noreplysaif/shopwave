import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBDT,
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateCouponDiscount,
  validateCartStock,
  deductStockForOrder,
  restoreStockForOrder,
  checkAdminPermission,
} from './shopEngine';
import { CartItem, Coupon, Product } from '../types';

test('formatBDT formats amounts with BDT symbol and locale thousands', () => {
  const formatted = formatBDT(124990);
  assert.ok(formatted.startsWith('৳'));
  assert.ok(formatted.includes('124,990') || formatted.includes('1,24,990'));
});

test('calculateCartSubtotal accurately sums items by quantity', () => {
  const items: CartItem[] = [
    {
      productId: 'p1',
      name: 'iPhone 16 Pro',
      sku: 'IPH-16P',
      price: 155000,
      regularPrice: 165000,
      quantity: 2,
      image: '',
      maxStock: 10,
    },
    {
      productId: 'p2',
      name: 'Sony WH-1000XM5',
      sku: 'SNY-WH5',
      price: 38500,
      regularPrice: 42000,
      quantity: 1,
      image: '',
      maxStock: 5,
    },
  ];
  assert.equal(calculateCartSubtotal(items), 155000 * 2 + 38500);
});

test('calculateDeliveryFee applies inside/outside Dhaka and free shipping threshold', () => {
  // Subtotal under 50,000 threshold
  assert.equal(calculateDeliveryFee('inside_dhaka', 25000), 60);
  assert.equal(calculateDeliveryFee('outside_dhaka', 25000), 120);
  // Subtotal at or above 50,000 threshold => Free delivery
  assert.equal(calculateDeliveryFee('inside_dhaka', 65000), 0);
  assert.equal(calculateDeliveryFee('outside_dhaka', 50000), 0);
});

test('calculateCouponDiscount checks validity, min purchase, and percentage caps', () => {
  const coupon: Coupon = {
    id: 'c1',
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10, // 10%
    minPurchase: 10000,
    maxDiscount: 5000,
    expiryDate: '2030-01-01',
    usageLimit: 100,
    usageCount: 10,
    isActive: true,
  };

  // Subtotal below min purchase
  const failResult = calculateCouponDiscount(coupon, 5000);
  assert.equal(failResult.valid, false);

  // Subtotal 20,000 -> 10% = 2,000
  const passResult = calculateCouponDiscount(coupon, 20000);
  assert.equal(passResult.valid, true);
  assert.equal(passResult.discountAmount, 2000);

  // Subtotal 80,000 -> 10% = 8,000 capped at maxDiscount 5,000
  const cappedResult = calculateCouponDiscount(coupon, 80000);
  assert.equal(cappedResult.valid, true);
  assert.equal(cappedResult.discountAmount, 5000);
});

test('validateCartStock prevents ordering out of stock without backorders', () => {
  const products: Product[] = [
    {
      id: 'p1',
      name: 'Gadget A',
      slug: 'gadget-a',
      sku: 'GA-1',
      shortDescription: '',
      description: '',
      category: 'Laptops',
      brand: 'BrandX',
      regularPrice: 50000,
      salePrice: 48000,
      discountPercentage: 4,
      purchaseCost: 40000,
      stock: 2,
      stockStatus: 'low_stock',
      lowStockThreshold: 3,
      allowBackorders: false,
      mainImage: '',
      galleryImages: [],
      specifications: [],
      colors: [],
      tags: [],
      warranty: '1 Year',
      visibility: 'published',
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: false,
      isFlashSale: false,
      rating: 5,
      reviewCount: 1,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const validItems: CartItem[] = [
    {
      productId: 'p1',
      name: 'Gadget A',
      sku: 'GA-1',
      price: 48000,
      regularPrice: 50000,
      quantity: 2,
      image: '',
      maxStock: 2,
    },
  ];
  assert.equal(validateCartStock(validItems, products).valid, true);

  const invalidItems: CartItem[] = [
    {
      productId: 'p1',
      name: 'Gadget A',
      sku: 'GA-1',
      price: 48000,
      regularPrice: 50000,
      quantity: 5, // Exceeds available stock 2
      image: '',
      maxStock: 2,
    },
  ];
  const invalidResult = validateCartStock(invalidItems, products);
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors[0].includes('Only 2 units available'));
});

test('deductStockForOrder reduces stock and flags low or out-of-stock transitions', () => {
  const products: Product[] = [
    {
      id: 'p1',
      name: 'Product 1',
      slug: 'p1',
      sku: 'SKU-1',
      shortDescription: '',
      description: '',
      category: 'Audio',
      brand: 'Brand',
      regularPrice: 1000,
      salePrice: 1000,
      discountPercentage: 0,
      purchaseCost: 800,
      stock: 5,
      stockStatus: 'in_stock',
      lowStockThreshold: 3,
      allowBackorders: false,
      mainImage: '',
      galleryImages: [],
      specifications: [],
      colors: [],
      tags: [],
      warranty: '1 Year',
      visibility: 'published',
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: false,
      isFlashSale: false,
      rating: 5,
      reviewCount: 0,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const { updatedProducts, lowStockAlerts } = deductStockForOrder(products, [
    { productId: 'p1', quantity: 3 },
  ]);

  assert.equal(updatedProducts[0].stock, 2);
  assert.equal(updatedProducts[0].stockStatus, 'low_stock');
  assert.ok(lowStockAlerts.length > 0);

  // Restoring stock reverts stock count
  const restored = restoreStockForOrder(updatedProducts, [{ productId: 'p1', quantity: 3 }]);
  assert.equal(restored[0].stock, 5);
  assert.equal(restored[0].stockStatus, 'in_stock');
});

test('checkAdminPermission enforces role-based access control accurately', () => {
  // Super admin has full access
  assert.equal(checkAdminPermission('super_admin', 'settings'), true);
  assert.equal(checkAdminPermission('super_admin', 'users'), true);

  // Product manager cannot touch users or settings or orders
  assert.equal(checkAdminPermission('product_manager', 'products'), true);
  assert.equal(checkAdminPermission('product_manager', 'inventory'), true);
  assert.equal(checkAdminPermission('product_manager', 'users'), false);
  assert.equal(checkAdminPermission('product_manager', 'settings'), false);
  assert.equal(checkAdminPermission('product_manager', 'orders'), false);

  // Order manager can view orders and inventory, but not settings or users
  assert.equal(checkAdminPermission('order_manager', 'orders'), true);
  assert.equal(checkAdminPermission('order_manager', 'users'), false);
});
