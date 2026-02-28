import React from 'react'; 
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Polish: React.FC = () => {
  const navigate = useNavigate();

  // Функция открытия модалки
  const openBookingModal = () => {
    const event = new CustomEvent('openModal', {
      detail: { serviceType: 'polish' }
    });
    window.dispatchEvent(event);
  };

  // Данные для страницы
  const benefits = [
    {
      icon: 'fas fa-sparkles',
      title: 'Глубокая очистка',
      description: 'Удаляем до 95% загрязнений, возвращаем первоначальный цвет'
    },
    {
      icon: 'fas fa-brush',
      title: 'Удаление царапин',
      description: 'Убираем паутину, голограммы и мелкие дефекты ЛКП'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Защитный слой',
      description: 'Наносим защитную полироль для долговременного эффекта'
    },
    {
      icon: 'fas fa-gem',
      title: 'Глубокий блеск',
      description: 'Автомобиль сияет как новый, даже спустя месяцы'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Мойка и подготовка',
      description: 'Тщательная бесконтактная мойка, удаление битума и обезжиривание'
    },
    {
      number: '02',
      title: 'Диагностика ЛКП',
      description: 'Измеряем толщину слоя, определяем глубину царапин'
    },
    {
      number: '03',
      title: 'Абразивная полировка',
      description: 'Удаляем верхний слой лака с царапинами специальными пастами'
    },
    {
      number: '04',
      title: 'Защитная полировка',
      description: 'Наносим финишный защитный слой для блеска'
    },
    {
      number: '05',
      title: 'Контроль качества',
      description: 'Проверяем результат под разными углами освещения'
    }
  ];

  const prices = [
    { car: 'Легковой автомобиль', price: 'от 5 000 ₽' },
    { car: 'Внедорожник', price: 'от 7 000 ₽' },
    { car: 'Микроавтобус', price: 'от 10 000 ₽' },
    { car: 'Спорткар', price: 'от 8 000 ₽' },
    { car: 'Премиум седан', price: 'от 12 000 ₽' }
  ];

  const faqs = [
    {
      question: 'Сколько держится полировка?',
      answer: 'При правильном уходе эффект сохраняется от 6 до 12 месяцев. Защитная полировка служит дольше, чем косметическая.'
    },
    {
      question: 'Не повредит ли полировка краску?',
      answer: 'Нет, мы используем профессиональные абразивные пасты и мягкие полировальные круги. Снимается только минимальный слой лака.'
    },
    {
      question: 'Как часто можно делать полировку?',
      answer: 'Рекомендуется не чаще 1-2 раз в год. Заводского лака хватает на 5-7 качественных полировок.'
    },
    {
      question: 'Нужна ли предварительная подготовка?',
      answer: 'Достаточно пригнать чистый автомобиль. Остальную подготовку мы берем на себя.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-bg-primary"
    >
      <Helmet>
        <title>Полировка кузова | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Профессиональная полировка кузова в Омске. Восстановление ЛКП, удаление царапин, защитная полировка. Работаем с любыми типами авто."
        />
      </Helmet>

      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/polish-hero.jpg"
            alt="Полировка кузова"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
                Услуга
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Полировка кузова
              </h1>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl">
                Вернем блеск и глубину цвета вашему автомобилю.
                Удалим царапины, паутину и голограммы.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="large" onClick={openBookingModal}>
                  Записаться
                </Button>
                <Button variant="outline" size="large" onClick={() => navigate('/gallery')}>
                  Смотреть работы
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Что входит в услугу */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Преимущества
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Что вы получаете
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-accent text-xl`}></i>
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-text-secondary text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Этапы работы */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Процесс
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как мы работаем
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-6 text-center relative"
              >
                <div className="text-3xl font-bold text-accent/20 mb-2">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-text-secondary text-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Таблица цен */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Цены
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Стоимость полировки
            </h2>
          </motion.div>

          <div className="bg-bg-element rounded-xl overflow-hidden">
            {prices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-center p-4 ${
                  index < prices.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-text-primary">{item.car}</span>
                <span className="text-accent font-semibold">{item.price}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-text-secondary text-sm text-center mt-4">
            *Точная стоимость зависит от состояния кузова и объема работ
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Вопросы и ответы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Часто спрашивают
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-element rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2 text-accent">{faq.question}</h3>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок записи */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Готовы записаться?</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы перезвоним в течение 15 минут, чтобы подобрать удобное время
            </p>
            <button
              onClick={openBookingModal}
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105"
            >
              Записаться онлайн
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Polish;