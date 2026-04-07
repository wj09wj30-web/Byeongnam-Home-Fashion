import React from 'react';
import { Ruler, Maximize2, Info, CheckCircle2 } from 'lucide-react';

const MeasurementGuide = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-6 mb-20">
        <span className="text-primary font-bold uppercase tracking-widest text-xs">Guide</span>
        <h1 className="text-5xl font-serif font-bold">맞춤 제작 가이드</h1>
        <p className="text-text/50">정확한 측정이 완벽한 핏의 시작입니다.</p>
      </div>

      <div className="space-y-24">
        {/* Curtain Guide */}
        <section className="space-y-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
              <Ruler size={24} />
            </div>
            <h2 className="text-3xl font-serif font-bold">커튼 사이즈 측정법</h2>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-text/5 space-y-10">
            <div className="aspect-video bg-secondary/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-secondary/10">
              {/* Line Drawing Illustration Placeholder */}
              <div className="text-center space-y-4">
                <Maximize2 size={48} className="text-secondary/20 mx-auto" />
                <p className="text-xs font-bold text-secondary/40 uppercase tracking-widest">Curtain Measurement Illustration</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl flex items-center space-x-2">
                  <span className="text-primary">01.</span>
                  <span>가로 길이 (Width)</span>
                </h3>
                <p className="text-sm text-text/70 leading-relaxed">
                  창문 틀 전체 너비를 측정하신 후, 주름의 풍성함을 위해 1.5배~2배 정도의 여유를 두시는 것을 추천합니다. 
                  나비주름의 경우 창문 너비와 동일하게 주문하셔도 충분합니다.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl flex items-center space-x-2">
                  <span className="text-primary">02.</span>
                  <span>세로 길이 (Height)</span>
                </h3>
                <p className="text-sm text-text/70 leading-relaxed">
                  커튼 레일이나 봉이 설치될 위치부터 바닥까지의 길이를 측정해주세요. 
                  바닥에서 1~2cm 정도 띄우고 싶으시다면 측정값에서 해당 수치를 빼주시면 됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-secondary/5 p-10 rounded-3xl border border-secondary/10 space-y-8">
          <h3 className="text-2xl font-serif font-bold flex items-center space-x-3">
            <Info size={24} className="text-primary" />
            <span>측정 팁</span>
          </h3>
          <ul className="space-y-4">
            {[
              '금속 줄자를 사용하여 측정하는 것이 가장 정확합니다.',
              '창문 박스가 있는 경우 박스 안쪽 천장부터 측정하세요.',
              '좌/우/중앙 세 군데의 높이를 측정하여 가장 짧은 값을 기준으로 하세요.',
              '어려우신 경우 고객센터(1588-0000)로 사진을 보내주시면 상담해드립니다.'
            ].map((tip, i) => (
              <li key={i} className="flex items-start space-x-3 text-sm text-text/70">
                <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MeasurementGuide;
