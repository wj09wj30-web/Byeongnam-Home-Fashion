import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative flex flex-col space-y-4"
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary/5">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isBest && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Best</span>
          )}
          {product.isNew && (
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">New</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-3 bg-white text-text rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button className="p-3 bg-white text-text rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
            <ShoppingBag size={18} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col space-y-1">
        <p className="text-xs text-text/50 uppercase tracking-widest">{product.category}</p>
        <Link to={`/product/${product.id}`} className="text-base font-medium hover:text-primary transition-colors">
          {product.name}
        </Link>
        <p className="text-sm font-serif font-bold">{formatPrice(product.price)}</p>
      </div>

      {/* Color Dots */}
      <div className="flex space-x-1.5">
        {product.colors.map(color => (
          <div 
            key={color.name}
            title={color.name}
            className="w-3 h-3 rounded-full border border-text/10"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
