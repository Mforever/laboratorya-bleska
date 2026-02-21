import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../../utils/constants';

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    navigate(link);
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Наши услуги
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-bg-secondary rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => handleServiceClick(service.link)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-accent font-bold text-xl mb-3">
                  от {service.price.toLocaleString()} ₽
                </p>
                <p className="text-text-secondary mb-4">{service.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service.link);
                  }}
                  className="text-accent hover:text-accent-hover font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  Подробнее <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;