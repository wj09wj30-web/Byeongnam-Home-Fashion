import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play, Instagram } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '../data';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const bestProducts = PRODUCTS.filter(p => p.isBest);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {/* Hero Image/Video Placeholder */}
        <img 
          src="https://picsum.photos/seed/hero-fabric/1920/1080?blur=2" 
          alt="Hero Fabric"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] mb-6 font-medium"
          >
            Natural Minimalism Lifestyle
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight"
          >
            지금 우리 집 <br /> 무드 바꾸기
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link 
              to="/shop" 
              className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl flex items-center space-x-2"
            >
              <span>Shop Collection</span>
              <ArrowRight size={18} />
            </Link>
            <button className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <Play size={16} fill="white" />
              </div>
              <span className="text-sm font-medium tracking-widest uppercase">Watch Story</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 opacity-60"
        >
          <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
          <div className="w-px h-12 bg-white/50" />
        </motion.div>
      </section>

      {/* Best Products Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Best Sellers</span>
            <h2 className="text-4xl font-serif font-bold">오랫동안 사랑받는 <br /> 병남의 시그니처</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors">
            View All Best
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {bestProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://picsum.photos/seed/brand-story/800/1000" 
                alt="Brand Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -right-10 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-background hidden md:block"
            >
              <img 
                src="https://picsum.photos/seed/fabric-detail/400/400" 
                alt="Fabric Detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                자연의 질감을 닮은 <br /> 따뜻한 미니멀리즘
              </h2>
              <p className="text-text/70 leading-relaxed text-lg">
                병남 홈패션은 단순히 제품을 만드는 것을 넘어, 당신의 공간이 가진 고유의 온도를 연구합니다. 
                가공되지 않은 순수한 소재와 절제된 디자인으로 일상의 여백을 채워보세요. 
                우리는 당신의 가장 편안한 순간을 위해 존재합니다.
              </p>
            </div>
            <Link 
              to="/story" 
              className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <span>Read Our Story</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Reviews Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">Community</span>
          <h2 className="text-4xl font-serif font-bold">공간을 채운 고객님들의 이야기</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <img 
                src={review.image} 
                alt={review.userName} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <p className="text-sm font-medium line-clamp-2 mb-2 italic">"{review.comment}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">{review.userName}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "fill-current" : "opacity-30"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* More Reviews Placeholder */}
          <div className="aspect-square rounded-xl bg-secondary/10 flex flex-col items-center justify-center text-center p-6 space-y-4 border-2 border-dashed border-secondary/20">
            <p className="text-sm font-medium text-secondary">더 많은 리뷰를 <br /> 확인해보세요</p>
            <Link to="/reviews" className="p-3 bg-white rounded-full shadow-md text-primary hover:scale-110 transition-transform">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-white text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-serif font-bold">병남의 새로운 소식을 받아보세요</h2>
          <p className="text-white/80">뉴스레터 구독 시 첫 구매 10% 할인 쿠폰을 드립니다.</p>
          <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:bg-white focus:text-text transition-all placeholder:text-white/50"
            />
            <button className="px-10 py-4 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
