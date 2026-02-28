import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary py-12">
      <div className="container-custom">
        {/* Верхняя часть с логотипом и соцсетями */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Logo variant="light" showText={true} />

          <div className="flex gap-4">
            <a
              href="https://t.me/rudenko_ds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-bg-element rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-all"
              aria-label="Telegram"
            >
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a
              href="https://wa.me/79620555858"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-bg-element rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-all"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-bg-element rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-bg-primary transition-all"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Основные ссылки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10">
          <div>
            <h4 className="font-semibold text-sm text-text-primary mb-3">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/')} className="text-text-secondary hover:text-accent text-sm">
                  Главная
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/gallery')} className="text-text-secondary hover:text-accent text-sm">
                  Галерея
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/contacts')} className="text-text-secondary hover:text-accent text-sm">
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-text-primary mb-3">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/polish')} className="text-text-secondary hover:text-accent text-sm">
                  Полировка
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/ceramic')} className="text-text-secondary hover:text-accent text-sm">
                  Керамика
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/ppf')} className="text-text-secondary hover:text-accent text-sm">
                  Бронирование
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-text-primary mb-3">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+79620555858" className="text-text-secondary hover:text-accent text-sm block">
                  +7 (962) 055-58-58
                </a>
              </li>
              <li>
                <a href="https://t.me/rudenko_ds" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm block">
                  @rudenko_ds
                </a>
              </li>
              <li className="text-text-secondary text-sm">
                Омск, Индустриальная 5Б
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-text-primary mb-3">Информация</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/privacy')} className="text-text-secondary hover:text-accent text-sm">
                  Политика
                </button>
              </li>
              <li className="text-text-secondary text-sm">
                Работаем с 2015
              </li>
              <li className="text-text-secondary text-sm">
                <span className="text-accent">★</span> 5.0 рейтинг
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-text-secondary text-sm">
            © {currentYear} Лаборатория блеска. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;