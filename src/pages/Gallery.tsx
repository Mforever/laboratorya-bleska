import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { GALLERY_ITEMS } from '../utils/constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'polish' | 'ceramic' | 'ppf'>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const filters = [
    { value: 'all', label: 'Все работы' },
    { value: 'polish', label: 'Полировка' },
    { value: 'ceramic', label: 'Керамика' },
    { value: 'ppf', label: 'Бронирование' },
  ];

  return (
    <>
      <Helmet>
        <title>Галерея работ | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Фото работ детейлинг студии Лаборатория блеска. Реальные примеры полировки, керамического покрытия и бронирования автомобилей."
        />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Галерея работ
          </h1>
          <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-12">
            Результаты нашей работы - фото "До" и "После" наших клиентов
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as any)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-accent text-bg-primary'
                    : 'border border-accent text-text-primary hover:bg-accent hover:text-bg-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-accent text-sm font-semibold">
                      {item.category === 'polish' ? 'Полировка' :
                       item.category === 'ceramic' ? 'Керамика' : 'Бронирование'}
                    </p>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-text-secondary text-sm">{item.beforeAfter}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-4xl text-white hover:text-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={GALLERY_ITEMS.find(i => i.id === selectedImage)?.image}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;