import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product, ProductSpec, ProductVisibility } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const AdminAddProductModal: React.FC<AdminAddProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const { addProduct, updateProduct, categories, brands } = useStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Smartphones');
  const [brand, setBrand] = useState(brands[0]?.name || 'Apple');
  const [productType, setProductType] = useState('Electronics');

  // Pricing
  const [regularPrice, setRegularPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [purchaseCost, setPurchaseCost] = useState<number>(0);

  // Inventory
  const [stock, setStock] = useState<number>(10);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(3);
  const [allowBackorders, setAllowBackorders] = useState<boolean>(false);

  // Images
  const [mainImage, setMainImage] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Variations & Specs
  const [colorsInput, setColorsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [warranty, setWarranty] = useState('1 Year Official Warranty');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');

  const [specifications, setSpecifications] = useState<ProductSpec[]>([
    { label: 'Processor', value: '' },
    { label: 'Display', value: '' },
    { label: 'Battery', value: '' },
  ]);

  // Visibility & flags
  const [visibility, setVisibility] = useState<ProductVisibility>('published');
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(true);
  const [isFlashSale, setIsFlashSale] = useState<boolean>(false);

  // Auto calculate discount percentage
  const discountPercentage =
    regularPrice > 0 && salePrice > 0 && regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setSlug(productToEdit.slug);
      setSku(productToEdit.sku);
      setShortDescription(productToEdit.shortDescription);
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setBrand(productToEdit.brand);
      setProductType(productToEdit.productType || 'Electronics');
      setRegularPrice(productToEdit.regularPrice);
      setSalePrice(productToEdit.salePrice);
      setPurchaseCost(productToEdit.purchaseCost);
      setStock(productToEdit.stock);
      setLowStockThreshold(productToEdit.lowStockThreshold);
      setAllowBackorders(productToEdit.allowBackorders);
      setMainImage(productToEdit.mainImage);
      setGalleryImages(productToEdit.galleryImages || []);
      setColorsInput(productToEdit.colors.join(', '));
      setTagsInput(productToEdit.tags.join(', '));
      setWarranty(productToEdit.warranty);
      setWeight(productToEdit.weight || '');
      setDimensions(productToEdit.dimensions || '');
      setSpecifications(
        productToEdit.specifications.length > 0
          ? productToEdit.specifications
          : [{ label: 'Processor', value: '' }]
      );
      setVisibility(productToEdit.visibility);
      setIsFeatured(productToEdit.isFeatured);
      setIsBestSeller(productToEdit.isBestSeller);
      setIsNewArrival(productToEdit.isNewArrival);
      setIsFlashSale(productToEdit.isFlashSale);
    } else {
      // Default new product template
      setName('');
      setSlug('');
      setSku(`SW-${Math.floor(1000 + Math.random() * 9000)}`);
      setShortDescription('');
      setDescription('');
      setRegularPrice(50000);
      setSalePrice(47500);
      setPurchaseCost(42000);
      setStock(15);
      setLowStockThreshold(4);
      setAllowBackorders(false);
      setMainImage('https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80');
      setGalleryImages([]);
      setColorsInput('Space Gray, Silver, Black');
      setTagsInput('Flagship, Premium, Wireless');
      setWarranty('1 Year Official Brand Warranty');
      setSpecifications([
        { label: 'Display', value: '6.7-inch OLED 120Hz' },
        { label: 'Processor', value: 'High-Performance 4nm Silicon' },
        { label: 'Battery', value: 'All-Day Endurance, Fast Charge' },
      ]);
      setVisibility('published');
      setIsFeatured(true);
      setIsBestSeller(false);
      setIsNewArrival(true);
      setIsFlashSale(false);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Auto-generate slug when name changes
  const handleNameChange = (val: string) => {
    setName(val);
    if (!productToEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleAddSpec = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const handleUpdateSpec = (idx: number, field: 'label' | 'value', val: string) => {
    const updated = [...specifications];
    updated[idx][field] = val;
    setSpecifications(updated);
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecifications(specifications.filter((_, i) => i !== idx));
  };

  const handleAddGalleryImage = () => {
    if (galleryInput.trim() && !galleryImages.includes(galleryInput.trim())) {
      setGalleryImages([...galleryImages, galleryInput.trim()]);
      setGalleryInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim() || !mainImage.trim()) {
      alert('Please fill product name, SKU, and main image.');
      return;
    }

    const colors = colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (stock === 0) stockStatus = 'out_of_stock';
    else if (stock <= lowStockThreshold) stockStatus = 'low_stock';

    const cleanSpecs = specifications.filter((s) => s.label.trim() && s.value.trim());

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        sku,
        shortDescription,
        description,
        category,
        brand,
        productType,
        regularPrice: Number(regularPrice),
        salePrice: Number(salePrice),
        discountPercentage,
        purchaseCost: Number(purchaseCost),
        stock: Number(stock),
        stockStatus,
        lowStockThreshold: Number(lowStockThreshold),
        allowBackorders,
        mainImage,
        galleryImages,
        specifications: cleanSpecs,
        colors,
        tags,
        warranty,
        weight,
        dimensions,
        visibility,
        isFeatured,
        isBestSeller,
        isNewArrival,
        isFlashSale,
      });
    } else {
      addProduct({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        sku,
        shortDescription,
        description,
        category,
        brand,
        productType,
        regularPrice: Number(regularPrice),
        salePrice: Number(salePrice),
        discountPercentage,
        purchaseCost: Number(purchaseCost),
        stock: Number(stock),
        stockStatus,
        lowStockThreshold: Number(lowStockThreshold),
        allowBackorders,
        mainImage,
        galleryImages,
        specifications: cleanSpecs,
        colors,
        tags,
        warranty,
        weight,
        dimensions,
        visibility,
        isFeatured,
        isBestSeller,
        isNewArrival,
        isFlashSale,
        rating: 5.0,
        reviewCount: 0,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {productToEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Newly created products will immediately appear on the storefront catalog and be purchasable by customers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apple MacBook Air 15-inch M3 (16GB RAM, 512GB SSD)"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Product Slug</label>
                <input
                  type="text"
                  placeholder="apple-macbook-air-15-m3"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">SKU (Unique Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="APL-MBA15-M3"
                  value={sku}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Brand *</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1">Short Summary (Shown in card / preview)</label>
                <input
                  type="text"
                  placeholder="Ultra-lightweight M3 laptop with Liquid Retina display and 18-hour battery."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive description of hardware architecture, display technology, and acoustic performance."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Pricing & Inventory (BDT ৳)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Regular Price (৳) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Sale / Selling Price (৳) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums font-bold text-[#168DE2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Calculated Discount</label>
                <div className="p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-emerald-600">
                  {discountPercentage}% Off
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Purchase Cost (Admin Only)</label>
                <input
                  type="number"
                  min="0"
                  value={purchaseCost}
                  onChange={(e) => setPurchaseCost(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Available Stock *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Low Stock Threshold</label>
                <input
                  type="number"
                  min="1"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums"
                />
              </div>

              <div className="sm:col-span-2 flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={allowBackorders}
                    onChange={(e) => setAllowBackorders(e.target.checked)}
                    className="rounded text-[#168DE2]"
                  />
                  <span>Allow Backorders (Can order even when stock is 0)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Product Imagery */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              3. Product Imagery
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1">Main Product Image URL *</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="flex-1 p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
              {mainImage && (
                <div className="mt-2 w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border">
                  <img src={mainImage} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Add Additional Gallery Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste additional angle URL..."
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  className="flex-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                >
                  Add Image
                </button>
              </div>
              {galleryImages.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg bg-slate-100 p-1 border">
                      <img src={img} alt="" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setGalleryImages(galleryImages.filter((_, idx) => idx !== i))}
                        className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Specifications & Variations */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                4. Specifications & Variations
              </h3>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-xs text-[#168DE2] font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Specification</span>
              </button>
            </div>

            <div className="space-y-2">
              {specifications.map((spec, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Specification Name (e.g. Battery)"
                    value={spec.label}
                    onChange={(e) => handleUpdateSpec(idx, 'label', e.target.value)}
                    className="w-1/3 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 5000mAh, 65W Turbo Charging)"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                    className="flex-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold mb-1">Color Finishes (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Space Gray, Silver, Midnight Blue"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Flagship, 5G, Apple, OLED"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Warranty Term</label>
                <input
                  type="text"
                  placeholder="1 Year Official Brand Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Weight & Dimensions</label>
                <input
                  type="text"
                  placeholder="e.g. 227g · 163 x 77.6 x 8.25 mm"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Visibility & Promotional Flags */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              5. Storefront Placement & Visibility
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#168DE2]"
                />
                <span>Featured Product</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFlashSale}
                  onChange={(e) => setIsFlashSale(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Flash Sale</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="rounded text-rose-500"
                />
                <span>Best Seller</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="rounded text-[#15C8D9]"
                />
                <span>New Arrival</span>
              </label>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold mb-1">Status</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as ProductVisibility)}
                className="w-full sm:w-60 p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <option value="published">Published (Visible on store immediately)</option>
                <option value="draft">Draft (Saved in catalog only)</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-900 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              {productToEdit ? 'Save Changes' : 'Publish to Storefront'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
