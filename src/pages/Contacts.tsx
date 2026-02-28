import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// Удален Button, так как не используется

const Contacts: React.FC = () => {
  // Функция открытия модалки
  const openBookingModal = () => {
    const event = new CustomEvent('openModal', {
      detail: { serviceType: 'general', serviceName: 'консультацию' }
    });
    window.dispatchEvent(event);
  };

  const contactItems = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Адрес',
      content: 'Омск, Чкаловский м/р, ул. Индустриальная, 5Б',
      link: 'https://yandex.ru/maps/?um=constructor%3A...&source=constructorLink',
      linkText: 'Открыть на карте'
    },
    {
      icon: 'fas fa-phone-alt',
      title: 'Телефон',
      content: '+7 (962) 055-58-58',
      link: 'tel:+79620555858',
      linkText: 'Позвонить',
      extra: 'Ежедневно 10:00–20:00'
    },
    {
      icon: 'fas fa-clock',
      title: 'Режим работы',
      content: 'Пн-Пт: 10:00–20:00',
      extra: 'Сб: 11:00–18:00, Вс: по записи'
    },
    {
      icon: 'fab fa-telegram',
      title: 'Telegram',
      content: '@rudenko_ds',
      link: 'https://t.me/rudenko_ds',
      linkText: 'Написать',
      extra: 'Отвечаем быстро',
      highlighted: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20"
    >
      <Helmet>
        <title>Контакты | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Контакты детейлинг-студии Лаборатория блеска в Омске. Адрес, телефон, Telegram, схема проезда."
        />
      </Helmet>

      {/* Заголовок */}
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Свяжитесь с нами
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Контакты
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Приезжайте к нам в студию или напишите в Telegram
          </p>
        </motion.div>
      </div>

      {/* Контактная информация */}
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="h-full"
            >
              <div className={`bg-bg-element rounded-xl p-5 h-full flex flex-col ${
                item.highlighted ? 'bg-accent/5' : ''
              } ${item.link ? 'hover:scale-105 transition-all duration-300' : ''}`}>

                {/* Иконка и заголовок */}
                <div className="flex items-center gap-3 min-h-[48px] mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.highlighted ? 'bg-accent/20' : 'bg-accent/10'
                  }`}>
                    <i className={`${item.icon} text-accent text-lg`}></i>
                  </div>
                  <h3 className="font-semibold text-text-primary text-base">
                    {item.title}
                  </h3>
                </div>

                {/* Контент */}
                <div className="flex-1 flex flex-col">
                  <div className="min-h-[48px] mb-3">
                    <div className="text-text-secondary text-sm leading-relaxed">
                      {item.content}
                    </div>
                  </div>

                  {item.extra && (
                    <div className="min-h-[36px] mb-4">
                      <div className="text-text-secondary/60 text-xs leading-relaxed">
                        {item.extra}
                      </div>
                    </div>
                  )}

                  {item.link ? (
                    <div className="mt-auto">
                      <a
                        href={item.link}
                        className="w-full py-2.5 px-3 bg-accent/10 hover:bg-accent hover:text-bg-primary text-accent text-sm font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 group"
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span>{item.linkText}</span>
                        <i className="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
                      </a>
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <div className="w-full py-2.5 px-3 invisible">
                        <span>placeholder</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Карта и форма */}
      <div className="container-custom mb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Карта - 2 колонки */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-bg-element rounded-xl p-2 h-full">
              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=73.3686%2C54.9925&z=16&pt=73.3686,54.9925,pm2blm&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта проезда"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Форма - 1 колонка */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-bg-element rounded-xl p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4">Остались вопросы?</h3>
              <p className="text-text-secondary text-sm mb-6">
                Напишите нам в Telegram или закажите звонок
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/rudenko_ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <i className="fab fa-telegram"></i>
                  Написать в Telegram
                </a>
                <button
                  onClick={openBookingModal}
                  className="w-full py-3 border border-accent text-accent hover:bg-accent hover:text-bg-primary rounded-lg transition-all"
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-text-secondary text-sm">
            <i className="fas fa-car text-accent"></i>
            <span>Работаем с 2015</span>
            <span className="w-1 h-1 bg-text-secondary rounded-full mx-2"></span>
            <i className="fas fa-star text-accent"></i>
            <span>5.0</span>
            <span className="w-1 h-1 bg-text-secondary rounded-full mx-2"></span>
            <i className="fas fa-clock text-accent"></i>
            <span>Быстрая связь</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contacts;