import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/home/ContactForm';

const Contacts: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Контакты | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Контакты детейлинг студии Лаборатория блеска в Омске. Адрес, телефон, email, схема проезда."
        />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Контакты
          </h1>
          <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-12">
            Свяжитесь с нами удобным способом или приезжайте в гости
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-bg-secondary rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-accent">
                  Наши контакты
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-bg-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Адрес</h3>
                      <p className="text-text-secondary">
                        Омск, Чкаловский м/р, Индустриальная 5Б
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-bg-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <a
                        href="tel:+79620555858"
                        className="text-text-secondary hover:text-accent transition-colors"
                      >
                        +7 (962) 055-58-58
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-bg-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:mforever040@gmail.com"
                        className="text-text-secondary hover:text-accent transition-colors"
                      >
                        mforever040@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fab fa-telegram text-bg-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telegram</h3>
                      <a
                        href="https://t.me/rudenko_ds"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent transition-colors"
                      >
                        @rudenko_ds
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-bg-element rounded-lg">
                    <h3 className="font-semibold mb-2 text-accent">Режим работы</h3>
                    <p className="text-text-secondary">По предварительной записи</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-accent">
                Схема проезда
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=73.3686%2C54.9925&z=16&pt=73.3686,54.9925,pm2blm&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm title="Напишите нам" showCarField={false} />
    </motion.div>
  );
};

export default Contacts;