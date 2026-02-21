import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import CarProtectionCalculator from '../components/ppf/CarProtectionCalculator';
import ContactForm from '../components/home/ContactForm';
import { useTelegram } from '../hooks/useTelegram';

const PPF: React.FC = () => {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { sendMessage } = useTelegram();

  const handleSelectionChange = (zones: string[], price: number) => {
    setSelectedZones(zones);
    setTotalPrice(price);
  };

  const handleFormSubmit = async (formData: any) => {
    const success = await sendMessage({
      ...formData,
      selectedZones: selectedZones.join(', '),
      totalPrice,
      service: 'ppf',
    });

    if (success) {
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    }
  };

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
          content="Бронирование автомобиля защитной пленкой в Омске. Защита от сколов, царапин и реагентов. Интерактивный расчет стоимости."
        />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Бронирование авто защитной пленкой
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Выберите зоны для бронирования и получите мгновенный расчет стоимости
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <CarProtectionCalculator onSelectionChange={handleSelectionChange} />
        </div>
      </section>

      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Цены на бронирование</h2>
          <div className="max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bg-element">
                  <th className="py-4 text-left">Зона</th>
                  <th className="py-4 text-right">Цена</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { zone: 'Капот', price: 5000 },
                  { zone: 'Передний бампер', price: 7000 },
                  { zone: 'Задний бампер', price: 7000 },
                  { zone: 'Крылья (пара)', price: 8000 },
                  { zone: 'Двери (комплект)', price: 15000 },
                  { zone: 'Зеркала', price: 3000 },
                  { zone: 'Фары', price: 4000 },
                  { zone: 'Крыша', price: 6000 },
                  { zone: 'Багажник', price: 5000 },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-bg-element">
                    <td className="py-3 text-text-secondary">{item.zone}</td>
                    <td className="py-3 text-right text-accent font-semibold">
                      {item.price.toLocaleString()} ₽
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ContactForm
        title="Записаться на бронирование"
        showServiceSelect={false}
      />
    </motion.div>
  );
};

export default PPF;