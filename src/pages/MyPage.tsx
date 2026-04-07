import React from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  ChevronRight, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Gift, 
  Star,
  LogOut
} from 'lucide-react';

const MyPage = () => {
  const user = {
    name: '김병남',
    email: 'byeongnam@example.com',
    level: 'Gold Member',
    points: 12500,
    coupons: 3
  };

  const orders = [
    {
      id: 'ORD-20240320-001',
      date: '2024-03-20',
      status: 'shipping',
      items: ['내추럴 린넨 암막 커튼'],
      total: 128000
    }
  ];

  const deliverySteps = [
    { label: '결제완료', icon: CreditCard, active: true },
    { label: '상품준비', icon: Clock, active: true },
    { label: '배송중', icon: Truck, active: true },
    { label: '배송완료', icon: CheckCircle2, active: false }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={48} />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold">{user.name}님</h2>
              <p className="text-xs text-text/40 font-bold uppercase tracking-widest">{user.level}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { label: '주문/배송 조회', icon: Package, active: true },
              { label: '포인트/쿠폰', icon: Gift },
              { label: '관심 상품', icon: Star },
              { label: '정보 수정', icon: Settings },
              { label: '로그아웃', icon: LogOut, color: 'text-red-500' }
            ].map(item => (
              <button 
                key={item.label}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all",
                  item.active ? "bg-primary text-white shadow-lg" : "hover:bg-secondary/5 text-text/70"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={18} className={item.color} />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                <ChevronRight size={16} className={item.active ? "opacity-100" : "opacity-20"} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-12">
          {/* Membership Dashboard */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-text/5 flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-text/40 uppercase tracking-widest">My Points</span>
              <div className="mt-4 flex items-baseline space-x-1">
                <span className="text-3xl font-serif font-bold text-primary">{user.points.toLocaleString()}</span>
                <span className="text-xs font-bold text-text/40">P</span>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-text/5 flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-text/40 uppercase tracking-widest">Coupons</span>
              <div className="mt-4 flex items-baseline space-x-1">
                <span className="text-3xl font-serif font-bold text-primary">{user.coupons}</span>
                <span className="text-xs font-bold text-text/40">장</span>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-primary p-8 rounded-2xl shadow-lg flex flex-col justify-between text-white"
            >
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Next Level</span>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-bold">VIP 등급까지 52,000원 남음</p>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Recent Orders & Tracking */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-serif font-bold">최근 주문 내역</h3>
              <button className="text-xs font-bold text-primary border-b border-primary">전체 보기</button>
            </div>

            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-text/5 shadow-sm overflow-hidden">
                <div className="bg-secondary/5 p-6 flex justify-between items-center border-b border-text/5">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-text/40">{order.date}</span>
                    <span className="text-xs font-bold text-primary">{order.id}</span>
                  </div>
                  <button className="text-xs font-bold text-text/40 hover:text-primary transition-colors">주문 상세</button>
                </div>
                <div className="p-8 space-y-10">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-24 bg-secondary/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="https://picsum.photos/seed/curtain1/200/300" alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-lg">{order.items[0]}</h4>
                      <p className="text-sm font-bold text-primary">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  {/* Delivery Tracking Indicator */}
                  <div className="relative pt-10 pb-4">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary/10 -translate-y-1/2" />
                    <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-primary -translate-y-1/2" />
                    
                    <div className="relative flex justify-between items-center">
                      {deliverySteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-4">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all z-10 shadow-sm",
                            step.active ? "bg-primary text-white scale-110" : "bg-white text-secondary border-2 border-secondary/10"
                          )}>
                            <step.icon size={20} />
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest",
                            step.active ? "text-primary" : "text-text/30"
                          )}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Membership Benefits Banner */}
          <section className="bg-secondary/5 p-10 rounded-2xl border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-serif font-bold text-secondary">병남 멤버십 혜택</h3>
              <p className="text-sm text-secondary/70 leading-relaxed">
                첫 구매 10% 할인부터 등급별 상시 적립까지, <br />
                병남과 함께하는 특별한 혜택을 누려보세요.
              </p>
            </div>
            <button className="px-10 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all shadow-lg">
              혜택 자세히 보기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default MyPage;
