import React from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Toast from '../components/Toast';
import { useState } from 'react';

const checkoutSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요.'),
  phone: z.string().min(10, '연락처를 정확히 입력해주세요.'),
  address: z.string().min(5, '주소를 입력해주세요.'),
  detailAddress: z.string().min(2, '상세 주소를 입력해주세요.'),
  paymentMethod: z.string().min(1, '결제 수단을 선택해주세요.')
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({ message: '', isVisible: false });
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card'
    }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Order Data:', data);
    setToast({ message: '주문이 완료되었습니다! (데모)', isVisible: true });
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h1 className="text-4xl font-serif font-bold">Checkout</h1>
        <div className="flex items-center space-x-2 text-primary bg-primary/5 px-4 py-1 rounded-full">
          <Lock size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <Toast 
          message={toast.message} 
          isVisible={toast.isVisible} 
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
        />
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-12">
          {/* Shipping Info */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
              <h2 className="text-2xl font-serif font-bold">배송 정보</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/40">받는 분 성함</label>
                <input 
                  {...register('name')}
                  className="w-full px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                  placeholder="홍길동"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/40">연락처</label>
                <input 
                  {...register('phone')}
                  className="w-full px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                  placeholder="010-0000-0000"
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone.message}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/40">주소</label>
                <div className="flex space-x-4 mb-4">
                  <input 
                    {...register('address')}
                    className="flex-grow px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                    placeholder="기본 주소"
                  />
                  <button type="button" className="px-8 py-4 bg-text text-white font-bold rounded-xl hover:bg-text/90 transition-all text-xs">우편번호 찾기</button>
                </div>
                <input 
                  {...register('detailAddress')}
                  className="w-full px-6 py-4 bg-secondary/5 rounded-xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold"
                  placeholder="상세 주소"
                />
                {(errors.address || errors.detailAddress) && <p className="text-[10px] text-red-500 font-medium">주소를 정확히 입력해주세요.</p>}
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
              <h2 className="text-2xl font-serif font-bold">결제 수단</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'card', label: '신용카드', icon: CreditCard },
                { id: 'kakao', label: '카카오페이', icon: CreditCard },
                { id: 'naver', label: '네이버페이', icon: CreditCard },
                { id: 'bank', label: '무통장입금', icon: CreditCard }
              ].map(method => (
                <label key={method.id} className="cursor-pointer group">
                  <input 
                    type="radio" 
                    {...register('paymentMethod')} 
                    value={method.id} 
                    className="hidden peer"
                  />
                  <div className="flex flex-col items-center p-6 rounded-2xl border-2 border-secondary/5 bg-secondary/5 peer-checked:border-primary peer-checked:bg-primary/5 transition-all space-y-3 group-hover:bg-secondary/10">
                    <method.icon size={24} className="text-text/40 peer-checked:text-primary" />
                    <span className="text-xs font-bold">{method.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-text/5 sticky top-32 space-y-8">
            <h2 className="text-2xl font-serif font-bold">Order Summary</h2>
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex items-center space-x-4">
                  <div className="w-12 h-16 rounded bg-secondary/5 overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-text/40">{item.selectedColor} / {item.quantity}개</p>
                  </div>
                  <p className="text-xs font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-text/10">
              <div className="flex justify-between text-sm">
                <span className="text-text/50">상품 합계</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text/50">배송비</span>
                <span className="font-bold">무료</span>
              </div>
              <div className="pt-6 border-t border-text/10 flex justify-between items-end">
                <span className="font-bold">최종 결제 금액</span>
                <span className="text-3xl font-serif font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center space-x-3"
            >
              <span>{formatPrice(totalPrice)} 결제하기</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex flex-col items-center space-y-4 pt-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-text/30">
                <ShieldCheck size={14} />
                <span>개인정보 보호 및 보안 결제 적용</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
