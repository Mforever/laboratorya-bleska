import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Advantages from '../components/home/Advantages';
import Services from '../components/home/Services';
import Gallery from '../components/home/Gallery';
import Reviews from '../components/home/Reviews';
import Process from '../components/home/Process';
import FAQ from '../components/home/FAQ';
import ContactForm from '../components/home/ContactForm';
import Contacts from '../components/home/Contacts';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Обработка якорей при загрузке страницы
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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

      {/* Добавляем id для каждой секции */}
      <section id="hero">
        <Hero />
      </section>

      <section id="advantages">
        <Advantages />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="process">
        <Process />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <section id="contacts">
        <Contacts />
      </section>
    </motion.div>
  );
};

export default Home;