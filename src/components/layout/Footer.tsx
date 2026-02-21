import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-accent">Лаборатория</span>
              <span> блеска</span>
            </h3>
            <p className="text-text-secondary">
              Премиальный детейлинг в Омске
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Меню</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Главная
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/polish')}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Полировка
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/ceramic')}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Керамика
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/ppf')}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Бронирование
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/gallery')}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Галерея
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+79620555858" className="text-text-secondary hover:text-accent transition-colors">
                  +7 (962) 055-58-58
                </a>
              </li>
              <li>
                <a href="mailto:mforever040@gmail.com" className="text-text-secondary hover:text-accent transition-colors">
                  mforever040@gmail.com
                </a>
              </li>
              <li className="text-text-secondary">
                Омск, Индустриальная 5Б
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex space-x-4">
              <a
                href="https://t.me/rudenko_ds"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-bg-element rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-colors"
              >
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-bg-element rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-bg-element rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-colors"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-bg-element mt-8 pt-8 text-center text-text-secondary">
          <p>&copy; 2024 Лаборатория блеска. Все права защищены.</p>
          <button
            onClick={() => handleNavigation('/privacy')}
            className="text-sm hover:text-accent transition-colors mt-2 inline-block"
          >
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;