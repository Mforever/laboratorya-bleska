import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Даем время на загрузку страницы
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Если нет хэша, скроллим наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
};