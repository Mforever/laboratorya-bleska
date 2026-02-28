import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Типы для галереи
type MediaType = 'image' | 'video';

interface GalleryItem {
  id: number;
  title: string;
  carModel: string;
  mediaType: MediaType;
  // Для изображений
  beforeImage?: string;
  afterImage?: string;
  // Для видео
  videoUrl?: string;
  videoPlatform?: 'vk' | 'rutube';
  videoThumbnail?: string;
  description?: string;
}

// Данные галереи
const GALLERY_ITEMS: GalleryItem[] = [
  // Изображения
  {
    id: 1,
    title: 'Глубокая полировка',
    carModel: 'BMW X5 (2022)',
    mediaType: 'image',
    beforeImage: '/images/gallery/bmw-x5-before.jpg',
    afterImage: '/images/gallery/bmw-x5-after.jpg',
    description: 'Полное восстановление ЛКП, удаление голограмм и царапин'
  },
  {
    id: 2,
    title: 'Керамическое покрытие',
    carModel: 'Porsche Cayenne',
    mediaType: 'image',
    beforeImage: '/images/gallery/porsche-before.jpg',
    afterImage: '/images/gallery/porsche-after.jpg',
    description: 'Нанесение керамики премиум-класса, гидрофобный эффект'
  },

  // Видео из VK
  {
    id: 3,
    title: 'Процесс бронирования пленкой',
    carModel: 'Tesla Model 3',
    mediaType: 'video',
    videoPlatform: 'vk',
    videoUrl: 'https://vkvideo.ru/video_ext.php?oid=-129361201&id=456239704&hash=90762eef11e08548&hd=3',
    videoThumbnail: '/images/gallery/tesla-ppf-preview.jpg',
    description: 'Пошаговый процесс оклейки защитной пленкой'
  },
  {
    id: 4,
    title: 'Восстановление после зимы',
    carModel: 'Mercedes E-Class',
    mediaType: 'image',
    beforeImage: '/images/gallery/mercedes-before.jpg',
    afterImage: '/images/gallery/mercedes-after.jpg',
    description: 'Удаление зимних дефектов, защитная полировка'
  },

  // Видео из Rutube
  {
    id: 5,
    title: 'Керамическое покрытие',
    carModel: 'Lexus LX 600',
    mediaType: 'video',
    videoPlatform: 'rutube',
    videoUrl: 'https://rutube.ru/play/embed/9e4cd81a6b2566e9d949881dbb53905e/',
    videoThumbnail: '/images/gallery/lexus-ceramic-preview.jpg',
    description: 'Двухслойное керамическое покрытие, защита на 3 года'
  },
  {
    id: 6,
    title: 'Полная оклейка пленкой',
    carModel: 'BMW X7',
    mediaType: 'image',
    beforeImage: '/images/gallery/bmw-x7-before.jpg',
    afterImage: '/images/gallery/bmw-x7-after.jpg',
    description: 'Бронирование всего кузова премиальной пленкой'
  }
];

// Компонент индикатора загрузки
const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
    </div>
    <p className="text-text-secondary text-sm mt-4">Загрузка...</p>
  </div>
);

// Компонент для изображения с состоянием загрузки
const ImageWithLoader: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-bg-secondary"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-accent mb-3"></i>
          <p className="text-text-secondary text-sm">Не удалось загрузить изображение</p>
        </div>
      ) : (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

// Компонент для превью видео
const VideoPreview: React.FC<{
  item: GalleryItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const getPlatformIcon = () => {
    switch (item.videoPlatform) {
      case 'vk':
        return 'fab fa-vk';
      case 'rutube':
        return 'fas fa-play-circle';
      default:
        return 'fas fa-play';
    }
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-bg-secondary"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        {item.videoThumbnail ? (
          <img
            src={item.videoThumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-bg-element flex items-center justify-center">
            <i className={`${getPlatformIcon()} text-5xl text-accent/50`}></i>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 bg-accent text-bg-primary text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <i className="fas fa-play text-xs"></i>
          <span>Видео</span>
        </div>

        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <i className={getPlatformIcon()}></i>
          <span>{item.videoPlatform === 'vk' ? 'VK Видео' : 'Rutube'}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center">
            <i className="fas fa-play text-2xl text-bg-primary ml-1"></i>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
        <p className="text-accent text-sm mb-2">{item.carModel}</p>
        <p className="text-text-secondary text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

// Компонент для модального окна с видео
const VideoModal: React.FC<{
  item: GalleryItem;
  onClose: () => void;
}> = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-xl"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            src={item.videoUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title={item.title}
            className="w-full h-full"
          />
        </div>

        <div className="mt-4 text-white">
          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
          <p className="text-accent mb-2">{item.carModel}</p>
          <p className="text-white/80">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setImageError(false);
    if (item.mediaType === 'image') {
      setShowBefore(true);
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    setImageError(false);
  };

  const nextItem = () => {
    const newIndex = (selectedIndex + 1) % GALLERY_ITEMS.length;
    setSelectedIndex(newIndex);
    setSelectedItem(GALLERY_ITEMS[newIndex]);
    setImageError(false);
    if (GALLERY_ITEMS[newIndex].mediaType === 'image') {
      setShowBefore(true);
    }
  };

  const prevItem = () => {
    const newIndex = (selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedIndex(newIndex);
    setSelectedItem(GALLERY_ITEMS[newIndex]);
    setImageError(false);
    if (GALLERY_ITEMS[newIndex].mediaType === 'image') {
      setShowBefore(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20"
    >
      <Helmet>
        <title>Наши работы | Лаборатория блеска Омск</title>
        <meta
          name="description"
          content="Реальные примеры работ детейлинг-студии. Фото и видео до и после полировки, керамического покрытия и бронирования."
        />
      </Helmet>

      <div className="container-custom">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-[0.2em] mb-4">
            Портфолио
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Наши работы
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Результаты нашей работы в фото и видео. Смотрите, как меняются автомобили после детейлинга.
          </p>
        </motion.div>

        {/* Сетка галереи */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.mediaType === 'video' ? (
                <VideoPreview item={item} onClick={() => handleItemClick(item, index)} />
              ) : (
                <div
                  className="bg-bg-element rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 cursor-pointer"
                  onClick={() => handleItemClick(item, index)}
                >
                  <div className="relative aspect-video overflow-hidden bg-bg-secondary">
                    <ImageWithLoader
                      src={item.afterImage || ''}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-accent text-bg-primary text-xs font-bold px-2 py-1 rounded">
                      До/После
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-accent text-sm mb-2">{item.carModel}</p>
                    <p className="text-text-secondary text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Модальное окно */}
        <AnimatePresence>
          {selectedItem && (
            <>
              {/* Затемнение */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-black/95 z-50"
              />

              {selectedItem.mediaType === 'video' ? (
                <VideoModal item={selectedItem} onClose={handleClose} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                >
                  <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col pointer-events-auto">
                    {/* Шапка с кнопками */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <button
                          onClick={prevItem}
                          className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          onClick={nextItem}
                          className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-10 h-10 bg-white/10 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    {/* Переключатель До/После */}
                    <div className="flex justify-center gap-4 mb-4">
                      <button
                        onClick={() => setShowBefore(true)}
                        className={`px-8 py-3 rounded-lg font-medium transition-all min-w-[120px] ${
                          showBefore
                            ? 'bg-accent text-bg-primary'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        До
                      </button>
                      <button
                        onClick={() => setShowBefore(false)}
                        className={`px-8 py-3 rounded-lg font-medium transition-all min-w-[120px] ${
                          !showBefore
                            ? 'bg-accent text-bg-primary'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        После
                      </button>
                    </div>

                    {/* Контейнер для изображения с адаптацией */}
                    <div className="flex-1 min-h-0 bg-bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        {imageError ? (
                          <div className="text-center">
                            <i className="fas fa-image text-6xl text-text-secondary/30 mb-4"></i>
                            <p className="text-text-secondary">Изображение не загрузилось</p>
                          </div>
                        ) : (
                          <img
                            src={showBefore ? selectedItem.beforeImage : selectedItem.afterImage}
                            alt={selectedItem.title}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                            onError={() => setImageError(true)}
                          />
                        )}
                        <div className="absolute bottom-4 right-4 text-white/30 text-xs font-bold bg-black/20 px-2 py-1 rounded">
                          @laboratorya_bleska
                        </div>
                      </div>
                    </div>

                    {/* Информация под фото */}
                    <div className="mt-4 text-white bg-black/20 p-4 rounded-lg backdrop-blur-sm">
                      <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                      <p className="text-accent mb-2">{selectedItem.carModel}</p>
                      <p className="text-white/80">{selectedItem.description}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Gallery;