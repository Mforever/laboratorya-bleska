// src/components/ui/YClientsWidget.tsx
import React, { useEffect, useRef } from 'react';

interface YClientsWidgetProps {
  formId: number; // ID формы из YCLIENTS
  buttonText?: string;
  className?: string;
  variant?: 'button' | 'inline';
}

const YClientsWidget: React.FC<YClientsWidgetProps> = ({
  formId,
  buttonText = 'Записаться онлайн',
  className = '',
  variant = 'button'
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем скрипт YCLIENTS
    const script = document.createElement('script');
    script.src = 'https://widget.yclients.com/widget.js';
    script.async = true;
    script.onload = () => {
      if (window.yclients && widgetRef.current) {
        window.yclients.init(widgetRef.current, {
          formId: formId,
          companyName: 'Лаборатория блеска',
          city: 'Омск',
          address: 'ул. Индустриальная, 5Б',
          phone: '+79620555858',
          theme: 'dark', // под наш темный дизайн
          primaryColor: '#91CB7D', // акцентный цвет
          textColor: '#FFFFFF',
          backgroundColor: '#0A0A0A',
          buttonText: buttonText,
          services: [
            { id: 'polish', name: 'Полировка кузова' },
            { id: 'ceramic', name: 'Керамическое покрытие' },
            { id: 'ppf', name: 'Бронирование пленкой' }
          ]
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [formId, buttonText]);

  if (variant === 'button') {
    return (
      <button
        className={`px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-lg transition-all duration-300 hover:scale-105 ${className}`}
        onClick={() => {
          if (window.yclients) {
            window.yclients.open(formId);
          }
        }}
      >
        {buttonText}
      </button>
    );
  }

  return <div ref={widgetRef} className={className} />;
};

// Добавляем типы для window.yclients
declare global {
  interface Window {
    yclients: {
      init: (element: HTMLElement, config: any) => void;
      open: (formId: number) => void;
    };
  }
}

export default YClientsWidget;