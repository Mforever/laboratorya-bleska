// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import Advantages from '../components/home/Advantages';
import Services from '../components/home/Services';
// УДАЛИТЕ эту строку:
// import Gallery from '../components/home/Gallery';
import Reviews from '../components/home/Reviews';
import Process from '../components/home/Process';
import FAQ from '../components/home/FAQ';
import Contacts from '../components/home/Contacts';

const Home: React.FC = () => {
  // Функция открытия модалки
  const openBookingModal = () => {
    const event = new CustomEvent('openModal', {
      detail: { serviceType: 'general', serviceName: 'услугу' }
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Лаборатория блеска - Детейлинг студия в Омске</title>
        <meta
          name="description"
          content="Профессиональный детейлинг в Омске. Полировка, керамическое покрытие, бронирование пленкой. Качественный уход за автомобилем."
        />
      </Helmet>

      <Hero />
      <Advantages />
      <Services />
      {/* УДАЛИТЕ эту строку: */}
      {/* <Gallery /> */}
      <Reviews />
      <Process />
      <FAQ />

      {/* Блок записи */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Запишитесь на детейлинг</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы перезвоним в течение 15 минут, чтобы обсудить все детали
            </p>
            <button
              onClick={openBookingModal}
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105"
            >
              Записаться онлайн
            </button>
          </motion.div>
        </div>
      </section>

      <Contacts />
    </motion.div>
  );
};

export default Home;