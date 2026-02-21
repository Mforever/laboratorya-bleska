import { useCallback } from 'react';
import { ContactFormData } from '../types';

export const useTelegram = () => {
  const sendMessage = useCallback(async (data: ContactFormData) => {
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram credentials not found');
      return false;
    }

    const message = `
🔔 Новая заявка с сайта!
👤 Имя: ${data.name || 'Не указано'}
📞 Телефон: ${data.phone}
🚗 Услуга: ${data.service || 'Не указана'}
🚘 Марка авто: ${data.car || 'Не указана'}
📧 Email: ${data.email || 'Не указан'}
💬 Сообщение: ${data.message || 'Нет'}
💰 Сумма: ${data.totalPrice ? data.totalPrice + ' ₽' : 'Не указана'}
📅 Дата: ${new Date().toLocaleString('ru-RU')}
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

      return response.ok;
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      return false;
    }
  }, []);

  return { sendMessage };
};