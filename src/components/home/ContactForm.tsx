import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTelegram } from '../../hooks/useTelegram';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  title?: string;
  showServiceSelect?: boolean;
  showCarField?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Записаться на услугу',
  showServiceSelect = true,
  showCarField = true,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    car: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const { sendMessage } = useTelegram();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const success = await sendMessage(formData);

    if (success) {
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', car: '', service: '' });
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-element rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-text-secondary mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                placeholder="Введите имя"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-text-secondary mb-2">
                Телефон *
              </label>
              <PhoneInput
                international
                defaultCountry="RU"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value || '' })}
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            {showCarField && (
              <div>
                <label htmlFor="car" className="block text-text-secondary mb-2">
                  Марка авто
                </label>
                <input
                  type="text"
                  id="car"
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                  placeholder="Например: BMW X5"
                />
              </div>
            )}

            {showServiceSelect && (
              <div>
                <label htmlFor="service" className="block text-text-secondary mb-2">
                  Услуга
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                >
                  <option value="">Выберите услугу</option>
                  <option value="polish">Полировка</option>
                  <option value="ceramic">Керамическое покрытие</option>
                  <option value="ppf">Бронирование пленкой</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-success/20 text-success rounded-lg text-center"
              >
                Спасибо! Мы свяжемся с вами в ближайшее время.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-error/20 text-error rounded-lg text-center"
              >
                Произошла ошибка. Пожалуйста, попробуйте позже.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;