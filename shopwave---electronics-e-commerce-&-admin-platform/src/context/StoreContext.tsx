import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  Order,
  Customer,
  AdminUser,
  Coupon,
  CartItem,
  WebsiteSettings,
  ActivityLog,
  OrderStatus,
  PaymentStatus,
  AdminRole,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_ADMINS,
  INITIAL_COUPONS,
  INITIAL_SETTINGS,
} from '../data/seedData';
import { deductStockForOrder, restoreStockForOrder, generateOrderNumber } from '../utils/shopEngine';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  orders: Order[];
  customers: Customer[];
  admins: AdminUser[];
  coupons: Coupon[];
  settings: WebsiteSettings;
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  activeUser: Customer | null;
  activeAdmin: AdminUser | null;
  activityLogs: ActivityLog[];

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => { success: boolean; message: string };
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Wishlist & Compare
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;

  // Orders
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, internalNotes?: string, trackingNumber?: string) => void;
  verifyPayment: (orderId: string, verified: boolean) => void;

  // Product Management (Admin)
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product;
  adjustStock: (productId: string, newStock: number, reason?: string) => void;

  // Category & Brand Management
  addCategory: (categoryData: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brandData: Omit<Brand, 'id'>) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;

  // Coupons
  addCoupon: (couponData: Omit<Coupon, 'id' | 'usageCount'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Customer Auth & Profile
  loginCustomer: (email: string) => boolean;
  registerCustomer: (name: string, email: string, phone: string) => Customer;
  logoutCustomer: () => void;
  updateCustomerProfile: (updates: Partial<Customer>) => void;

  // Admin Auth & Management
  loginAdmin: (email: string, role?: AdminRole) => boolean;
  logoutAdmin: () => void;
  addAdminUser: (userData: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;

  // Settings & System
  updateSettings: (updates: Partial<WebsiteSettings>) => void;
  resetToDemoData: () => void;
  logActivity: (action: string, details: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function getSaved<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`shopwave_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => getSaved('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState<Category[]>(() => getSaved('categories', INITIAL_CATEGORIES));
  const [brands, setBrands] = useState<Brand[]>(() => getSaved('brands', INITIAL_BRANDS));
  const [orders, setOrders] = useState<Order[]>(() => getSaved('orders', INITIAL_ORDERS));
  const [customers, setCustomers] = useState<Customer[]>(() => getSaved('customers', INITIAL_CUSTOMERS));
  const [admins, setAdmins] = useState<AdminUser[]>(() => getSaved('admins', INITIAL_ADMINS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => getSaved('coupons', INITIAL_COUPONS));
  const [settings, setSettings] = useState<WebsiteSettings>(() => getSaved('settings', INITIAL_SETTINGS));
  const [cart, setCart] = useState<CartItem[]>(() => getSaved('cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => getSaved('wishlist', []));
  const [compareList, setCompareList] = useState<string[]>(() => getSaved('compare', []));
  const [activeUser, setActiveUser] = useState<Customer | null>(() => getSaved('activeUser', null));
  const [activeAdmin, setActiveAdmin] = useState<AdminUser | null>(() => getSaved('activeAdmin', null));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => getSaved('logs', [
    {
      id: 'log-1',
      adminName: 'Saif Ahmed (Super Admin)',
      adminEmail: 'admin@shopwave.com',
      action: 'System Initialized',
      details: 'ShopWave electronics store initialized with 20 flagship products and demo orders.',
      timestamp: new Date().toISOString(),
    },
  ]));

  // Auto-save to localStorage
  useEffect(() => { localStorage.setItem('shopwave_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('shopwave_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('shopwave_brands', JSON.stringify(brands)); }, [brands]);
  useEffect(() => { localStorage.setItem('shopwave_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('shopwave_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('shopwave_admins', JSON.stringify(admins)); }, [admins]);
  useEffect(() => { localStorage.setItem('shopwave_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('shopwave_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('shopwave_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('shopwave_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('shopwave_compare', JSON.stringify(compareList)); }, [compareList]);
  useEffect(() => { localStorage.setItem('shopwave_activeUser', JSON.stringify(activeUser)); }, [activeUser]);
  useEffect(() => { localStorage.setItem('shopwave_activeAdmin', JSON.stringify(activeAdmin)); }, [activeAdmin]);
  useEffect(() => { localStorage.setItem('shopwave_logs', JSON.stringify(activityLogs)); }, [activityLogs]);

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminName: activeAdmin ? `${activeAdmin.name} (${activeAdmin.role.replace('_', ' ')})` : 'System Admin',
      adminEmail: activeAdmin ? activeAdmin.email : 'system@shopwave.com',
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    if (product.stock < quantity && !product.allowBackorders) {
      return { success: false, message: `Only ${product.stock} units in stock.` };
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock && !product.allowBackorders) {
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
        }
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: product.salePrice > 0 ? product.salePrice : product.regularPrice,
          regularPrice: product.regularPrice,
          quantity,
          selectedColor: selectedColor || (product.colors.length > 0 ? product.colors[0] : undefined),
          image: product.mainImage,
          maxStock: product.stock,
        },
      ];
    });

    return { success: true, message: `Added ${product.name} to cart.` };
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        // max 4
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Deduct stock for all ordered products
    const { updatedProducts, lowStockAlerts } = deductStockForOrder(
      products,
      orderData.items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
    );
    setProducts(updatedProducts);

    // Update coupon usage count if applied
    if (orderData.couponCode) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.code.toUpperCase() === orderData.couponCode?.toUpperCase()
            ? { ...c, usageCount: c.usageCount + 1 }
            : c
        )
      );
    }

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Update customer total spend & orders if logged in
    if (orderData.customerEmail) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.email.toLowerCase() === orderData.customerEmail.toLowerCase()) {
            return {
              ...cust,
              totalOrders: cust.totalOrders + 1,
              totalSpent: cust.totalSpent + newOrder.totalAmount,
            };
          }
          return cust;
        })
      );
    }

    // Clear cart
    clearCart();

    logActivity(
      'New Order Placed',
      `Order ${newOrder.orderNumber} placed by ${newOrder.customerName} for ৳${newOrder.totalAmount.toLocaleString()} (${newOrder.paymentMethod.toUpperCase()}).`
    );

    if (lowStockAlerts.length > 0) {
      logActivity('Inventory Alert', lowStockAlerts.join(' '));
    }

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    internalNotes?: string,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        // If order was cancelled or returned from active status, restore stock!
        if (
          (status === 'cancelled' || status === 'returned') &&
          ord.orderStatus !== 'cancelled' &&
          ord.orderStatus !== 'returned'
        ) {
          const restored = restoreStockForOrder(
            products,
            ord.items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
          );
          setProducts(restored);
        }

        return {
          ...ord,
          orderStatus: status,
          internalNotes: internalNotes !== undefined ? internalNotes : ord.internalNotes,
          trackingNumber: trackingNumber !== undefined ? trackingNumber : ord.trackingNumber,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    logActivity(
      'Order Status Changed',
      `Order ${orderId} status updated to "${status.toUpperCase()}".`
    );
  };

  const verifyPayment = (orderId: string, verified: boolean) => {
    const paymentStatus: PaymentStatus = verified ? 'verified' : 'failed';
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              paymentStatus,
              orderStatus: verified && ord.orderStatus === 'pending' ? 'confirmed' : ord.orderStatus,
              updatedAt: new Date().toISOString(),
            }
          : ord
      )
    );

    logActivity(
      'Payment Verification',
      `Payment for Order ${orderId} marked as ${paymentStatus.toUpperCase()}.`
    );
  };

  // Products Management
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);

    logActivity(
      'Product Created',
      `Created new product "${newProduct.name}" (SKU: ${newProduct.sku}, Stock: ${newProduct.stock}, ৳${newProduct.salePrice}).`
    );

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );

    logActivity('Product Updated', `Updated product details for ID ${id}.`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    logActivity('Product Deleted', `Deleted product "${prod?.name || id}".`);
  };

  const duplicateProduct = (id: string): Product => {
    const orig = products.find((p) => p.id === id);
    if (!orig) throw new Error('Product not found');

    const copy: Product = {
      ...orig,
      id: `prod-${Date.now()}`,
      name: `${orig.name} (Copy)`,
      slug: `${orig.slug}-copy`,
      sku: `${orig.sku}-CP`,
      visibility: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prev) => [copy, ...prev]);
    logActivity('Product Duplicated', `Duplicated "${orig.name}" as draft copy.`);
    return copy;
  };

  const adjustStock = (productId: string, newStock: number, reason = 'Manual Adjustment') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        let stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
        if (newStock === 0) stockStatus = 'out_of_stock';
        else if (newStock <= p.lowStockThreshold) stockStatus = 'low_stock';

        return {
          ...p,
          stock: newStock,
          stockStatus,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    logActivity('Stock Adjustment', `Adjusted stock for ${productId} to ${newStock} (${reason}).`);
  };

  // Categories
  const addCategory = (data: Omit<Category, 'id'>) => {
    const newCat: Category = { ...data, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, newCat]);
    logActivity('Category Added', `Created category "${newCat.name}".`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Brands
  const addBrand = (data: Omit<Brand, 'id'>) => {
    const newBrand: Brand = { ...data, id: `b-${Date.now()}` };
    setBrands((prev) => [...prev, newBrand]);
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  // Coupons
  const addCoupon = (data: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = { ...data, id: `cpn-${Date.now()}`, usageCount: 0 };
    setCoupons((prev) => [newCoupon, ...prev]);
    logActivity('Coupon Created', `Created coupon code "${newCoupon.code}".`);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // Customer Auth
  const loginCustomer = (email: string): boolean => {
    const customer = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (customer) {
      if (customer.status === 'disabled') {
        return false;
      }
      setActiveUser(customer);
      return true;
    }
    // Auto-create customer if does not exist
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: email.split('@')[0],
      email,
      phone: '+8801700000000',
      status: 'active',
      totalOrders: 0,
      totalSpent: 0,
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setActiveUser(newCustomer);
    return true;
  };

  const registerCustomer = (name: string, email: string, phone: string): Customer => {
    const existing = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setActiveUser(existing);
      return existing;
    }

    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      status: 'active',
      totalOrders: 0,
      totalSpent: 0,
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setActiveUser(newCustomer);
    return newCustomer;
  };

  const logoutCustomer = () => setActiveUser(null);

  const updateCustomerProfile = (updates: Partial<Customer>) => {
    if (!activeUser) return;
    const updated = { ...activeUser, ...updates };
    setActiveUser(updated);
    setCustomers((prev) => prev.map((c) => (c.id === activeUser.id ? updated : c)));
  };

  // Admin Auth & Management
  const loginAdmin = (email: string, role?: AdminRole): boolean => {
    const found = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (found.status === 'inactive') return false;
      const updated = { ...found, lastLogin: new Date().toISOString() };
      setActiveAdmin(updated);
      setAdmins((prev) => prev.map((a) => (a.id === found.id ? updated : a)));
      logActivity('Admin Login', `Admin ${found.name} logged into dashboard.`);
      return true;
    }

    // Demo convenience fallback: if email contains admin or role specified
    const newAdmin: AdminUser = {
      id: `adm-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: role || 'super_admin',
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setAdmins((prev) => [newAdmin, ...prev]);
    setActiveAdmin(newAdmin);
    logActivity('Admin Created & Logged In', `Admin ${newAdmin.name} logged in with role ${newAdmin.role}.`);
    return true;
  };

  const logoutAdmin = () => {
    if (activeAdmin) {
      logActivity('Admin Logout', `Admin ${activeAdmin.name} logged out.`);
    }
    setActiveAdmin(null);
  };

  const addAdminUser = (data: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newAdmin: AdminUser = {
      ...data,
      id: `adm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAdmins((prev) => [...prev, newAdmin]);
    logActivity('Admin User Added', `Added admin ${newAdmin.name} with role ${newAdmin.role}.`);
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAdminUser = (id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  // Settings
  const updateSettings = (updates: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    logActivity('Settings Updated', 'Store configuration and homepage settings updated.');
  };

  // Reset to initial demo store
  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBrands(INITIAL_BRANDS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setAdmins(INITIAL_ADMINS);
    setCoupons(INITIAL_COUPONS);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    setWishlist([]);
    setCompareList([]);
    localStorage.clear();
    logActivity('System Reset', 'All store data reset to clean demonstration baseline.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        brands,
        orders,
        customers,
        admins,
        coupons,
        settings,
        cart,
        wishlist,
        compareList,
        activeUser,
        activeAdmin,
        activityLogs,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        toggleWishlist,
        isInWishlist,
        toggleCompare,
        removeFromCompare,
        isInCompare,

        placeOrder,
        updateOrderStatus,
        verifyPayment,

        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        adjustStock,

        addCategory,
        updateCategory,
        deleteCategory,
        addBrand,
        updateBrand,
        deleteBrand,

        addCoupon,
        updateCoupon,
        deleteCoupon,

        loginCustomer,
        registerCustomer,
        logoutCustomer,
        updateCustomerProfile,

        loginAdmin,
        logoutAdmin,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,

        updateSettings,
        resetToDemoData,
        logActivity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
