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

  // Дополнительные преимущества бронирования
  const benefits = [
    {
      icon: 'shield-alt',
      title: 'Защита от сколов',
      description: 'Надежная защита от камней, песка и гравия'
    },
    {
      icon: 'sun',
      title: 'Защита от УФ',
      description: 'Предотвращает выгорание краски на солнце'
    },
    {
      icon: 'tint',
      title: 'Защита от реагентов',
      description: 'Устойчивость к химическим веществам'
    },
    {
      icon: 'magic',
      title: 'Самовосстановление',
      description: 'Мелкие царапины исчезают при нагреве'
    }
  ];

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
          content="Бронирование автомобиля защитной пленкой в Омске. Интерактивная схема и расчет стоимости. Защита от сколов, царапин и реагентов."
        />
      </Helmet>

      {/* Hero секция */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Бронирование авто защитной пленкой
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Выберите зоны на схеме и получите мгновенный расчет стоимости
          </motion.p>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className={`fas fa-${benefit.icon} text-accent text-xl`}></i>
                </div>
                <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                <p className="text-text-secondary text-xs">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Конструктор */}
      <section className="py-16">
        <div className="container-custom">
          <CarProtectionCalculator onSelectionChange={handleSelectionChange} />
        </div>
      </section>

      {/* Таблица цен */}
      <section className="py-16 bg-bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Цены на бронирование</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { zone: 'Капот целиком', price: 8000 },
                { zone: 'Полоса на капот', price: 4000 },
                { zone: 'Передний бампер', price: 7000 },
                { zone: 'Крыло (1 шт.)', price: 4500 },
                { zone: 'Фара (1 шт.)', price: 2500 },
                { zone: 'ПТФ (1 шт.)', price: 1500 },
                { zone: 'Зеркало (1 шт.)', price: 2000 },
                { zone: 'Передние двери', price: 12000 },
                { zone: 'Задние двери', price: 10000 },
                { zone: 'Ручка двери', price: 800 },
                { zone: 'Крыша', price: 6000 },
                { zone: 'Полоса на крышу', price: 3500 },
                { zone: 'Стойки (комплект)', price: 9000 },
                { zone: 'Багажник', price: 5000 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center p-3 bg-bg-element rounded-lg"
                >
                  <span className="text-text-secondary">{item.zone}</span>
                  <span className="text-accent font-semibold">{item.price.toLocaleString()} ₽</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ по бронированию */}
      <section className="py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Частые вопросы о бронировании
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Как долго служит защитная пленка?',
                a: 'Современные пленки служат 5-7 лет при правильном уходе. Мы используем материалы премиум-класса с гарантией производителя.'
              },
              {
                q: 'Не повредит ли пленка краску при снятии?',
                a: 'Нет, качественная пленка снимается без следов и не повреждает ЛКП. Главное — доверять это профессионалам.'
              },
              {
                q: 'Можно ли бронировать любой автомобиль?',
                a: 'Да, мы работаем с автомобилями любых марок и годов выпуска. Для каждого авто подбираем оптимальную толщину пленки.'
              },
              {
                q: 'Сколько времени занимает бронирование?',
                a: 'Время зависит от количества зон: частичное бронирование занимает 1-2 дня, полное — 3-4 дня.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-bg-secondary rounded-lg p-6"
              >
                <h3 className="font-semibold mb-2 text-accent">{item.q}</h3>
                <p className="text-text-secondary text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма записи с передачей данных из калькулятора */}
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