import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAR_ZONES } from '../../utils/constants';
import { CarZone } from '../../types';

interface CarProtectionCalculatorProps {
  onSelectionChange?: (selectedZones: string[], totalPrice: number) => void;
}

const CarProtectionCalculator: React.FC<CarProtectionCalculatorProps> = ({
  onSelectionChange,
}) => {
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());

  const handleZoneClick = (zone: CarZone) => {
    const newSelected = new Set(selectedZones);

    if (newSelected.has(zone.id)) {
      newSelected.delete(zone.id);
    } else {
      newSelected.add(zone.id);
    }

    setSelectedZones(newSelected);

    const totalPrice = Array.from(newSelected).reduce((sum, zoneId) => {
      const zone = CAR_ZONES.find(z => z.id === zoneId);
      return sum + (zone?.price || 0);
    }, 0);

    onSelectionChange?.(Array.from(newSelected), totalPrice);
  };

  const totalPrice = Array.from(selectedZones).reduce((sum, zoneId) => {
    const zone = CAR_ZONES.find(z => z.id === zoneId);
    return sum + (zone?.price || 0);
  }, 0);

  const resetSelection = () => {
    setSelectedZones(new Set());
    onSelectionChange?.([], 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Car Scheme */}
      <div className="lg:col-span-2 bg-bg-element rounded-xl p-6">
        <svg
          viewBox="0 0 800 300"
          className="w-full h-auto"
          style={{ backgroundColor: '#2A2A2A', borderRadius: '10px' }}
        >
          {/* Car Body */}
          <rect x="150" y="120" width="500" height="80" fill="#3A3A3A" stroke="#CCCCCC" strokeWidth="2" />

          {/* Protection Zones */}
          {CAR_ZONES.map((zone) => {
            let zoneProps = {};

            switch (zone.id) {
              case 'hood':
                zoneProps = { x: 150, y: 120, width: 150, height: 80 };
                break;
              case 'roof':
                zoneProps = { x: 300, y: 80, width: 200, height: 40 };
                break;
              case 'trunk':
                zoneProps = { x: 500, y: 120, width: 150, height: 80 };
                break;
              case 'doors':
                zoneProps = { x: 300, y: 120, width: 200, height: 80 };
                break;
              case 'bumper_front':
                zoneProps = { x: 100, y: 120, width: 50, height: 80 };
                break;
              case 'bumper_rear':
                zoneProps = { x: 650, y: 120, width: 50, height: 80 };
                break;
              default:
                return null;
            }

            return (
              <rect
                key={zone.id}
                {...zoneProps}
                className="cursor-pointer transition-all duration-300"
                fill={selectedZones.has(zone.id) ? '#91CB7D' : 'transparent'}
                fillOpacity={selectedZones.has(zone.id) ? 0.5 : 0}
                stroke="#91CB7D"
                strokeWidth="2"
                onClick={() => handleZoneClick(zone)}
                onMouseEnter={(e) => {
                  if (!selectedZones.has(zone.id)) {
                    e.currentTarget.setAttribute('stroke', '#FFFFFF');
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.setAttribute('stroke', '#91CB7D');
                }}
              />
            );
          })}

          {/* Wheels */}
          <circle cx="250" cy="200" r="30" fill="#2A2A2A" stroke="#CCCCCC" strokeWidth="2" />
          <circle cx="550" cy="200" r="30" fill="#2A2A2A" stroke="#CCCCCC" strokeWidth="2" />
        </svg>
      </div>

      {/* Calculator Panel */}
      <div className="bg-bg-element rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-accent">Выбранные зоны</h3>

        <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
          {selectedZones.size === 0 ? (
            <p className="text-text-secondary text-center py-4">
              Нажмите на зону автомобиля
            </p>
          ) : (
            Array.from(selectedZones).map((zoneId) => {
              const zone = CAR_ZONES.find(z => z.id === zoneId);
              return (
                <motion.div
                  key={zoneId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-3 bg-bg-secondary rounded-lg"
                >
                  <span className="text-text-secondary">{zone?.name}</span>
                  <span className="text-accent font-semibold">
                    {zone?.price.toLocaleString()} ₽
                  </span>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="border-t border-bg-secondary pt-4 mb-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Итого:</span>
            <span className="text-accent">{totalPrice.toLocaleString()} ₽</span>
          </div>
        </div>

        <button
          onClick={resetSelection}
          className="w-full py-3 border border-accent rounded-lg hover:bg-accent hover:text-bg-primary transition-colors"
        >
          Сбросить выбор
        </button>
      </div>
    </div>
  );
};

export default CarProtectionCalculator;