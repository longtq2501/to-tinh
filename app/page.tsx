'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Sparkles, Calendar, Camera, Star, Smile, Music } from 'lucide-react';
import Image1 from "@/public/images/image-1.jpg";
import Image2 from "@/public/images/image-2.jpg";
import Image3 from "@/public/images/image-3.jpg";
import Image4 from "@/public/images/image-4.jpg";
import Image5 from "@/public/images/image-5.jpg";
import Image6 from "@/public/images/image-6.jpg";
import Image7 from "@/public/images/image-7.jpg";
import Image8 from "@/public/images/image-8.jpg";

// ==================== TYPE DEFINITIONS ====================
interface TimelineItem {
  title: string;
  date: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface GalleryItem {
  id: number;
  image: string;
  caption: string;
}

interface ReasonItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

// ==================== DỮ LIỆU CẤU HÌNH ====================
const CONFIG = {
  targetName: "Em Yêu Dấu",
  fromName: "Anh",
  
  timeline: [
    {
      title: "Lần Đầu Gặp Mặt",
      date: "15/03/2021",
      description: "Ngày anh lần đầu thấy em, tim anh đã không còn bình yên. Nụ cười của em đã làm anh say đắm ngay từ giây phút đó.",
      icon: Heart
    },
    {
      title: "Chuyến Đi Đáng Nhớ",
      date: "20/05/2022",
      description: "Chúng ta cùng nhau đi Đà Lạt, nơi mà mọi khoảnh khắc đều trở nên kỳ diệu bên em.",
      icon: Calendar
    },
    {
      title: "Khoảnh Khắc Đặc Biệt",
      date: "10/08/2023",
      description: "Đêm đó, dưới bầu trời sao, anh biết rằng em chính là người anh muốn ở bên suốt đời.",
      icon: Star
    },
    {
      title: "Hôm Nay",
      date: "12/12/2025",
      description: "Và hôm nay, anh muốn nói với em rằng: Anh yêu em, và muốn được ở bên em mãi mãi.",
      icon: Sparkles
    }
  ] as TimelineItem[],
  
  gallery: [
    { id: 1, image: Image1.src, caption: "Tiên" },
    { id: 2, image: Image2.src, caption: "Béo" },
    { id: 3, image: Image3.src, caption: "Mập" },
    { id: 4, image: Image4.src, caption: "Lùn" },
    { id: 5, image: Image5.src, caption: "4 mắt" },
    { id: 6, image: Image6.src, caption: "học UEH" },
    { id: 7, image: Image7.src, caption: "ngoan" },
    { id: 8, image: Image8.src, caption: "anh Long" }
  ] as GalleryItem[],
  
  reasons: [
    {
      icon: Smile,
      title: "Nụ Cười Tỏa Nắng",
      description: "Nụ cười của em luôn làm bừng sáng cả ngày của anh, như ánh nắng mặt trời mỗi sáng."
    },
    {
      icon: Heart,
      title: "Trái Tim Nhân Hậu",
      description: "Em luôn quan tâm, thấu hiểu và yêu thương mọi người xung quanh một cách chân thành."
    },
    {
      icon: Star,
      title: "Tài Năng Tuyệt Vời",
      description: "Em thật tài năng và tỏa sáng trong mọi việc em làm. Anh tự hào về em vô cùng."
    },
    {
      icon: Music,
      title: "Giọng Nói Dễ Thương",
      description: "Giọng nói của em như một giai điệu nhẹ nhàng, làm anh muốn lắng nghe mãi không chán."
    },
    {
      icon: Sparkles,
      title: "Là Chính Em",
      description: "Đơn giản vì em là em - độc nhất vô nhị, không ai có thể thay thế được trong tim anh."
    }
  ] as ReasonItem[],
  
  confession: {
    title: "Lời Tỏ Tình Từ Trái Tim",
    message: `Em yêu dấu của anh,

Có những điều trong đời không cần lời giải thích, như việc mặt trời mọc mỗi sáng hay trái tim anh yêu em. Từ ngày gặp em, cuộc sống của anh đã thay đổi hoàn toàn. Em đã mang đến cho anh niềm vui, hy vọng và ý nghĩa mà anh chưa bao giờ nghĩ mình có thể tìm thấy.

Mỗi khoảnh khắc bên em đều là một món quà quý giá. Anh yêu cách em cười, cách em nói, cách em quan tâm đến mọi thứ xung quanh. Em làm cho thế giới của anh trở nên tươi đẹp hơn.

Hôm nay, anh muốn hỏi em một câu hỏi quan trọng nhất trong đời anh...`
  }
};

// ==================== COMPONENTS ====================

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingHearts = () => {
  const hearts = useMemo<FloatingHeart[]>(() => {
    // Use deterministic values for Strict Mode
    const positions = [10, 30, 50, 70, 20, 40, 60, 80];
    const delays = [0, 1.2, 2.5, 0.8, 3.1, 1.8, 2.9, 0.3];
    const durations = [18, 22, 16, 20, 19, 23, 17, 21];
    const sizes = [25, 35, 28, 40, 32, 38, 30, 45];
    
    return positions.map((left, index) => ({
      id: index,
      left,
      delay: delays[index] || 0,
      duration: durations[index] || 20,
      size: sizes[index] || 30
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: 0.1
          }}
        >
          <Heart className="text-pink-400" size={heart.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-50">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmI2YzEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="text-center z-10 px-4 space-y-8">
        <div className="space-y-4 animate-fadeIn">
          <Heart className="mx-auto text-red-500 animate-pulse" size={80} fill="currentColor" />
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Dành Cho
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold text-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {CONFIG.targetName}
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          Một hành trình đầy kỷ niệm và tình yêu...
        </p>
        
        <button
          onClick={onStart}
          className="mt-8 px-12 py-4 bg-gradient-to-r from-pink-500 to-red-600 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 animate-fadeIn"
          style={{ animationDelay: '1s' }}
        >
          Bắt Đầu Hành Trình ❤️
        </button>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Type guard để đảm bảo target là HTMLElement
            const target = entry.target as HTMLElement;
            const index = target.dataset.index;
            
            if (index !== undefined) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    
    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach(el => {
      // Ép kiểu để TypeScript hiểu đây là HTMLElement
      const element = el as HTMLElement;
      observer.observe(element);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Chuyện Tình Của Chúng Ta
        </h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-red-300"></div>
          
          {CONFIG.timeline.map((item, index) => {
            const Icon = item.icon;
            const isVisible = visibleItems.has(String(index));
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative mb-16 ${isLeft ? 'md:pr-1/2' : 'md:pl-1/2'}`}
              >
                <div className={`${isLeft ? 'md:w-1/2 w-full md:text-right md:pr-12' : 'md:w-1/2 w-full md:ml-12'} transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : isLeft ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0'}`}>
                  <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <Icon className="text-red-500" size={24} />
                      <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-sm text-pink-600 font-semibold mb-3">{item.date}</p>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Heart className="text-white" size={20} fill="currentColor" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (photoId: number) => {
    setImageErrors(prev => ({ ...prev, [photoId]: true }));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Kỷ Niệm Của Đôi Ta
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONFIG.gallery.map((photo, index) => {
            const hasError = imageErrors[photo.id] || !photo.image;
            
            return (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {!hasError ? (
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleImageError(photo.id)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
                    <Camera className="text-white" size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-center px-4">{photo.caption}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ReasonsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Lý Do Anh Yêu Em
        </h2>
        <p className="text-center text-gray-600 text-xl mb-16">Có hàng nghìn lý do, nhưng đây là 5 điều đặc biệt nhất</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONFIG.reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface ConfessionSectionProps {
  onAccept: () => void;
  onMaybeLater: () => void;
}

const ConfessionSection = ({ onAccept, onMaybeLater }: ConfessionSectionProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-red-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <Heart className="mx-auto text-red-500 mb-8 animate-pulse" size={64} fill="currentColor" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {CONFIG.confession.title}
          </h2>
          
          <div className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed whitespace-pre-line">
            {CONFIG.confession.message}
          </div>
          
          <div className="text-center space-y-6">
            <p className="text-3xl font-bold text-gray-800 mb-8">Em có muốn làm người yêu anh không?</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onAccept}
                className="w-64 px-12 py-6 bg-gradient-to-r from-pink-500 to-red-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300"
              >
                💕 ĐỒNG Ý! 💕
              </button>
              
              <button
                onClick={onMaybeLater}
                className="w-48 px-6 py-3 bg-gray-300 text-gray-600 text-sm font-semibold rounded-full shadow-md hover:bg-gray-400 hover:text-white transition-all duration-300"
              >
                Suy nghĩ thêm...
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Firework {
  id: number;
  left: number;
  top: number;
  delay: number;
}

const CelebrationModal = ({ isOpen, onClose }: CelebrationModalProps) => {
  const fireworks = useMemo<Firework[]>(() => {
    const positions = [
      { left: 10, top: 20 }, { left: 30, top: 40 }, { left: 50, top: 60 },
      { left: 70, top: 30 }, { left: 90, top: 50 }, { left: 20, top: 80 },
      { left: 40, top: 10 }, { left: 60, top: 70 }, { left: 80, top: 90 },
      { left: 10, top: 60 }, { left: 30, top: 20 }, { left: 50, top: 40 },
      { left: 70, top: 80 }, { left: 90, top: 10 }, { left: 20, top: 30 },
      { left: 40, top: 70 }, { left: 60, top: 50 }, { left: 80, top: 20 },
      { left: 10, top: 80 }, { left: 30, top: 50 }, { left: 50, top: 10 },
      { left: 70, top: 40 }, { left: 90, top: 30 }, { left: 20, top: 60 },
      { left: 40, top: 90 }, { left: 60, top: 20 }, { left: 80, top: 70 },
      { left: 10, top: 40 }, { left: 30, top: 80 }, { left: 50, top: 30 }
    ];
    
    const delays = Array.from({ length: 30 }, (_, i) => (i * 0.1) % 2);
    
    return positions.map((pos, index) => ({
      id: index,
      left: pos.left,
      top: pos.top,
      delay: delays[index] || 0
    }));
  }, []);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center animate-scaleIn">
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {fireworks.map((fw) => (
            <div
              key={fw.id}
              className="absolute"
              style={{
                left: `${fw.left}%`,
                top: `${fw.top}%`,
                animation: `firework 2s ease-out infinite`,
                animationDelay: `${fw.delay}s`
              }}
            >
              <Heart className="text-red-500" size={16} fill="currentColor" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <Sparkles className="mx-auto text-yellow-400 animate-spin" size={80} />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Chúc Mừng! 🎉
          </h2>
          
          <p className="text-3xl font-bold text-gray-800 mb-8">
            {CONFIG.fromName} Yêu {CONFIG.targetName}! ❤️
          </p>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Cảm ơn em đã đồng ý! Từ giờ, anh sẽ luôn ở bên em, yêu thương và chăm sóc em mỗi ngày. 
            Em là tình yêu của đời anh! 💕
          </p>
          
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-600 text-white text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Đóng 💖
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slideUp">
      <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
        <Heart className="animate-pulse" size={24} fill="currentColor" />
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const handleStart = () => {
    setShowContent(true);
    setTimeout(() => {
      const element = document.getElementById('timeline');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };
  
  const handleAccept = () => {
    setShowModal(true);
  };
  
  const handleMaybeLater = () => {
    setShowToast(true);
  };
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100vh) rotate(180deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes firework {
          0% { opacity: 1; transform: translate(0, 0) scale(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(calc(var(--tx, 0px)), calc(var(--ty, -200px))) scale(1); }
        }
        
        .animate-float { 
          animation: float linear infinite; 
        }
        .animate-fadeIn { 
          animation: fadeIn 1s ease-out forwards; 
        }
        .animate-scaleIn { 
          animation: scaleIn 0.5s ease-out forwards; 
        }
        .animate-slideUp { 
          animation: slideUp 0.5s ease-out forwards; 
        }
      `}</style>
      
      <FloatingHearts />
      
      <HeroSection onStart={handleStart} />
      
      {showContent && (
        <>
          <div id="timeline">
            <TimelineSection />
          </div>
          <GallerySection />
          <ReasonsSection />
          <ConfessionSection onAccept={handleAccept} onMaybeLater={handleMaybeLater} />
        </>
      )}
      
      <CelebrationModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Toast 
        message={`${CONFIG.fromName} sẽ đợi em! 💕`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}