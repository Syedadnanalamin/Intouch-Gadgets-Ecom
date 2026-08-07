"use client";

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/shared/product-card/ProductCard';
import { useCart } from '@/context/CartContext';
import { LayoutCells, LayoutList, ChevronDown, ShoppingCart } from '@gravity-ui/icons';

export default function ProductListContainer({ initialProducts, categories }) {
  const { addToCart } = useCart();

  // Extract brand name from title dynamically
  const getProductBrand = (title) => {
    return title.split(' ')[0] || "Unknown";
  };

  // Associate category names to products based on categoryId
  const productsWithCategory = useMemo(() => {
    return initialProducts.map(product => {
      const category = categories.find(c => c.id === product.categoryId);
      return {
        ...product,
        categoryName: category ? category.name : "Solar & Green Energy", // Default fallback if not found
        brandName: getProductBrand(product.title)
      };
    });
  }, [initialProducts, categories]);

  // Unique list of categories and brands for filter options
  const categoryOptions = useMemo(() => {
    const names = new Set(productsWithCategory.map(p => p.categoryName));
    return ["All Categories", ...Array.from(names)];
  }, [productsWithCategory]);

  const brandOptions = useMemo(() => {
    const names = new Set(productsWithCategory.map(p => p.brandName));
    return ["All Brands", ...Array.from(names)];
  }, [productsWithCategory]);

  // STAGED Filters (Only applied when user clicks "Apply Filters")
  const [stagedSearch, setStagedSearch] = useState('');
  const [stagedCategory, setStagedCategory] = useState('All Categories');
  const [stagedMinPrice, setStagedMinPrice] = useState('');
  const [stagedMaxPrice, setStagedMaxPrice] = useState('');
  const [stagedBrand, setStagedBrand] = useState('All Brands');
  const [stagedOnSale, setStagedOnSale] = useState(false);

  // ACTIVE Filters (used for filtering the list)
  const [activeSearch, setActiveSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeMinPrice, setActiveMinPrice] = useState('');
  const [activeMaxPrice, setActiveMaxPrice] = useState('');
  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [activeOnSale, setActiveOnSale] = useState(false);

  // Toolbar & Sorting States
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [columnCount, setColumnCount] = useState(5); // 4, 5, or 6 cols
  const [sortField, setSortField] = useState('name'); // 'name' or 'price'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const handleApplyFilters = () => {
    setActiveSearch(stagedSearch);
    setActiveCategory(stagedCategory);
    setActiveMinPrice(stagedMinPrice);
    setActiveMaxPrice(stagedMaxPrice);
    setActiveBrand(stagedBrand);
    setActiveOnSale(stagedOnSale);
  };

  const handleClearFilters = () => {
    setStagedSearch('');
    setStagedCategory('All Categories');
    setStagedMinPrice('');
    setStagedMaxPrice('');
    setStagedBrand('All Brands');
    setStagedOnSale(false);

    setActiveSearch('');
    setActiveCategory('All Categories');
    setActiveMinPrice('');
    setActiveMaxPrice('');
    setActiveBrand('All Brands');
    setActiveOnSale(false);
  };

  // Filter and Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsWithCategory];

    // 1. Search filter
    if (activeSearch.trim()) {
      const q = activeSearch.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (activeCategory !== 'All Categories') {
      result = result.filter(p => p.categoryName === activeCategory);
    }

    // 3. Brand filter
    if (activeBrand !== 'All Brands') {
      result = result.filter(p => p.brandName === activeBrand);
    }

    // 4. Price filters
    if (activeMinPrice !== '') {
      result = result.filter(p => p.price >= parseFloat(activeMinPrice));
    }
    if (activeMaxPrice !== '') {
      result = result.filter(p => p.price <= parseFloat(activeMaxPrice));
    }

    // 5. On Sale filter
    if (activeOnSale) {
      result = result.filter(p => p.originalPrice > p.price);
    }

    // 6. Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [productsWithCategory, activeSearch, activeCategory, activeBrand, activeMinPrice, activeMaxPrice, activeOnSale, sortField, sortDirection]);

  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  // Grid columns class mapping
  const gridColumnsClass = {
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6'
  }[columnCount];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start select-none">
      
      {/* 1. Left Sidebar Filters Card */}
      <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex-shrink-0">
        <h2 className="text-[#0c1f3c] text-base font-extrabold pb-3.5 border-b border-gray-100 mb-5">
          Filters
        </h2>

        <div className="space-y-4 text-xs font-semibold text-gray-700">
          
          {/* Search */}
          <div>
            <label className="block text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Search</label>
            <input
              type="text"
              value={stagedSearch}
              onChange={(e) => setStagedSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 bg-[#f8fafc] rounded focus:outline-none focus:border-[#0e52b2] focus:bg-white text-xs transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Category</label>
            <div className="relative">
              <select
                value={stagedCategory}
                onChange={(e) => setStagedCategory(e.target.value)}
                className="w-full pl-3 pr-8 py-2 border border-gray-300 bg-[#f8fafc] rounded focus:outline-none focus:border-[#0e52b2] focus:bg-white text-xs appearance-none transition-colors"
              >
                {categoryOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Price Range inputs */}
          <div>
            <label className="block text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stagedMinPrice}
                onChange={(e) => setStagedMinPrice(e.target.value)}
                placeholder="Min ৳"
                className="w-full px-2 py-1.5 border border-gray-300 bg-[#f8fafc] rounded focus:outline-none focus:border-[#0e52b2] text-xs"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={stagedMaxPrice}
                onChange={(e) => setStagedMaxPrice(e.target.value)}
                placeholder="Max ৳"
                className="w-full px-2 py-1.5 border border-gray-300 bg-[#f8fafc] rounded focus:outline-none focus:border-[#0e52b2] text-xs"
              />
            </div>
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block text-gray-500 mb-1.5 font-bold uppercase tracking-wider">Brand</label>
            <div className="relative">
              <select
                value={stagedBrand}
                onChange={(e) => setStagedBrand(e.target.value)}
                className="w-full pl-3 pr-8 py-2 border border-gray-300 bg-[#f8fafc] rounded focus:outline-none focus:border-[#0e52b2] focus:bg-white text-xs appearance-none transition-colors"
              >
                {brandOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* On Sale Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer pt-1 select-none">
            <input
              type="checkbox"
              checked={stagedOnSale}
              onChange={(e) => setStagedOnSale(e.target.checked)}
              className="rounded text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
            />
            <span className="text-gray-700">On Sale Only</span>
          </label>

          {/* Action Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold py-2 px-4 rounded transition-colors shadow-sm"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full text-center text-gray-400 hover:text-gray-600 transition-colors py-1 text-[11px]"
            >
              Clear Filters
            </button>
          </div>

        </div>
      </div>

      {/* 2. Right Side: Products Grid Toolbar and Items */}
      <div className="flex-1 w-full space-y-6">
        
        {/* Sorting and Layout View Toolbar */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap gap-4 items-center justify-between shadow-sm select-none text-xs font-semibold text-gray-600">
          
          {/* View Toggles & Column Selectors */}
          <div className="flex items-center gap-4">
            
            {/* Grid vs List view buttons */}
            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 transition-colors ${viewType === 'grid' ? 'bg-[#0e52b2] text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                title="Grid View"
              >
                <LayoutCells className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 transition-colors ${viewType === 'list' ? 'bg-[#0e52b2] text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                title="List View"
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            {/* Column togglers: visible only in Grid View */}
            {viewType === 'grid' && (
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-gray-400">Columns:</span>
                {[4, 5, 6].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setColumnCount(cols)}
                    className={`border rounded px-2.5 py-1 transition-all ${columnCount === cols ? 'border-[#0e52b2] bg-blue-50/20 text-[#0e52b2] font-black' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Sort Selectors Dropdowns */}
          <div className="flex items-center gap-2">
            
            {/* Sort Field */}
            <div className="relative">
              <select
                value={sortField}
                onChange={(e) => {
                  setSortField(e.target.value);
                  // Update default direction to match field type
                  setSortDirection(e.target.value === 'price' ? 'asc' : 'asc');
                }}
                className="pl-3 pr-8 py-1.5 border border-gray-300 bg-white rounded focus:outline-none focus:border-[#0e52b2] appearance-none text-xs"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Order Direction */}
            <div className="relative">
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-gray-300 bg-white rounded focus:outline-none focus:border-[#0e52b2] appearance-none text-xs"
              >
                {sortField === 'name' ? (
                  <>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                  </>
                ) : (
                  <>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </>
                )}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Display Item Count Summary */}
        <div className="text-xs text-gray-400 font-semibold pl-1">
          Showing {filteredAndSortedProducts.length} of {productsWithCategory.length} products
        </div>

        {/* Product Cards Grid or Row Rows List */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No products match your filters</h3>
            <p className="text-xs text-gray-400 max-w-[280px] mx-auto leading-relaxed">
              Try adjusting your search criteria, price boundaries, or clearing the filter card.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-6 bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold text-xs py-2 px-6 rounded transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewType === 'grid' ? (
          /* 2a. Grid view layout */
          <div className={`grid ${gridColumnsClass} gap-4`}>
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* 2b. List view layout (Horizontal cards) */
          <div className="space-y-3">
            {filteredAndSortedProducts.map((product) => {
              const discountPercent = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow relative"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 border border-gray-100 rounded p-1 flex items-center justify-center bg-white overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    <img src={product.image} alt={product.title} className="object-contain max-h-full max-w-full" />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-[#0e52b2] font-extrabold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                        {product.brandName}
                      </span>
                      <h3 className="text-gray-800 font-bold text-sm sm:text-base leading-snug mt-1.5 hover:text-[#0e52b2] transition-colors">
                        <Link href={`/product/${product.id}`}>{product.title}</Link>
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium mt-1">
                        Category: {product.categoryName}
                      </p>
                    </div>

                    {/* Stock badge */}
                    <div className="mt-2 select-none">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full 
                        ${product.inStock 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-red-50 text-red-600'}`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action button */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 sm:pl-4 sm:border-l sm:border-gray-100 w-full sm:w-36 gap-2">
                    
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[#0e52b2] font-black text-base">
                          ৳{formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-400 text-xs line-through">
                            ৳{formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded mt-0.5 inline-block">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`py-2 px-4 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all select-none
                        ${product.inStock 
                          ? 'bg-[#0e52b2] hover:bg-[#0b3d87] text-white hover:shadow-sm active:scale-[0.98]' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
