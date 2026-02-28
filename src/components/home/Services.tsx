import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'polish',
      title: 'Полировка кузова',
      description: 'Восстановление ЛКП, удаление царапин и голограмм',
      price: 'от 5 000 ₽',
      features: ['Глубокая полировка', 'Защитная полировка', 'Удаление голограмм'],
      image: '/images/services/polish.jpg'
    },
    {
      id: 'ceramic',
      title: 'Керамическое покрытие',
      description: 'Надежная защита кузова на срок до 3 лет',
      price: 'от 15 000 ₽',
      features: ['Гидрофобный эффект', 'Защита от УФ', 'Сохранение блеска'],
      image: '/images/services/ceramic.jpg'
    },
    {
      id: 'ppf',
      title: 'Бронирование пленкой',
      description: 'Защита от сколов, царапин и реагентов',
      price: 'от 10 000 ₽',
      features: ['Прозрачная пленка', 'Самовосстановление', 'Защита камней'],
      image: '/images/services/ppf.jpg'
    }
  ];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-2">
            Наши услуги
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Что мы предлагаем
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Комплексный уход за вашим автомобилем с использованием премиальных материалов
          </p>
        </motion.div>

        {/* Сетка услуг - все карточки одинаковой высоты */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-element rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              {/* Изображение с фиксированной высотой */}
              <div className="relative h-48 flex-shrink-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-element to-transparent" />
              </div>

              {/* Контент - занимает все оставшееся место и центрируется */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm mb-4 min-h-[40px]">{service.description}</p>

                {/* Список особенностей с фиксированной высотой */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <i className="fas fa-check text-accent text-xs mt-1 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Цена и кнопка - всегда внизу */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-2xl font-bold text-accent">{service.price}</span>
                  <Button
                    size="small"
                    onClick={() => navigate(`/${service.id}`)}
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;