import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto w-full text-center space-y-8">
        <div className="w-24 h-24 bg-secondary/5 rounded-full flex items-center justify-center mx-auto text-secondary/30">
          <ShoppingBag size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold">장바구니가 비어있습니다.</h1>
          <p className="text-text/50">병남의 감성적인 제품들로 공간을 채워보세요.</p>
        </div>
        <Link 
          to="/shop" 
          className="inline-flex items-center space-x-3 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl"
        >
          <span>쇼핑하러 가기</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-bold">Shopping Cart</h1>
        <span className="text-sm font-bold text-text/40">{totalItems} Items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedColor}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-6 p-6 bg-white rounded-2xl border border-text/5 shadow-sm group"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif font-bold text-lg hover:text-primary transition-colors">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="text-xs text-text/50 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedColor)}
                      className="p-2 text-text/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-text/70">
                    <div className="flex items-center space-x-2">
                      <span className="text-text/30">Color:</span>
                      <span className="font-bold">{item.selectedColor}</span>
                    </div>
                    {item.customDimensions && (
                      <div className="flex items-center space-x-2">
                        <span className="text-text/30">Size:</span>
                        <span className="font-bold">{item.customDimensions.width}x{item.customDimensions.height}cm</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="flex items-center space-x-4 bg-secondary/5 px-4 py-2 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                        className="text-text/40 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                        className="text-text/40 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-lg font-serif font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/shop" className="inline-flex items-center space-x-2 text-sm font-bold text-text/40 hover:text-primary transition-colors">
            <ChevronLeft size={18} />
            <span>쇼핑 계속하기</span>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-text/5 sticky top-32 space-y-8">
            <h2 className="text-2xl font-serif font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text/50">상품 금액</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text/50">배송비</span>
                <span className="font-bold">무료</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text/50">할인 금액</span>
                <span className="font-bold text-red-500">- {formatPrice(0)}</span>
              </div>
              <div className="pt-6 border-t border-text/10 flex justify-between items-end">
                <span className="font-bold">최종 결제 금액</span>
                <span className="text-3xl font-serif font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center space-x-3"
              >
                <span>주문하기</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-[10px] text-center text-text/40">
                맞춤 제작 상품의 경우 제작 시작 후 취소가 어려울 수 있습니다. <br />
                주문 내용을 다시 한번 확인해주세요.
              </p>
            </div>

            {/* Benefits */}
            <div className="pt-8 border-t border-text/10 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-bold text-secondary">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-[10px]">P</span>
                </div>
                <span>구매 시 {Math.floor(totalPrice * 0.01).toLocaleString()}P 적립 예정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
