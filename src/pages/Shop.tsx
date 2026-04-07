import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['curtain', 'bedding', 'accessory'];
  const materials = ['린넨', '순면 100%', '광목', '벨벳', '폴리에스테르'];
  const features = ['암막', '방한', '세탁 용이', '항균', '통기성', '먼지 적음'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedMaterials.length > 0) {
      result = result.filter(p => p.materials.some(m => selectedMaterials.includes(m)));
    }

    if (selectedFeatures.length > 0) {
      result = result.filter(p => p.features.some(f => selectedFeatures.includes(f)));
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (a.isNew ? -1 : 1));

    return result;
  }, [selectedCategory, selectedMaterials, selectedFeatures, sortBy]);

  const toggleMaterial = (m: string) => {
    setSelectedMaterials(prev => prev.includes(m) ? prev.filter(item => item !== m) : [...prev, m]);
  };

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(item => item !== f) : [...prev, f]);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedMaterials([]);
    setSelectedFeatures([]);
    setSearchParams({});
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
        <div className="space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">Collections</span>
          <h1 className="text-5xl font-serif font-bold">
            {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Shop All'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all font-bold text-sm",
              isFilterOpen ? "bg-primary text-white border-primary" : "border-text/10 hover:border-primary hover:text-primary"
            )}
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
            {(selectedMaterials.length + selectedFeatures.length + (selectedCategory ? 1 : 0)) > 0 && (
              <span className="ml-2 bg-white text-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                {selectedMaterials.length + selectedFeatures.length + (selectedCategory ? 1 : 0)}
              </span>
            )}
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 border-text/10 font-bold text-sm hover:border-primary hover:text-primary transition-all">
              <span>Sort By</span>
              <ChevronDown size={18} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-text/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden">
              {[
                { label: 'Newest', value: 'newest' },
                { label: 'Price: Low to High', value: 'price-low' },
                { label: 'Price: High to Low', value: 'price-high' }
              ].map(option => (
                <button 
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={cn(
                    "w-full text-left px-6 py-4 text-sm hover:bg-secondary/5 transition-colors",
                    sortBy === option.value ? "text-primary font-bold" : "text-text/70"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar/Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-text/5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {/* Categories */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text/40">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all border-2",
                        selectedCategory === cat ? "bg-primary text-white border-primary" : "bg-secondary/5 border-transparent hover:bg-secondary/10"
                      )}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text/40">Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {materials.map(m => (
                    <button 
                      key={m}
                      onClick={() => toggleMaterial(m)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all border-2",
                        selectedMaterials.includes(m) ? "bg-primary text-white border-primary" : "bg-secondary/5 border-transparent hover:bg-secondary/10"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text/40">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {features.map(f => (
                    <button 
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all border-2",
                        selectedFeatures.includes(f) ? "bg-primary text-white border-primary" : "bg-secondary/5 border-transparent hover:bg-secondary/10"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-end space-y-4">
                <button 
                  onClick={clearFilters}
                  className="flex items-center justify-center space-x-2 text-xs font-bold text-text/40 hover:text-primary transition-colors"
                >
                  <X size={14} />
                  <span>Clear All Filters</span>
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-text text-white font-bold rounded-full hover:bg-text/90 transition-all text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center space-y-6">
          <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto text-secondary/40">
            <Filter size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold">No products found</h3>
            <p className="text-text/50">Try adjusting your filters or clear them to see all products.</p>
          </div>
          <button 
            onClick={clearFilters}
            className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
