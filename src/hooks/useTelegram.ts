// src/hooks/useTelegram.ts
import { useCallback } from 'react';

interface ContactFormData {
  name: string;
  phone: string;
  car?: string;
  service?: string;
  selectedZones?: string;
  totalPrice?: number;
}

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export const useTelegram = () => {
  /**
   * 🛡️ ПРОВЕРКА НА СПАМ
   * Многоуровневая система фильтрации нежелательных сообщений
   */
  const checkForSpam = useCallback((data: ContactFormData): SpamCheckResult => {
    // 1. ПРОВЕРКА TELEGRAM-ССЫЛОК
    const telegramPatterns = [
      /t\.me\//i,
      /telegram\.me\//i,
      /@[a-zA-Z0-9_]{5,}/i,
      /t me/i,
      /telegram/i
    ];

    for (const pattern of telegramPatterns) {
      if (pattern.test(data.name) || pattern.test(data.car || '')) {
        return { isSpam: true, reason: 'Обнаружена Telegram-ссылка' };
      }
    }

    // 2. ПРОВЕРКА ВРЕДОНОСНЫХ ССЫЛОК
    const maliciousPatterns = [
      /bit\.ly\//i,
      /goo\.gl\//i,
      /tinyurl\.com\//i,
      /vk\.com\//i,
      /ok\.ru\//i,
      /instagram\.com\//i,
      /facebook\.com\//i,
      /https?:\/\//i,
      /www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i,
      /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[a-zA-Z0-9]+/i,
      /click here/i,
      /buy now/i,
      /cheap/i,
      /discount/i,
      /offer/i
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(data.name) || pattern.test(data.car || '')) {
        return { isSpam: true, reason: 'Обнаружена подозрительная ссылка' };
      }
    }

    // 3. ПРОВЕРКА НА МАТ И НЕЦЕНЗУРНУЮ ЛЕКСИКУ
    const profanityPatterns = [
      /хуй|хуя|хуе|пизд|бля|ебл|ебан|сука|гандон|мудак|пидор|расист|нацист/i,
      /fuck|shit|asshole|bitch|dick|cunt|nigger|fag/i
    ];

    for (const pattern of profanityPatterns) {
      if (pattern.test(data.name) || pattern.test(data.car || '')) {
        return { isSpam: true, reason: 'Обнаружена нецензурная лексика' };
      }
    }

    // 4. ПРОВЕРКА НА ПОВТОРЯЮЩИЕСЯ СИМВОЛЫ (СПАМ)
    const repeatedCharsPattern = /(.)\1{4,}/;
    if (repeatedCharsPattern.test(data.name) || repeatedCharsPattern.test(data.car || '')) {
      return { isSpam: true, reason: 'Обнаружены повторяющиеся символы' };
    }

    // 5. ПРОВЕРКА НА СЛИШКОМ ДЛИННОЕ ИМЯ
    if (data.name && data.name.length > 50) {
      return { isSpam: true, reason: 'Слишком длинное имя' };
    }

    // 6. ПРОВЕРКА НА ИЕРОГЛИФЫ (АЗИАТСКИЙ СПАМ)
    const asianCharsPattern = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
    if (asianCharsPattern.test(data.name) || asianCharsPattern.test(data.car || '')) {
      return { isSpam: true, reason: 'Обнаружены иероглифы' };
    }

    // 7. ПРОВЕРКА НА КИРИЛЛИЦУ В ТРАНСЛИТЕ (ЧАСТО СПАМ)
    const translitPatterns = [
      /privet|zdravstvui|spasibo|pozhaluista|davai/i,
      /kupit|prodazha|cena|skidka|besplatno/i,
      /rabota|zarplata|dengi|bystro|vygodno/i
    ];

    for (const pattern of translitPatterns) {
      if (pattern.test(data.name) || pattern.test(data.car || '')) {
        return { isSpam: true, reason: 'Обнаружен транслит' };
      }
    }

    // 8. ПРОВЕРКА НА ТЕЛЕФОННЫЕ НОМЕРА В ИМЕНИ
    const phoneInNamePattern = /\+?\d{7,}/;
    if (phoneInNamePattern.test(data.name)) {
      return { isSpam: true, reason: 'Телефонный номер в имени' };
    }

    // 9. ПРОВЕРКА НА ТОЛЬКО ЦИФРЫ В ИМЕНИ
    const onlyDigitsPattern = /^\d+$/;
    if (onlyDigitsPattern.test(data.name.replace(/\s/g, ''))) {
      return { isSpam: true, reason: 'Имя состоит только из цифр' };
    }

    // 10. ПРОВЕРКА НА СПАМ-СЛОВА
    const spamWords = [
      'seo', 'продвижение', 'раскрутка', 'сайт', 'услуги',
      'массаж', 'знакомства', 'казино', 'вулкан', 'азино',
      'заработок', 'инвестиции', 'криптовалюта', 'биткоин',
      'работа на дому', 'фриланс', 'копирайтинг',
      'наращивание', 'маникюр', 'косметолог',
      'продажа', 'куплю', 'обмен', 'услуги'
    ];

    const lowerName = data.name?.toLowerCase() || '';
    const lowerCar = data.car?.toLowerCase() || '';

    for (const word of spamWords) {
      if (lowerName.includes(word) || lowerCar.includes(word)) {
        return { isSpam: true, reason: `Обнаружено спам-слово: ${word}` };
      }
    }

    // Все проверки пройдены
    return { isSpam: false };
  }, []);

  /**
   * 📊 ФОРМАТИРОВАНИЕ НОМЕРА ТЕЛЕФОНА
   */
  const formatPhoneNumber = useCallback((phone: string): string => {
    if (!phone || phone === '+7') return 'Не указан';

    // Оставляем только цифры
    const digits = phone.replace(/\D/g, '');

    if (digits.length === 11) {
      // Российский формат: +7 (XXX) XXX-XX-XX
      return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
    }

    return phone;
  }, []);

  /**
   * 🎨 ПОЛУЧЕНИЕ ИМЕНИ УСЛУГИ
   */
  const getServiceName = useCallback((service: string): string => {
    const services: Record<string, string> = {
      'polish': '✨ Полировка кузова',
      'ceramic': '💎 Керамическое покрытие',
      'ppf': '🛡️ Бронирование пленкой',
      '': 'Не указана'
    };
    return services[service] || service;
  }, []);

  /**
   * 📝 ФОРМАТИРОВАНИЕ ЗОН
   */
  const formatZones = useCallback((zonesString: string): string => {
    if (!zonesString || zonesString.trim() === '') return 'Не выбраны';

    const zones = zonesString.split(',').map(z => z.trim());

    if (zones.length === 0) return 'Не выбраны';

    // Если зон много, показываем первые 5 и счетчик
    if (zones.length > 5) {
      const firstFive = zones.slice(0, 5).join(', ');
      return `${firstFive} и еще ${zones.length - 5} зон`;
    }

    return zones.join(', ');
  }, []);

  /**
   * 🚀 ОСНОВНАЯ ФУНКЦИЯ ОТПРАВКИ СООБЩЕНИЯ
   */
  const sendMessage = useCallback(async (data: ContactFormData) => {
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Проверка наличия токенов
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Ошибка: TELEGRAM_TOKEN или CHAT_ID не найдены в .env файле!');
      return false;
    }

    // 🛡️ ПРОВЕРКА НА СПАМ
    const spamCheck = checkForSpam(data);
    if (spamCheck.isSpam) {
      console.log('🚫 СПАМ ОБНАРУЖЕН:', spamCheck.reason);

      // Отправляем уведомление о спаме в отдельный чат (опционально)
      try {
        const spamAlert = `
⚠️ <b>ПОПЫТКА СПАМА!</b>

🚫 <b>Причина:</b> ${spamCheck.reason}
👤 <b>Имя:</b> ${data.name || 'Не указано'}
📞 <b>Телефон:</b> ${data.phone || 'Не указан'}
📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
        `;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: spamAlert,
            parse_mode: 'HTML',
          }),
        });
      } catch (error) {
        console.error('Ошибка при отправке уведомления о спаме:', error);
      }

      return false;
    }

    // Форматируем данные для красивого отображения
    const formattedPhone = formatPhoneNumber(data.phone);
    const serviceName = getServiceName(data.service || '');
    const formattedZones = formatZones(data.selectedZones || '');

    // Текущая дата и время в разных форматах
    const now = new Date();
    const dateTime = now.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const date = now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const time = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // ID заявки (уникальный)
    const requestId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Формируем красивое сообщение с эмодзи и HTML-разметкой
    const message = `
🔔 <b>🔥 НОВАЯ ЗАЯВКА #${requestId}</b>

━━━━━━━━━━━━━━━━━━━━━

👤 <b>КЛИЕНТ:</b>
   ├─ <b>Имя:</b> ${data.name || 'Не указано'}
   ├─ <b>Телефон:</b> <code>${formattedPhone}</code>
   └─ <b>Авто:</b> ${data.car || 'Не указана'}

━━━━━━━━━━━━━━━━━━━━━

📋 <b>УСЛУГА:</b>
   └─ ${serviceName}

${data.totalPrice ? `
💰 <b>СТОИМОСТЬ:</b>
   └─ <b>${data.totalPrice.toLocaleString()} ₽</b>
` : ''}

${data.selectedZones ? `
📌 <b>ВЫБРАННЫЕ ЗОНЫ:</b>
   └─ ${formattedZones}
` : ''}

━━━━━━━━━━━━━━━━━━━━━

📅 <b>ДЕТАЛИ:</b>
   ├─ <b>Дата:</b> ${date}
   ├─ <b>Время:</b> ${time}
   └─ <b>ID:</b> <code>${requestId}</code>

━━━━━━━━━━━━━━━━━━━━━
`;

    try {
      // Отправляем основное сообщение
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        console.log(`✅ Заявка #${requestId} успешно отправлена в Telegram`);

        // 🎯 Отправляем уведомление админу (если нужно отдельно)
        // Можно раскомментировать для отправки в личные сообщения
        /*
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: 'АЙДИ_АДМИНА', // Заменить на ID админа
            text: `🔔 Новая заявка #${requestId}\n👤 ${data.name || 'Не указано'}\n📞 ${formattedPhone}`,
            parse_mode: 'HTML',
          }),
        });
        */

        return true;
      } else {
        console.error('❌ Ошибка Telegram API:', result);
        return false;
      }
    } catch (error) {
      console.error('❌ Ошибка при отправке запроса:', error);
      return false;
    }
  }, [checkForSpam, formatPhoneNumber, getServiceName, formatZones]);

  return { sendMessage };
};

export default useTelegram;