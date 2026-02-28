import { useCallback } from 'react';

interface ContactFormData {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  message?: string;
  selectedZones?: string;
  totalPrice?: number;
}

export const useTelegram = () => {
  const sendMessage = useCallback(async (data: ContactFormData) => {
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Ошибка: TELEGRAM_TOKEN или CHAT_ID не найдены');
      return false;
    }

    const formatPhone = (phone: string): string => {
      if (!phone || phone === '+7') return 'Не указан';
      const digits = phone.replace(/\D/g, '');
      if (digits.length === 11) {
        return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
      }
      return phone;
    };

    const getServiceName = (service: string): string => {
      const services: Record<string, string> = {
        'polish': 'Полировка кузова',
        'ceramic': 'Керамическое покрытие',
        'ppf': 'Бронирование пленкой',
        '': 'Не указана'
      };
      return services[service] || service;
    };

    const requestId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = new Date();

    const message = `
🔔 <b>Новая заявка #${requestId}</b>

👤 <b>Имя:</b> ${data.name || 'Не указано'}
📞 <b>Телефон:</b> ${formatPhone(data.phone)}
🚗 <b>Услуга:</b> ${getServiceName(data.service || '')}
🚘 <b>Авто:</b> ${data.car || 'Не указано'}
💬 <b>Вопрос:</b> ${data.message || 'Нет'}

${data.totalPrice ? `💰 <b>Сумма:</b> ${data.totalPrice.toLocaleString()} ₽` : ''}
${data.selectedZones ? `📋 <b>Зоны:</b> ${data.selectedZones}` : ''}

📅 <b>Время:</b> ${now.toLocaleString('ru-RU')}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('❌ Ошибка отправки:', error);
      return false;
    }
  }, []);

  return { sendMessage };
};