import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/home/ContactForm';

const Ceramic: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Керамическое покрытие | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Нанесение керамического покрытия на автомобиль в Омске. Защита кузова на срок до 3 лет. Гидрофобный эффект."
        />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Керамическое покрытие
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Надежная защита кузова на долгие годы
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Что такое керамическое покрытие?</h2>
              <p className="text-text-secondary mb-4">
                Керамическое покрытие - это жидкий полимерный состав, который создает на поверхности кузова
                прочный защитный слой. Он обладает отличными гидрофобными свойствами и защищает ЛКП от
                ультрафиолета, химических реагентов и мелких механических повреждений.
              </p>
              <ul className="space-y-3">
                {[
                  'Защита от царапин и сколов',
                  'Гидрофобный эффект (вода скатывается шариками)',
                  'Устойчивость к химическим реагентам',
                  'Сохранение блеска на долгое время',
                  'Простота в уходе',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <i className="fas fa-check text-accent"></i>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-secondary rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Стоимость покрытия</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-bg-element">
                    <th className="py-3 text-left">Тип авто</th>
                    <th className="py-3 text-right">Срок защиты</th>
                    <th className="py-3 text-right">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Легковой', term: '1 год', price: '15 000 ₽' },
                    { type: 'Легковой', term: '3 года', price: '25 000 ₽' },
                    { type: 'Внедорожник', term: '1 год', price: '20 000 ₽' },
                    { type: 'Внедорожник', term: '3 года', price: '35 000 ₽' },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-bg-element">
                      <td className="py-3">{item.type}</td>
                      <td className="py-3 text-right">{item.term}</td>
                      <td className="py-3 text-right text-accent font-semibold">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <ContactForm title="Записаться на нанесение керамики" />
    </motion.div>
  );
};

export default Ceramic;