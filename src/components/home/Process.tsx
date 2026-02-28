// src/components/home/Process.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Заявка',
      description: 'Оставьте заявку на сайте или позвоните нам',
      icon: 'fas fa-pen'
    },
    {
      number: '02',
      title: 'Осмотр',
      description: 'Проведем диагностику и оценим состояние авто',
      icon: 'fas fa-search'
    },
    {
      number: '03',
      title: 'Согласование',
      description: 'Подберем оптимальный вариант работ',
      icon: 'fas fa-handshake'
    },
    {
      number: '04',
      title: 'Выполнение',
      description: 'Проведем все работы с гарантией качества',
      icon: 'fas fa-tools'
    },
    {
      number: '05',
      title: 'Выдача',
      description: 'Вы получите автомобиль с идеальным блеском',
      icon: 'fas fa-car'
    }
  ];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Как мы работаем
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Процесс работы
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            От заявки до выдачи автомобиля — мы контролируем каждый этап
          </p>
        </motion.div>

        {/* Схема процесса */}
        <div className="relative">
          {/* Десктоп: 5 колонок, планшет: 3 колонки, мобильный: 1 колонка */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative h-full"
              >
                {/* Карточка с фиксированной высотой */}
                <div className="bg-bg-element rounded-xl p-6 h-full flex flex-col items-center text-center hover:bg-bg-element/80 transition-colors duration-300">
                  {/* Номер шага */}
                  <div className="text-3xl font-bold text-accent/20 mb-3">
                    {step.number}
                  </div>

                  {/* Иконка */}
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                    <i className={`${step.icon} text-accent text-lg`}></i>
                  </div>

                  {/* Текст */}
                  <h3 className="font-semibold mb-2 text-base">{step.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Линия-соединитель (только между карточками на десктопе) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Блок с призывом */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Готовы вернуть блеск вашему авто?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Оставьте заявку прямо сейчас и получите бесплатную диагностику
            </p>
            <button
              onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg font-medium transition-all hover:scale-105 text-sm"
            >
              Записаться онлайн
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;