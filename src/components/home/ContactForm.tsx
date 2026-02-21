// src/components/home/ContactForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTelegram } from '../../hooks/useTelegram';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  title?: string;
  showServiceSelect?: boolean;
  showCarField?: boolean;
  selectedZones?: string[];
  totalPrice?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Записаться на услугу',
  showServiceSelect = true,
  showCarField = true,
  selectedZones = [],
  totalPrice = 0,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '+7',
    car: '',
    service: '',
    selectedZones: selectedZones.join(', '),
    totalPrice: totalPrice,
  });

  // Honeypot поле (невидимое для людей)
  const [honeypot, setHoneypot] = useState('');

  // Время заполнения формы
  const [formStartTime, setFormStartTime] = useState(Date.now());

  // reCAPTCHA
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [botDetected, setBotDetected] = useState(false);

  const { sendMessage } = useTelegram();

  // Сбрасываем время начала при монтировании формы
  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  // Обновляем данные о зонах при изменении пропсов
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      selectedZones: selectedZones.join(', '),
      totalPrice: totalPrice,
    }));
  }, [selectedZones, totalPrice]);

  // Валидация телефона при изменении
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

    // 🛡️ **ЗАЩИТА ОТ БОТОВ**

    // 1. Проверка honeypot
    if (honeypot) {
      console.log('🚫 Бот обнаружен (honeypot)');
      setBotDetected(true);
      return;
    }

    // 2. Проверка времени заполнения
    const timeSpent = Date.now() - formStartTime;
    if (timeSpent < 3000) {
      console.log('🚫 Подозрение на бота (слишком быстро)');
      setBotDetected(true);
      return;
    }

    // 3. Проверка на спам в имени
    if (formData.name.includes('@') ||
        formData.name.includes('http') ||
        formData.name.includes('www') ||
        formData.name.includes('.')) {
      console.log('🚫 Подозрение на спам в имени');
      setBotDetected(true);
      return;
    }

    // 4. Проверка reCAPTCHA
    if (!captchaValue) {
      setCaptchaError('Пожалуйста, подтвердите, что вы не робот');
      return;
    }

    // Валидация телефона перед отправкой
    if (!formData.phone || formData.phone === '+7') {
      setPhoneError('Введите номер телефона');
      setPhoneTouched(true);
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setPhoneError('Введите полный номер телефона (10 цифр после +7)');
      setPhoneTouched(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setCaptchaError(null);

    const success = await sendMessage(formData);

    if (success) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '+7',
        car: '',
        service: '',
        selectedZones: '',
        totalPrice: 0,
      });
      setPhoneTouched(false);
      setPhoneError(null);
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setCaptchaError(null);
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

  // Получить site key из переменных окружения
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Тестовый ключ для разработки

  return (
    <section id="booking-form" className="py-20 bg-bg-secondary">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-element rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Сообщение о блокировке бота */}
          {botDetected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-30 p-6"
            >
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-robot text-5xl text-error"></i>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary">Доступ заблокирован</h3>
                <p className="text-text-secondary mb-6">
                  Обнаружена подозрительная активность. Если вы не робот, обновите страницу и попробуйте снова.
                </p>
                <button
                  onClick={() => {
                    setBotDetected(false);
                    setFormStartTime(Date.now());
                    setCaptchaValue(null);
                    recaptchaRef.current?.reset();
                  }}
                  className="px-8 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all duration-300 font-medium hover:scale-105"
                >
                  Попробовать снова
                </button>
              </div>
            </motion.div>
          )}

          <h2 className="text-3xl font-bold text-center mb-8 text-text-primary">
            {title}
          </h2>

          {/* Отображение выбранных зон */}
          {selectedZones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-5 bg-bg-secondary rounded-xl border border-accent/20"
            >
              <h3 className="font-semibold mb-3 text-accent flex items-center gap-2">
                <i className="fas fa-check-circle"></i>
                Выбранные зоны:
              </h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {selectedZones.map((zone, index) => (
                  <li key={index} className="text-sm text-text-secondary flex justify-between items-center py-1.5 border-b border-bg-element last:border-0">
                    <span>{formatZoneName(zone)}</span>
                    <i className="fas fa-check text-accent text-xs"></i>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-bg-element flex justify-between items-center font-bold">
                <span className="text-text-primary text-lg">Итого:</span>
                <span className="text-accent text-2xl">{totalPrice.toLocaleString()} ₽</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🛡️ HONEYPOT ПОЛЕ */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
              <label htmlFor="website">Не заполняйте это поле</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Имя */}
            <div>
              <label htmlFor="name" className="block text-text-secondary text-sm font-medium mb-2">
                Ваше имя <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary/50 transition-all hover:bg-bg-secondary/80"
                placeholder="Введите ваше имя"
                autoComplete="name"
              />
            </div>

            {/* Телефон */}
            <div>
              <label htmlFor="phone" className="block text-text-secondary text-sm font-medium mb-2">
                Телефон <span className="text-accent">*</span>
              </label>

              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={(e) => {
                    if (e.target.value === '') {
                      setFormData({ ...formData, phone: '+7' });
                    }
                    setPhoneTouched(true);
                  }}
                  className={`w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 text-text-primary font-mono text-lg tracking-wider transition-all ${
                    phoneTouched && phoneError
                      ? 'focus:ring-error ring-2 ring-error'
                      : phoneTouched && !phoneError && formData.phone !== '+7' && getDigitsCount() === 10
                      ? 'focus:ring-success ring-2 ring-success'
                      : 'focus:ring-accent hover:bg-bg-secondary/80'
                  }`}
                  placeholder="+7 999 999 99 99"
                  maxLength={16}
                  autoComplete="tel"
                />

                {formData.phone !== '+7' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs text-text-secondary bg-bg-element px-2 py-1 rounded">
                      {getDigitsCount()}/10
                    </span>
                    {!phoneError && getDigitsCount() === 10 ? (
                      <i className="fas fa-check-circle text-success text-lg"></i>
                    ) : (
                      <i className="fas fa-circle-notch text-accent animate-spin-slow"></i>
                    )}
                  </div>
                )}
              </div>

              {/* Прогресс-бар */}
              {formData.phone !== '+7' && (
                <div className="mt-2 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(getDigitsCount() / 10) * 100}%` }}
                    className={`h-full rounded-full ${
                      getDigitsCount() === 10 ? 'bg-success' : 'bg-accent'
                    }`}
                  />
                </div>
              )}

              {/* Ошибка телефона */}
              {phoneTouched && phoneError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-error mt-2 flex items-center gap-1"
                >
                  <i className="fas fa-exclamation-triangle"></i>
                  {phoneError}
                </motion.p>
              )}

              {/* Подсказка */}
              {formData.phone !== '+7' && !phoneError && getDigitsCount() < 10 && (
                <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
                  <i className="fas fa-arrow-up text-accent"></i>
                  Осталось ввести {10 - getDigitsCount()} {getDigitsCount() === 9 ? 'цифру' : 'цифр'}
                </p>
              )}
            </div>

            {/* Марка авто */}
            {showCarField && (
              <div>
                <label htmlFor="car" className="block text-text-secondary text-sm font-medium mb-2">
                  Марка авто
                </label>
                <input
                  type="text"
                  id="car"
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary/50 transition-all hover:bg-bg-secondary/80"
                  placeholder="Например: BMW X5"
                  autoComplete="off"
                />
              </div>
            )}

            {/* Выбор услуги */}
            {showServiceSelect && (
              <div>
                <label htmlFor="service" className="block text-text-secondary text-sm font-medium mb-2">
                  Услуга
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary appearance-none cursor-pointer hover:bg-bg-secondary/80 transition-all"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="polish">✨ Полировка кузова</option>
                    <option value="ceramic">💎 Керамическое покрытие</option>
                    <option value="ppf">🛡️ Бронирование пленкой</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <i className="fas fa-chevron-down text-accent"></i>
                  </div>
                </div>
              </div>
            )}

            {/* 🤖 reCAPTCHA */}
            <div className="flex flex-col items-center my-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={handleCaptchaChange}
                theme="dark"
                hl="ru"
              />
              {captchaError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-2 flex items-center gap-1"
                >
                  <i className="fas fa-exclamation-circle"></i>
                  {captchaError}
                </motion.p>
              )}
            </div>

            {/* Скрытые поля */}
            <input type="hidden" name="selectedZones" value={formData.selectedZones} />
            <input type="hidden" name="totalPrice" value={formData.totalPrice} />

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.phone || formData.phone === '+7' || !!phoneError || !captchaValue}
              className="w-full py-4 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Отправка...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
                    Отправить заявку
                  </>
                )}
              </span>
              {!isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>

            {/* Статус сообщения */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-success/20 text-success rounded-xl text-center flex items-center justify-center gap-3 border border-success/30"
              >
                <div className="w-8 h-8 bg-success/30 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-success"></i>
                </div>
                <span className="font-medium">Спасибо! Мы свяжемся с вами в ближайшее время.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-error/20 text-error rounded-xl text-center flex items-center justify-center gap-3 border border-error/30"
              >
                <div className="w-8 h-8 bg-error/30 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation text-error"></i>
                </div>
                <span className="font-medium">Произошла ошибка. Пожалуйста, попробуйте позже.</span>
              </motion.div>
            )}
          </form>

          {/* Индикатор защиты */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-text-secondary opacity-50">
            <span className="flex items-center gap-1">
              <i className="fas fa-shield-alt text-accent"></i>
              Защита от спама
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-accent"></i>
              {Math.round((Date.now() - formStartTime) / 1000)} сек
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;