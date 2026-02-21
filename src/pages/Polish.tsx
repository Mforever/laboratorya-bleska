import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/home/ContactForm';

const Polish: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Полировка кузова | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Профессиональная полировка кузова автомобиля в Омске. Восстановление ЛКП, удаление царапин, защитная полировка."
        />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Полировка кузова
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Профессиональное восстановление лакокрасочного покрытия
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Абразивная полировка',
                description: 'Глубокое восстановление ЛКП, удаление глубоких царапин и голограмм',
                price: 'от 5000 ₽',
              },
              {
                title: 'Защитная полировка',
                description: 'Нанесение защитного слоя для сохранения блеска и защиты от внешних воздействий',
                price: 'от 4000 ₽',
              },
              {
                title: 'Комбо + керамика',
                description: 'Комплексная полировка с нанесением керамического покрытия',
                price: 'от 15000 ₽',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-secondary rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary mb-4">{item.description}</p>
                <p className="text-accent font-bold text-2xl">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm title="Записаться на полировку" />
    </motion.div>
  );
};

export default Polish;