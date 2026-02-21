import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = '/images/hero-background.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Фоновое изображение */}
      {imageLoaded && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img
              src="/images/hero-background.jpg"
              alt="Детейлинг студия Лаборатория блеска"
              className="w-full h-full object-cover scale-105 filter blur-[2px]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>
      )}

      {/* Контент - центрированный */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
        >
          {/* Надзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent text-lg md:text-xl font-semibold mb-3 tracking-wider"
          >
            Лаборатория блеска
          </motion.p>

          {/* Заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            Снова как новый
          </motion.h1>

          {/* Описание */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
          >
            Вернем блеск нового авто. Полировка, керамика, бронирование в Омске
          </motion.p>

          {/* Кнопки - центрированные */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button onClick={() => handleServiceClick('/polish')} size="compact">
              Полировка
            </Button>
            <Button onClick={() => handleServiceClick('/ceramic')} size="compact">
              Керамика
            </Button>
            <Button onClick={() => handleServiceClick('/ppf')} size="compact">
              Бронирование
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Индикатор скролла */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
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