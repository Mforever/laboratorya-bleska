import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Ceramic: React.FC = () => {
  const navigate = useNavigate();

  // Функция открытия модалки
  const openBookingModal = () => {
    const event = new CustomEvent('openModal', {
      detail: { serviceType: 'ceramic' }
    });
    window.dispatchEvent(event);
  };

  // Данные для страницы
  const benefits = [
    {
      icon: 'fas fa-tint',
      title: 'Гидрофобный эффект',
      description: 'Вода скатывается шариками, авто дольше остается чистым'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Защита от царапин',
      description: 'Твердость покрытия 9H защищает от мелких механических воздействий'
    },
    {
      icon: 'fas fa-sun',
      title: 'Защита от УФ',
      description: 'Предотвращает выгорание краски и старение ЛКП'
    },
    {
      icon: 'fas fa-flask',
      title: 'Химическая стойкость',
      description: 'Устойчивость к реагентам, битуму и птичьему помету'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Подготовка',
      description: 'Мойка, обезжиривание, оклейка пластика и хрома'
    },
    {
      number: '02',
      title: 'Полировка',
      description: 'Удаление дефектов ЛКП для идеальной основы'
    },
    {
      number: '03',
      title: 'Обезжиривание',
      description: 'Специальным препаратом для лучшей адгезии'
    },
    {
      number: '04',
      title: 'Нанесение керамики',
      description: '2-3 слоя с промежуточной сушкой'
    },
    {
      number: '05',
      title: 'Фиксация',
      description: 'Полировка финишным составом для максимального блеска'
    }
  ];

  const prices = [
    { car: 'Легковой автомобиль (1 год)', price: '15 000 ₽' },
    { car: 'Легковой автомобиль (3 года)', price: '25 000 ₽' },
    { car: 'Внедорожник (1 год)', price: '20 000 ₽' },
    { car: 'Внедорожник (3 года)', price: '35 000 ₽' },
    { car: 'Микроавтобус (1 год)', price: '25 000 ₽' },
    { car: 'Микроавтобус (3 года)', price: '40 000 ₽' }
  ];

  const faqs = [
    {
      question: 'Сколько держится керамическое покрытие?',
      answer: 'В зависимости от состава: 1 год, 3 года или до 5 лет. Мы используем профессиональные составы премиум-класса.'
    },
    {
      question: 'Нужна ли специальная мойка?',
      answer: 'Достаточно обычной бесконтактной мойки. Первые 2 недели нельзя мыть авто, чтобы покрытие закрепилось.'
    },
    {
      question: 'Керамика защищает от сколов?',
      answer: 'Покрытие имеет твердость 9H, что защищает от мелких царапин и пескоструя, но от крупных камней нужна пленка.'
    },
    {
      question: 'Как подготовить авто к нанесению?',
      answer: 'Требуется обязательная полировка кузова. Наносим керамику только на идеально подготовленную поверхность.'
    },
    {
      question: 'Можно ли наносить на новый авто?',
      answer: 'Да, это лучший способ сохранить заводской блеск на долгие годы.'
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
        <title>Керамическое покрытие | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Керамическое покрытие для авто в Омске. Защита кузова на 1-3 года. Гидрофобный эффект, защита от царапин и УФ. Профессиональное нанесение."
        />
      </Helmet>

      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ceramic-hero.jpg"
            alt="Керамическое покрытие"
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
                Керамическое покрытие
              </h1>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl">
                Надежная защита кузова на долгие годы.
                Гидрофобный эффект и невероятный блеск.
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

      {/* Преимущества */}
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
              Почему выбирают керамику
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

      {/* Сравнение с обычной защитой */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Сравнение
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Керамика vs обычный воск
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-element rounded-xl p-8"
            >
              <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                <i className="fas fa-gem"></i>
                Керамика
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>Срок службы 1-3 года</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>Твердость 9H (защита от царапин)</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>Гидрофобный эффект</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>Защита от УФ и реагентов</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>Глубокий блеск</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-element rounded-xl p-8 opacity-60"
            >
              <h3 className="text-xl font-bold mb-4 text-text-secondary flex items-center gap-2">
                <i className="fas fa-solid fa-crown"></i>
                Обычный воск
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-times text-text-secondary mt-1"></i>
                  <span>Срок службы 1-2 недели</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-times text-text-secondary mt-1"></i>
                  <span>Нет защиты от царапин</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-times text-text-secondary mt-1"></i>
                  <span>Слабый водоотталкивающий эффект</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-times text-text-secondary mt-1"></i>
                  <span>Не защищает от реагентов</span>
                </li>
                <li className="flex items-start gap-3 text-text-secondary">
                  <i className="fas fa-times text-text-secondary mt-1"></i>
                  <span>Блеск теряется после первой мойки</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Этапы нанесения */}
      <section className="py-20 bg-bg-secondary">
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
              Этапы нанесения
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
      <section className="py-20">
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
              Стоимость покрытия
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
            *Возможна установка покрытий разного срока службы
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg-secondary">
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
      <section className="py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Готовы защитить авто?</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы поможем подобрать оптимальное покрытие для вашего автомобиля
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

export default Ceramic;