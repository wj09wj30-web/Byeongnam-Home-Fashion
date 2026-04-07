import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Quote } from 'lucide-react';

const Story = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      {/* Hero */}
      <section className="text-center space-y-8 mb-32">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-bold uppercase tracking-[0.3em] text-xs"
        >
          Our Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold leading-tight"
        >
          공간의 온도를 <br /> 디자인합니다
        </motion.h1>
      </section>

      {/* Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold">Natural Minimalism</h2>
            <p className="text-text/70 leading-relaxed text-lg">
              병남 홈패션은 1995년 작은 패브릭 공방에서 시작되었습니다. 
              우리는 화려한 장식보다는 소재 본연의 질감이 주는 편안함에 집중합니다. 
              가장 자연스러운 것이 가장 아름답다는 믿음으로, 당신의 일상에 스며드는 따뜻한 미니멀리즘을 제안합니다.
            </p>
          </div>
          <div className="p-10 bg-secondary/5 rounded-3xl border border-secondary/10 relative">
            <Quote size={48} className="absolute -top-6 -left-6 text-primary/20" />
            <p className="text-xl font-serif italic text-secondary leading-relaxed">
              "집은 세상에서 가장 나다운 공간이어야 합니다. 
              우리는 그 공간이 가진 고유의 색을 찾아드리는 조력자가 되고 싶습니다."
            </p>
            <p className="mt-6 text-sm font-bold text-secondary/60">— Founder, Byeongnam Kim</p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/story-1/800/1000" alt="Story 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-background hidden md:block">
            <img src="https://picsum.photos/seed/story-2/400/500" alt="Story 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif font-bold">Craftsmanship</h2>
          <p className="text-text/50">병남의 모든 제품은 숙련된 장인의 손길을 거쳐 완성됩니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Material Selection', desc: '전 세계에서 엄선한 친환경 천연 소재만을 사용합니다.' },
            { title: 'Custom Tailoring', desc: '고객님의 공간에 딱 맞는 1:1 맞춤 제작 서비스를 제공합니다.' },
            { title: 'Quality Control', desc: '세 번의 검수 과정을 통해 완벽한 품질을 보장합니다.' }
          ].map((step, idx) => (
            <div key={idx} className="space-y-6 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl font-serif font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-serif font-bold">{step.title}</h3>
              <p className="text-sm text-text/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Story;
