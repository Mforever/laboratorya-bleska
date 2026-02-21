// src/components/ppf/CarProtectionCalculator.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Интерфейс для зон
export interface CarZone {
  id: string;
  name: string;
  price: number;
  style: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  group?: string;
}

// Данные всех зон с точно настроенными координатами
export const CAR_ZONES: CarZone[] = [
  // Передняя часть
  {
    id: 'hood_full',
    name: 'Капот целиком',
    price: 8000,
    style: { top: '32%', left: '28%', width: '24%', height: '12%' }
  },
  {
    id: 'hood_stripe',
    name: 'Полоса на капот',
    price: 4000,
    style: { top: '28%', left: '28%', width: '24%', height: '4%' }
  },
  {
    id: 'bumper',
    name: 'Бампер',
    price: 7000,
    style: { top: '52%', left: '26%', width: '28%', height: '10%' }
  },
  {
    id: 'fenders_left',
    name: 'Левое крыло',
    price: 4500,
    style: { top: '32%', left: '22%', width: '6%', height: '20%' }
  },
  {
    id: 'fenders_right',
    name: 'Правое крыло',
    price: 4500,
    style: { top: '32%', left: '52%', width: '6%', height: '20%' }
  },

  // Оптика
  {
    id: 'optics_left',
    name: 'Левая фара',
    price: 2500,
    style: { top: '36%', left: '27%', width: '4%', height: '4%' }
  },
  {
    id: 'optics_right',
    name: 'Правая фара',
    price: 2500,
    style: { top: '36%', left: '49%', width: '4%', height: '4%' }
  },
  {
    id: 'ptf_left',
    name: 'Левая ПТФ',
    price: 1500,
    style: { top: '45%', left: '28%', width: '3%', height: '3%' }
  },
  {
    id: 'ptf_right',
    name: 'Правая ПТФ',
    price: 1500,
    style: { top: '45%', left: '48%', width: '3%', height: '3%' }
  },

  // Зеркала
  {
    id: 'mirror_left',
    name: 'Левое зеркало',
    price: 2000,
    style: { top: '20%', left: '26%', width: '4%', height: '6%' }
  },
  {
    id: 'mirror_right',
    name: 'Правое зеркало',
    price: 2000,
    style: { top: '20%', left: '50%', width: '4%', height: '6%' }
  },

  // Двери
  {
    id: 'doors_front',
    name: 'Передние двери',
    price: 12000,
    style: { top: '38%', left: '30%', width: '20%', height: '22%' }
  },
  {
    id: 'doors_rear',
    name: 'Задние двери',
    price: 10000,
    style: { top: '38%', left: '50%', width: '18%', height: '22%' }
  },

  // Ручки
  {
    id: 'handles_front_left',
    name: 'Передняя левая ручка',
    price: 800,
    style: { top: '48%', left: '35%', width: '3%', height: '2%' }
  },
  {
    id: 'handles_front_right',
    name: 'Передняя правая ручка',
    price: 800,
    style: { top: '48%', left: '55%', width: '3%', height: '2%' }
  },
  {
    id: 'handles_rear_left',
    name: 'Задняя левая ручка',
    price: 800,
    style: { top: '48%', left: '42%', width: '3%', height: '2%' }
  },
  {
    id: 'handles_rear_right',
    name: 'Задняя правая ручка',
    price: 800,
    style: { top: '48%', left: '62%', width: '3%', height: '2%' }
  },

  // Крыша и стойки
  {
    id: 'roof',
    name: 'Крыша',
    price: 6000,
    style: { top: '5%', left: '30%', width: '40%', height: '15%' }
  },
  {
    id: 'roof_stripe',
    name: 'Полоса на крышу',
    price: 3500,
    style: { top: '10%', left: '32%', width: '36%', height: '5%' }
  },
  {
    id: 'pillars_a',
    name: 'Передние стойки',
    price: 3000,
    style: { top: '18%', left: '32%', width: '6%', height: '10%' }
  },
  {
    id: 'pillars_b',
    name: 'Средние стойки',
    price: 3000,
    style: { top: '18%', left: '42%', width: '6%', height: '10%' }
  },
  {
    id: 'pillars_c',
    name: 'Задние стойки',
    price: 3000,
    style: { top: '18%', left: '52%', width: '6%', height: '10%' }
  },

  // Багажник
  {
    id: 'trunk',
    name: 'Багажник',
    price: 5000,
    style: { top: '32%', left: '68%', width: '10%', height: '12%' }
  }
];

interface CarProtectionCalculatorProps {
  onSelectionChange?: (selectedZones: string[], totalPrice: number) => void;
}

const CarProtectionCalculator: React.FC<CarProtectionCalculatorProps> = ({ onSelectionChange }) => {
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    const newSelected = new Set(selectedZones);
    if (newSelected.has(zoneId)) {
      newSelected.delete(zoneId);
    } else {
      newSelected.add(zoneId);
    }
    setSelectedZones(newSelected);

    const totalPrice = Array.from(newSelected).reduce((sum, id) => {
      const zone = CAR_ZONES.find(z => z.id === id);
      return sum + (zone?.price || 0);
    }, 0);
    onSelectionChange?.(Array.from(newSelected), totalPrice);
  };

  const totalPrice = Array.from(selectedZones).reduce((sum, id) => {
    const zone = CAR_ZONES.find(z => z.id === id);
    return sum + (zone?.price || 0);
  }, 0);

  const resetSelection = () => {
    setSelectedZones(new Set());
    onSelectionChange?.([], 0);
  };

  // Группировка выбранных зон для отображения
  const selectedZonesList = Array.from(selectedZones).map(zoneId => {
    const zone = CAR_ZONES.find(z => z.id === zoneId);
    return zone!;
  }).filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Схема автомобиля */}
      <div className="lg:col-span-2 bg-bg-element rounded-xl p-4">
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Основное изображение-подложка */}
          <img
            src="/images/car-scheme.jpg"
            alt="Схема бронирования автомобиля"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              // Если изображение не загрузилось, показываем заглушку
              e.currentTarget.src = 'https://via.placeholder.com/800x400/1A1A1A/91CB7D?text=Схема+автомобиля';
            }}
          />

          {/* Интерактивные зоны */}
          {CAR_ZONES.map((zone) => (
            <motion.div
              key={zone.id}
              className={`absolute cursor-pointer transition-all duration-200 rounded ${
                selectedZones.has(zone.id)
                  ? 'bg-accent/50 border-2 border-accent'
                  : hoveredZone === zone.id
                  ? 'bg-accent/30'
                  : 'bg-transparent hover:bg-accent/20'
              }`}
              style={{
                top: zone.style.top,
                left: zone.style.left,
                width: zone.style.width,
                height: zone.style.height,
              }}
              onClick={() => handleZoneClick(zone.id)}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              title={zone.name}
            >
              {/* Всплывающая подсказка при наведении */}
              {hoveredZone === zone.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-bg-primary text-text-primary text-xs rounded whitespace-nowrap z-20"
                >
                  {zone.name} - {zone.price.toLocaleString()} ₽
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Панель калькулятора */}
      <div className="bg-bg-element rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-accent">Выбранные зоны</h3>

        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto custom-scrollbar">
          {selectedZonesList.length === 0 ? (
            <p className="text-text-secondary text-center py-8">
              Нажмите на зону на схеме,<br />чтобы добавить её в расчет
            </p>
          ) : (
            selectedZonesList.map((zone) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex justify-between items-center p-3 bg-bg-secondary rounded-lg group"
              >
                <span className="text-text-secondary text-sm flex-1">{zone.name}</span>
                <span className="text-accent font-semibold mr-3">{zone.price.toLocaleString()} ₽</span>
                <button
                  onClick={() => handleZoneClick(zone.id)}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </motion.div>
            ))
          )}
        </div>

        <div className="border-t border-bg-secondary pt-4 mb-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Итого:</span>
            <span className="text-accent">{totalPrice.toLocaleString()} ₽</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetSelection}
            className="flex-1 py-3 border border-accent rounded-lg hover:bg-accent hover:text-bg-primary transition-colors"
          >
            Сбросить
          </button>
          <button
            onClick={() => {
              // Прокрутка к форме
              document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-colors font-medium"
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarProtectionCalculator;