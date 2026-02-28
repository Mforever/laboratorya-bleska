import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Сколько времени занимает детейлинг?',
      answer: 'Полировка: 1-2 дня, керамика: 2-3 дня, бронирование: 3-5 дней. Точные сроки после осмотра авто.'
    },
    {
      id: 2,
      question: 'Нужна ли предварительная запись?',
      answer: 'Да, мы работаем только по записи. Это гарантирует качество и внимание к каждому авто.'
    },
    {
      id: 3,
      question: 'Как часто можно делать полировку?',
      answer: '1-2 раза в год. Заводского лака хватает на 5-7 качественных полировок.'
    },
    {
      id: 4,
      question: 'Сколько держится керамика?',
      answer: 'От 1 года до 5 лет в зависимости от состава. Используем премиум-материалы.'
    },
    {
      id: 5,
      question: 'Защищает ли керамика от сколов?',
      answer: 'От мелких царапин — да. От крупных камней лучше использовать пленку.'
    },
    {
      id: 6,
      question: 'Сколько служит защитная пленка?',
      answer: '5-7 лет. Не желтеет, не трескается, легко моется.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-bg-primary">
      <div className="container-custom max-w-3xl">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Частые вопросы
          </h2>
          <p className="text-text-secondary text-sm">
            Ответы на самые популярные вопросы
          </p>
        </motion.div>

        {/* Список вопросов */}
        <div className="space-y-2">
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-bg-element rounded-lg overflow-hidden"
            >
              {/* Вопрос */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between gap-2 hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-medium text-text-primary">
                  {item.question}
                </span>
                <i className={`fas fa-chevron-down text-accent text-xs transition-transform duration-300 ${
                  openId === item.id ? 'rotate-180' : ''
                }`}></i>
              </button>

              {/* Ответ */}
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 text-text-secondary text-xs border-t border-white/5 pt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Кнопка вопроса */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <button
            onClick={() => {
              const form = document.getElementById('booking-form');
              if (form) form.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-accent hover:text-accent-hover text-sm inline-flex items-center gap-1 transition-colors"
          >
            <i className="fas fa-comment"></i>
            Остались вопросы? Напишите нам
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;