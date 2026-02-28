import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Интерфейс для зон бронирования
export interface CarZone {
  id: string;
  name: string;
  price: number;
  category: 'front' | 'rear' | 'doors' | 'interior' | 'all';
  popular?: boolean;
}

// Интерфейс для ракурсов
interface ViewAngle {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
}

// Данные всех зон
export const CAR_ZONES: CarZone[] = [
  // ПЕРЕДНЯЯ ЧАСТЬ
  { id: 'hood', name: 'Капот', price: 8000, category: 'front', popular: true },
  { id: 'hood_stripe', name: 'Полоса на капот', price: 4000, category: 'front' },
  { id: 'bumper_front', name: 'Передний бампер', price: 7000, category: 'front', popular: true },
  { id: 'grille', name: 'Решетка радиатора', price: 3000, category: 'front' },
  { id: 'headlights', name: 'Фары (2 шт)', price: 5000, category: 'front', popular: true },
  { id: 'fog_lights', name: 'ПТФ (2 шт)', price: 3000, category: 'front' },
  { id: 'fenders_front', name: 'Передние крылья (2 шт)', price: 8000, category: 'front', popular: true },

  // ЗАДНЯЯ ЧАСТЬ
  { id: 'trunk', name: 'Багажник', price: 5000, category: 'rear', popular: true },
  { id: 'bumper_rear', name: 'Задний бампер', price: 7000, category: 'rear', popular: true },
  { id: 'taillights', name: 'Фонари (2 шт)', price: 4000, category: 'rear' },
  { id: 'fenders_rear', name: 'Задние крылья (2 шт)', price: 8000, category: 'rear' },

  // ДВЕРНЫЕ ПРОЕМЫ
  { id: 'doors_front', name: 'Передние двери (2 шт)', price: 10000, category: 'doors', popular: true },
  { id: 'doors_rear', name: 'Задние двери (2 шт)', price: 9000, category: 'doors' },
  { id: 'handles', name: 'Ручки дверей (4 шт)', price: 3000, category: 'doors' },
  { id: 'mirrors', name: 'Зеркала (2 шт)', price: 4000, category: 'doors', popular: true },
  { id: 'rockers', name: 'Пороги', price: 5000, category: 'doors', popular: true },
  { id: 'pillars', name: 'Стойки (комплект)', price: 6000, category: 'doors' },

  // САЛОН АВТО
  { id: 'roof', name: 'Крыша', price: 6000, category: 'interior' },
  { id: 'roof_stripe', name: 'Полоса на крышу', price: 3500, category: 'interior' },
  { id: 'trunk_interior', name: 'Багажник (внутри)', price: 4000, category: 'interior' },
  { id: 'door_sills', name: 'Пороги (внутри)', price: 3000, category: 'interior' },
  { id: 'dashboard', name: 'Панель приборов', price: 5000, category: 'interior' }
];

// Данные ракурсов с путями к изображениям
const VIEW_ANGLES: ViewAngle[] = [
  {
    id: 'front',
    name: 'Передняя часть',
    image: '/images/car-front.jpg',
    icon: 'fas fa-car-side',
    description: 'Капот, бампер, фары, передние крылья'
  },
  {
    id: 'rear',
    name: 'Задняя часть',
    image: '/images/car-rear.jpg',
    icon: 'fas fa-car',
    description: 'Багажник, задний бампер, фонари'
  },
  {
    id: 'doors',
    name: 'Дверные проемы',
    image: '/images/car-doors.jpg',
    icon: 'fas fa-car-side',
    description: 'Двери, ручки, зеркала, пороги'
  },
  {
    id: 'interior',
    name: 'Салон авто',
    image: '/images/car-interior.jpg',
    icon: 'fas fa-couch',
    description: 'Крыша, салон, внутренние элементы'
  },
  {
    id: 'all',
    name: 'Все зоны',
    image: '/images/car-all.jpg',
    icon: 'fas fa-car',
    description: 'Полная защита автомобиля'
  }
];

interface CarProtectionCalculatorProps {
  onSelectionChange?: (selectedZones: string[], totalPrice: number) => void;
}

const CarProtectionCalculator: React.FC<CarProtectionCalculatorProps> = ({ onSelectionChange }) => {
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState<string>('all');

  // Получение зон для текущего ракурса
  const getZonesForCurrentView = () => {
    if (activeView === 'all') {
      return CAR_ZONES;
    }
    return CAR_ZONES.filter(zone => zone.category === activeView);
  };

  // Расчет общей стоимости
  const calculateTotalPrice = (zones: Set<string>): number => {
    return Array.from(zones).reduce((sum, zoneId) => {
      const zone = CAR_ZONES.find(z => z.id === zoneId);
      return sum + (zone?.price || 0);
    }, 0);
  };

  // Обработка выбора зоны
  const handleZoneToggle = (zoneId: string) => {
    const newSelected = new Set(selectedZones);

    if (newSelected.has(zoneId)) {
      newSelected.delete(zoneId);
    } else {
      newSelected.add(zoneId);
    }

    setSelectedZones(newSelected);
    const totalPrice = calculateTotalPrice(newSelected);
    onSelectionChange?.(Array.from(newSelected), totalPrice);
  };

  // Выбор всех зон текущего ракурса
  const selectAllCurrentView = () => {
    const currentZoneIds = getZonesForCurrentView().map(z => z.id);
    const newSelected = new Set(selectedZones);

    // Добавляем все зоны текущего ракурса
    currentZoneIds.forEach(id => newSelected.add(id));

    setSelectedZones(newSelected);
    const totalPrice = calculateTotalPrice(newSelected);
    onSelectionChange?.(Array.from(newSelected), totalPrice);
  };

  // Выбор популярных зон
  const selectPopularZones = () => {
    const popularIds = CAR_ZONES.filter(z => z.popular).map(z => z.id);
    setSelectedZones(new Set(popularIds));
    const totalPrice = calculateTotalPrice(new Set(popularIds));
    onSelectionChange?.(popularIds, totalPrice);
  };

  // Сброс выбора
  const resetSelection = () => {
    setSelectedZones(new Set());
    onSelectionChange?.([], 0);
  };

  const currentZones = getZonesForCurrentView();
  const currentViewData = VIEW_ANGLES.find(v => v.id === activeView) || VIEW_ANGLES[0];
  const totalPrice = calculateTotalPrice(selectedZones);
  const selectedCount = selectedZones.size;

  return (
    <div className="space-y-8">
      {/* ЗАГОЛОВОК */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Конструктор бронирования
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Выберите ракурс, отметьте нужные зоны — цены ориентировочные,
          точная стоимость после осмотра
        </p>
      </div>

      {/* ПЕРЕКЛЮЧАТЕЛЬ РАКУРСОВ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {VIEW_ANGLES.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`p-3 rounded-lg transition-all ${
              activeView === view.id
                ? 'bg-accent text-bg-primary shadow-lg scale-105'
                : 'bg-bg-element text-text-secondary hover:bg-accent/20'
            }`}
          >
            <i className={`${view.icon} text-xl mb-1 block`}></i>
            <span className="text-xs font-medium">{view.name}</span>
          </button>
        ))}
      </div>

      {/* КАРТИНКА ТЕКУЩЕГО РАКУРСА */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-bg-element rounded-xl p-4"
        >
          <div className="relative max-w-3xl mx-auto">
            <img
              src={currentViewData.image}
              alt={currentViewData.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />

            {/* Подпись к картинке */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
              <div className="text-white">
                <h4 className="font-bold">{currentViewData.name}</h4>
                <p className="text-sm text-white/80">{currentViewData.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ИНФОРМАЦИЯ О ВЫБРАННЫХ ЗОНАХ */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-bg-element rounded-lg p-4">
        <div>
          <div className="text-sm text-text-secondary mb-1">
            Выбрано зон: <span className="text-accent font-bold">{selectedCount}</span>
          </div>
          <div className="text-2xl font-bold">
            <span className="text-accent">{totalPrice.toLocaleString()}</span>
            <span className="text-text-secondary ml-1 text-lg">₽</span>
          </div>
          <div className="text-xs text-text-secondary mt-1">
            * Ориентировочная стоимость
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={selectAllCurrentView}
            className="px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-sm font-medium"
          >
            Выбрать все в этом ракурсе
          </button>
          <button
            onClick={selectPopularZones}
            className="px-4 py-2 border border-accent rounded-lg hover:bg-accent hover:text-bg-primary transition-colors text-sm font-medium"
          >
            Популярные
          </button>
          <button
            onClick={resetSelection}
            disabled={selectedCount === 0}
            className="px-4 py-2 border border-text-secondary/30 rounded-lg hover:border-accent transition-colors text-sm font-medium disabled:opacity-50"
          >
            Сброс
          </button>
        </div>
      </div>

      {/* СПИСОК ЗОН ДЛЯ ТЕКУЩЕГО РАКУРСА */}
      <div className="bg-bg-element rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <i className="fas fa-list text-accent"></i>
          Зоны {currentViewData.name.toLowerCase()}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentZones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-bg-secondary rounded-lg p-3 cursor-pointer transition-all ${
                selectedZones.has(zone.id)
                  ? 'ring-2 ring-accent'
                  : 'hover:bg-accent/10'
              }`}
              onClick={() => handleZoneToggle(zone.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  selectedZones.has(zone.id)
                    ? 'bg-accent text-bg-primary'
                    : 'border border-text-secondary'
                }`}>
                  {selectedZones.has(zone.id) && (
                    <i className="fas fa-check text-xs"></i>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{zone.name}</span>
                    {zone.popular && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                        популярно
                      </span>
                    )}
                  </div>
                  <div className="text-accent text-sm font-semibold">
                    {zone.price.toLocaleString()} ₽
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {currentZones.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <i className="fas fa-info-circle text-2xl mb-2 opacity-30"></i>
            <p>Нет доступных зон для этого ракурса</p>
          </div>
        )}
      </div>

      {/* ПРИМЕЧАНИЕ */}
      <div className="bg-accent/5 rounded-lg p-4 text-center">
        <p className="text-sm text-text-secondary">
          <i className="fas fa-info-circle text-accent mr-2"></i>
          Цены на сайте носят информационный характер. Точная стоимость рассчитывается
          после осмотра автомобиля и зависит от сложности работ, состояния кузова и выбранных материалов.
        </p>
      </div>
    </div>
  );
};

export default CarProtectionCalculator;