import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-accent">Лаборатория</span>
            <br />
            <span>блеска</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Премиальный детейлинг в Омске. Вернем вашему авто идеальный блеск и надежную защиту.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleServiceClick('/polish')}>Полировка</Button>
            <Button onClick={() => handleServiceClick('/ceramic')}>Керамика</Button>
            <Button onClick={() => handleServiceClick('/ppf')}>Бронирование</Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - теперь ведет к секции преимуществ */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => {
          const element = document.getElementById('advantages');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <i className="fas fa-chevron-down text-2xl text-accent"></i>
      </motion.button>
    </section>
  );
};

export default Hero;