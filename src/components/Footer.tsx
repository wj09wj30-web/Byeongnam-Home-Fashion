import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/10 pt-20 pb-10 px-6 border-t border-secondary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-serif font-bold text-primary">
            병남 홈패션
          </Link>
          <p className="text-sm text-text/70 leading-relaxed">
            내추럴 미니멀리즘을 지향하는 라이프스타일 브랜드입니다. 
            당신의 공간에 따뜻한 감성과 세련된 무드를 더해드립니다.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors shadow-sm">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors shadow-sm">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full text-secondary hover:text-primary transition-colors shadow-sm">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-text/70">
            <li><Link to="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
            <li><Link to="/shop?category=curtain" className="hover:text-primary transition-colors">Curtains</Link></li>
            <li><Link to="/shop?category=bedding" className="hover:text-primary transition-colors">Bedding</Link></li>
            <li><Link to="/story" className="hover:text-primary transition-colors">Brand Story</Link></li>
            <li><Link to="/guide" className="hover:text-primary transition-colors">Measurement Guide</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-serif font-bold text-lg mb-6">Customer Service</h4>
          <ul className="space-y-4 text-sm text-text/70">
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/membership" className="hover:text-primary transition-colors">Membership Benefits</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-text/70">
            <li className="flex items-start space-x-3">
              <Phone size={18} className="mt-0.5 text-primary" />
              <span>1588-0000 (Mon-Fri 10:00 - 18:00)</span>
            </li>
            <li className="flex items-start space-x-3">
              <Mail size={18} className="mt-0.5 text-primary" />
              <span>contact@byeongnam.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="mt-0.5 text-primary" />
              <span>서울특별시 강남구 테헤란로 123 병남빌딩 4층</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-xs text-text/40">
          © {currentYear} Byeongnam Home Fashion. All rights reserved.
        </p>
        <div className="flex space-x-6 text-xs text-text/40">
          <a href="#" className="hover:text-text/70">Privacy Policy</a>
          <a href="#" className="hover:text-text/70">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
