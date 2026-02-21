import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from '../ui/LogoImage';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavigation = (path: string, sectionId?: string) => {
    setIsOpen(false);

    if (location.pathname === path) {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const menuItems = [
    { path: '/', label: 'Главная', section: 'hero' },
    {
      label: 'Услуги',
      submenu: [
        { path: '/polish', label: 'Полировка кузова' },
        { path: '/ceramic', label: 'Керамическое покрытие' },
        { path: '/ppf', label: 'Бронирование пленкой' }
      ]
    },
    { path: '/gallery', label: 'Галерея' },
    { path: '/contacts', label: 'Контакты', section: 'contacts' }
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary/95 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Логотип изображением */}
          <LogoImage variant="header" />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="text-text-secondary hover:text-accent transition-colors text-sm font-medium">
                      {item.label}
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-bg-secondary rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {item.submenu.map((subitem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subitem.path)}
                          className="block w-full text-left px-4 py-2.5 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors text-sm"
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.path, item.section)}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Кнопка телефона для десктопа */}
          <a
            href="tel:+79620555858"
            className="hidden md:flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
          >
            <i className="fas fa-phone"></i>
            <span>+7 (962) 055-58-58</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-bg-secondary rounded-lg overflow-hidden"
            >
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <div className="border-b border-bg-element last:border-0">
                      <div className="px-4 py-3 text-text-secondary font-medium">
                        {item.label}
                      </div>
                      {item.submenu.map((subitem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subitem.path)}
                          className="block w-full text-left px-8 py-2.5 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors text-sm"
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.path, item.section)}
                      className="block w-full text-left px-4 py-3 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors border-b border-bg-element last:border-0 text-sm"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              {/* Телефон в мобильном меню */}
              <a
                href="tel:+79620555858"
                className="flex items-center gap-2 px-4 py-3 text-accent hover:bg-bg-element transition-colors text-sm border-t border-bg-element"
              >
                <i className="fas fa-phone"></i>
                <span>+7 (962) 055-58-58</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;