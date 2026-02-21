import React from 'react';
import { motion } from 'framer-motion';

const Contacts: React.FC = () => {
  return (
    <section id="contacts" className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <h2 className="section-title">Контакты</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
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

            <div className="p-4 bg-bg-element rounded-lg">
              <h3 className="font-semibold mb-2 text-accent">Режим работы</h3>
              <p className="text-text-secondary">По предварительной записи</p>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-element rounded-xl p-4"
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=73.3686%2C54.9925&z=16&pt=73.3686,54.9925,pm2blm&l=map"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Карта"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;