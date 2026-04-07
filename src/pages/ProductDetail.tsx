import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Maximize2, 
  Info,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const orderSchema = z.object({
  width: z.number().min(50, '최소 50cm 이상 입력해주세요.').max(1000, '최대 1000cm까지 가능합니다.'),
  height: z.number().min(50, '최소 50cm 이상 입력해주세요.').max(300, '최대 300cm까지 가능합니다.'),
  color: z.string().min(1, '색상을 선택해주세요.'),
  quantity: z.number().min(1)
});

type OrderFormValues = z.infer<typeof orderSchema>;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [step, setStep] = useState(1); // 1: Color, 2: Dimensions, 3: Summary
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      width: 100,
      height: 230,
      quantity: 1
    }
  });

  const width = watch('width');
  const height = watch('height');
  const quantity = watch('quantity');

  // Calculate price based on dimensions (simple logic for demo)
  const basePrice = product?.price || 0;
  const areaPrice = (width * height) / 10000 * 5000; // 5000 KRW per sqm
  const totalPrice = (basePrice + areaPrice) * quantity;

  if (!product) return <div className="py-40 text-center">Product not found</div>;

  const onSubmit = (data: OrderFormValues) => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart({
        ...product,
        quantity: data.quantity,
        selectedColor: data.color,
        customDimensions: {
          width: data.width,
          height: data.height
        }
      });
      setIsAdding(false);
      // Show success or navigate to cart
      if (confirm('장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
        navigate('/cart');
      }
    }, 800);
  };

  const nextStep = () => {
    if (step === 1 && !selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-text/50 uppercase tracking-widest mb-10">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-text font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/5 relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all">
              <Maximize2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  activeImage === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Order Form */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">{product.category}</span>
                <h1 className="text-4xl font-serif font-bold">{product.name}</h1>
              </div>
              <button className="p-3 border border-text/10 rounded-full hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all">
                <Heart size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-serif font-bold text-primary">{formatPrice(product.price)}~</p>
              <div className="flex items-center text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm font-bold text-text">4.9</span>
                <span className="ml-1 text-xs text-text/40">(128 reviews)</span>
              </div>
            </div>
            <p className="text-text/70 leading-relaxed">{product.description}</p>
          </div>

          {/* Custom Order Stepper */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-text/5 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      step >= i ? "bg-primary text-white" : "bg-secondary/10 text-secondary"
                    )}>
                      {step > i ? <Check size={14} /> : i}
                    </div>
                    {i < 3 && <div className={cn("w-8 h-px mx-2", step > i ? "bg-primary" : "bg-secondary/20")} />}
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-text/40">
                {step === 1 ? 'Color Selection' : step === 2 ? 'Dimensions' : 'Final Check'}
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Color */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="font-serif font-bold text-lg">원하시는 색상을 선택해주세요.</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color.name);
                          setValue('color', color.name);
                        }}
                        className={cn(
                          "flex flex-col items-center p-4 rounded-xl border-2 transition-all space-y-3",
                          selectedColor === color.name ? "border-primary bg-primary/5" : "border-transparent bg-secondary/5 hover:bg-secondary/10"
                        )}
                      >
                        <div className="w-10 h-10 rounded-full shadow-inner border border-white/20" style={{ backgroundColor: color.hex }} />
                        <span className="text-xs font-medium">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Dimensions */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-lg">맞춤 사이즈를 입력해주세요.</h3>
                    <button type="button" className="text-xs font-bold text-primary flex items-center space-x-1 border-b border-primary">
                      <Info size={12} />
                      <span>측정 가이드 보기</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-text/50">가로 길이 (cm)</label>
                      <div className="relative">
                        <input 
                          {...register('width', { valueAsNumber: true })}
                          type="number" 
                          className="w-full px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-text/30">cm</span>
                      </div>
                      {errors.width && <p className="text-[10px] text-red-500 font-medium">{errors.width.message}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-text/50">세로 길이 (cm)</label>
                      <div className="relative">
                        <input 
                          {...register('height', { valueAsNumber: true })}
                          type="number" 
                          className="w-full px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-text/30">cm</span>
                      </div>
                      {errors.height && <p className="text-[10px] text-red-500 font-medium">{errors.height.message}</p>}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-xl flex items-start space-x-3">
                    <Info size={16} className="text-primary mt-0.5" />
                    <p className="text-xs text-primary/80 leading-relaxed">
                      커튼 박스 안쪽부터 바닥까지의 길이를 측정해주세요. <br />
                      가로 길이는 창문 너비의 1.5~2배를 추천드립니다.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Summary */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="font-serif font-bold text-lg">주문 내용을 확인해주세요.</h3>
                  <div className="space-y-4 bg-secondary/5 p-6 rounded-xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-text/50">선택 색상</span>
                      <span className="font-bold">{selectedColor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text/50">맞춤 사이즈</span>
                      <span className="font-bold">{width}cm x {height}cm</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-text/10">
                      <span className="text-text/50">수량</span>
                      <div className="flex items-center space-x-4">
                        <button 
                          type="button"
                          onClick={() => setValue('quantity', Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-full border border-text/10 flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-4 text-center">{quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setValue('quantity', quantity + 1)}
                          className="w-8 h-8 rounded-full border border-text/10 flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex space-x-4 pt-4">
                {step > 1 && (
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/5 transition-all flex items-center justify-center space-x-2"
                  >
                    <ChevronLeft size={18} />
                    <span>이전</span>
                  </button>
                )}
                {step < 3 ? (
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>다음 단계</span>
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    disabled={isAdding}
                    className="flex-[2] py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {isAdding ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>장바구니 담기</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Real-time Price Display */}
            <div className="pt-8 border-t border-text/10 flex justify-between items-end">
              <span className="text-sm font-bold text-text/40">예상 결제 금액</span>
              <div className="text-right">
                <p className="text-3xl font-serif font-bold text-primary">{formatPrice(totalPrice)}</p>
                <p className="text-[10px] text-text/40 mt-1">* 사이즈 및 수량에 따라 변동될 수 있습니다.</p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">1년 무상 A/S</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                <Truck size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">맞춤 제작 배송</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
                <RotateCcw size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">안심 환불 보장</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Info Tabs */}
      <section className="mt-32">
        <div className="flex justify-center border-b border-text/10 mb-16">
          {['Product Details', 'Reviews', 'Shipping & Returns'].map(tab => (
            <button 
              key={tab}
              className="px-10 py-6 text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:text-primary transition-all"
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Detail Content */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold">Natural Texture & Quality</h2>
              <p className="text-text/70">병남 홈패션만의 엄격한 기준으로 선별된 프리미엄 소재입니다.</p>
            </div>
            <img src="https://picsum.photos/seed/detail-1/1200/800" alt="Detail 1" className="rounded-2xl w-full" referrerPolicy="no-referrer" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold">완벽한 암막, <br /> 쾌적한 공간의 시작</h3>
                <p className="text-text/70 leading-relaxed">
                  3중 직조 공법으로 제작되어 빛 차단율 99%를 자랑합니다. 
                  여름에는 열기를 차단하고 겨울에는 냉기를 막아주어 에너지 효율까지 생각했습니다.
                </p>
              </div>
              <img src="https://picsum.photos/seed/detail-2/600/600" alt="Detail 2" className="rounded-2xl w-full" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-12 pt-20 border-t border-text/10">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-serif font-bold">Customer Reviews</h2>
              <button className="text-sm font-bold text-primary border-b border-primary">Write a Review</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {REVIEWS.filter(r => r.productId === id).map(review => (
                <div key={review.id} className="bg-secondary/5 p-8 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-text/40">{review.date}</span>
                  </div>
                  <p className="text-sm font-medium italic">"{review.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      {review.userName[0]}
                    </div>
                    <span className="text-xs font-bold">{review.userName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
