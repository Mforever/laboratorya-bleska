// src/pages/PPF.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import CarProtectionCalculator from '../components/ppf/CarProtectionCalculator';
import ContactForm from '../components/home/ContactForm';

const PPF: React.FC = () => {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelectionChange = (zones: string[], price: number) => {
    setSelectedZones(zones);
    setTotalPrice(price);
  };

  // Удалена неиспользуемая функция handleFormSubmit

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Бронирование пленкой | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Бронирование автомобиля защитной пленкой в Омске. Интерактивная схема и расчет стоимости."
        />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Бронирование авто защитной пленкой
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Выберите зоны на схеме и получите мгновенный расчет стоимости
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <CarProtectionCalculator onSelectionChange={handleSelectionChange} />
        </div>
      </section>

      <ContactForm
        title="Записаться на бронирование"
        showServiceSelect={false}
        selectedZones={selectedZones}
        totalPrice={totalPrice}
      />
    </motion.div>
  );
};

export default PPF;