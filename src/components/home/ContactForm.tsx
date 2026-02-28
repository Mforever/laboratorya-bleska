import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '../../hooks/useTelegram';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  title?: string;
  showServiceSelect?: boolean;
  showCarField?: boolean;
  showMessageField?: boolean;
  selectedZones?: string[];
  totalPrice?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Записаться на услугу',
  showServiceSelect = true,
  showCarField = true,
  showMessageField = true,
  selectedZones = [],
  totalPrice = 0,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '+7',
    car: '',
    service: '',
    message: '',
    selectedZones: selectedZones.join(', '),
    totalPrice: totalPrice,
  });

  // 🛡️ ЗАЩИТА ОТ БОТОВ
  const [honeypot, setHoneypot] = useState('');
  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [botDetected, setBotDetected] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const { sendMessage } = useTelegram();

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      selectedZones: selectedZones.join(', '),
      totalPrice: totalPrice,
    }));
  }, [selectedZones, totalPrice]);

  useEffect(() => {
    if (formData.phone && formData.phone.length > 0) {
      const digitsOnly = formData.phone.replace(/\D/g, '');

      if (formData.phone !== '+7' && digitsOnly.length !== 11) {
        setPhoneError('Введите 10 цифр после +7');
      } else if (formData.phone === '+7') {
        setPhoneError(null);
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  }, [formData.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🛡️ ПРОВЕРКИ НА СПАМ
    if (honeypot) {
      console.log('🚫 Бот обнаружен (honeypot)');
      setBotDetected(true);
      return;
    }

    const timeSpent = Date.now() - formStartTime;
    if (timeSpent < 3000) {
      console.log('🚫 Подозрение на бота (слишком быстро)');
      setBotDetected(true);
      return;
    }

    const spamPatterns = [
      /@/i, /http/i, /www/i, /\.(ru|com|net|org|info)/i,
      /[а-яa-z]{20,}/i, /[0-9]{10,}/i, /[!@#$%^&*()_+]{5,}/i
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(formData.name)) {
        console.log('🚫 Обнаружен спам в имени');
        setBotDetected(true);
        return;
      }
    }

    if (!formData.phone || formData.phone === '+7') {
      setPhoneError('Введите номер телефона');
      setPhoneTouched(true);
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError('Введите полный номер (10 цифр после +7)');
      setPhoneTouched(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const success = await sendMessage(formData);

    if (success) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '+7',
        car: '',
        service: '',
        message: '',
        selectedZones: '',
        totalPrice: 0,
      });
      setPhoneTouched(false);
      setPhoneError(null);
      setFormStartTime(Date.now());
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith('+7')) {
      value = '+7';
    }

    const cleaned = value.replace(/[^\d+]/g, '');

    let formatted = '+7';
    const digits = cleaned.slice(2).replace(/\D/g, '').slice(0, 10);

    if (digits.length > 0) {
      formatted += ' ' + digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
      formatted += ' ' + digits.slice(6, 8);
    }
    if (digits.length > 8) {
      formatted += ' ' + digits.slice(8, 10);
    }

    setFormData({ ...formData, phone: formatted });
    setPhoneTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatZoneName = (zone: string): string => {
    return zone
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getDigitsCount = (): number => {
    const digits = formData.phone.replace(/\D/g, '').slice(1);
    return digits.length;
  };

  if (botDetected) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-element rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shield-alt text-3xl text-accent"></i>
            </div>
            <h3 className="text-2xl font-bold mb-3">Защита от спама</h3>
            <p className="text-text-secondary mb-6">
              Обнаружена подозрительная активность. Обновите страницу и попробуйте снова.
            </p>
            <button
              onClick={() => {
                setBotDetected(false);
                setFormStartTime(Date.now());
              }}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all hover:scale-105"
            >
              Попробовать снова
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-20 bg-bg-secondary">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-element rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-text-primary">
            {title}
          </h2>
          <p className="text-text-secondary text-sm text-center mb-6">
            Заполните форму, и мы свяжемся с вами в ближайшее время
          </p>

          {/* Выбранные зоны */}
          {selectedZones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-bg-secondary rounded-lg border border-accent/20"
            >
              <h3 className="font-semibold mb-2 text-accent text-sm flex items-center gap-2">
                <i className="fas fa-check-circle"></i>
                Выбранные зоны:
              </h3>
              <ul className="space-y-1 max-h-32 overflow-y-auto pr-2 custom-scrollbar text-sm">
                {selectedZones.map((zone, index) => (
                  <li key={index} className="text-text-secondary flex justify-between items-center py-1 border-b border-bg-element last:border-0">
                    <span>{formatZoneName(zone)}</span>
                    <span className="text-accent text-xs">+</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-bg-element flex justify-between items-center font-bold text-sm">
                <span className="text-text-primary">Итого:</span>
                <span className="text-accent">{totalPrice.toLocaleString()} ₽</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Имя */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ваше имя *"
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary/70 text-sm"
              />
            </div>

            {/* Телефон */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setPhoneTouched(true)}
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 text-text-primary font-mono text-base tracking-wider transition-all ${
                    phoneTouched && phoneError
                      ? 'focus:ring-error ring-1 ring-error'
                      : phoneTouched && !phoneError && formData.phone !== '+7' && getDigitsCount() === 10
                      ? 'focus:ring-success ring-1 ring-success'
                      : 'focus:ring-accent'
                  }`}
                  placeholder="+7 (___) ___-__-__"
                  maxLength={16}
                />

                {formData.phone !== '+7' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <span className="text-xs text-text-secondary">
                      {getDigitsCount()}/10
                    </span>
                  </div>
                )}
              </div>
              {phoneTouched && phoneError && (
                <p className="text-error text-xs mt-1">{phoneError}</p>
              )}
            </div>

            {/* Марка авто */}
            {showCarField && (
              <div>
                <input
                  type="text"
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  placeholder="Марка и модель авто"
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary/70 text-sm"
                />
              </div>
            )}

            {/* Выбор услуги (без иконок) */}
            {showServiceSelect && (
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary appearance-none cursor-pointer text-sm"
                >
                  <option value="">Выберите услугу</option>
                  <option value="polish">Полировка кузова</option>
                  <option value="ceramic">Керамическое покрытие</option>
                  <option value="ppf">Бронирование пленкой</option>
                </select>
                <div className="relative -mt-8 pointer-events-none text-right mr-3">
                  <i className="fas fa-chevron-down text-text-secondary"></i>
                </div>
              </div>
            )}

            {/* Поле для вопроса */}
            {showMessageField && (
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваш вопрос (необязательно)"
                  rows={3}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary/70 text-sm resize-none"
                />
              </div>
            )}

            {/* Скрытые поля */}
            <input type="hidden" name="selectedZones" value={formData.selectedZones} />
            <input type="hidden" name="totalPrice" value={formData.totalPrice} />

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.phone || formData.phone === '+7' || !!phoneError}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Отправка...
                </span>
              ) : (
                <span>Отправить</span>
              )}
            </button>

            {/* Статус */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-success/20 text-success rounded-lg text-center text-sm"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Спасибо! Мы свяжемся с вами.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-error/20 text-error rounded-lg text-center text-sm"
              >
                <i className="fas fa-exclamation-circle mr-2"></i>
                Ошибка. Попробуйте позже.
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;