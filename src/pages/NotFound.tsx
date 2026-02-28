import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20 flex items-center justify-center"
    >
      <Helmet>
        <title>Страница не найдена | Лаборатория блеска</title>
      </Helmet>

      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Иллюстрация */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-accent/30 rounded-full animate-pulse delay-100"></div>
              <div className="absolute inset-8 bg-accent/40 rounded-full animate-pulse delay-200"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-accent">404</span>
              </div>
            </div>
          </motion.div>

          {/* Текст */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Страница не найдена
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Возможно, она была удалена или вы перешли по неверной ссылке.
            </p>
          </motion.div>

          {/* Кнопки */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button size="large">
                <i className="fas fa-home mr-2"></i>
                На главную
              </Button>
            </Link>
            <Link to="/contacts">
              <Button variant="outline" size="large">
                <i className="fas fa-phone-alt mr-2"></i>
                Связаться с нами
              </Button>
            </Link>
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-text-secondary text-sm mb-4">
              Популярные разделы:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/polish" className="text-accent hover:underline text-sm">
                Полировка
              </Link>
              <span className="text-text-secondary">•</span>
              <Link to="/ceramic" className="text-accent hover:underline text-sm">
                Керамика
              </Link>
              <span className="text-text-secondary">•</span>
              <Link to="/ppf" className="text-accent hover:underline text-sm">
                Бронирование
              </Link>
              <span className="text-text-secondary">•</span>
              <Link to="/gallery" className="text-accent hover:underline text-sm">
                Галерея
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;