import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    setActiveDropdown(null);
  }, [location]);

  // Закрытие дропдауна при клике вне
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const menuItems = [
    { path: '/', label: 'Главная' },
    {
      label: 'Услуги',
      dropdown: [
        { path: '/polish', label: 'Полировка кузова' },
        { path: '/ceramic', label: 'Керамическое покрытие' },
        { path: '/ppf', label: 'Бронирование пленкой' }
      ]
    },
    { path: '/gallery', label: 'Галерея' },
    { path: '/contacts', label: 'Контакты' }
  ];

  const handleDropdownClick = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Функция открытия модалки
  const openBookingModal = () => {
    const event = new CustomEvent('openModal', {
      detail: { serviceType: 'general', serviceName: 'услугу' }
    });
    window.dispatchEvent(event);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-bg-primary/95 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Логотип */}
          <Logo variant="light" showText={true} />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={(e) => handleDropdownClick(e, item.label)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        activeDropdown === item.label
                          ? 'bg-accent text-bg-primary'
                          : 'text-text-secondary hover:text-accent hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                      <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}></i>
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-bg-secondary rounded-xl shadow-xl overflow-hidden border border-white/5"
                        >
                          {item.dropdown.map((subitem) => (
                            <button
                              key={subitem.path}
                              onClick={() => {
                                navigate(subitem.path);
                                setActiveDropdown(null);
                              }}
                              className="w-full text-left px-4 py-3 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors text-sm"
                            >
                              {subitem.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() => navigate(item.path)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === item.path
                        ? 'bg-accent text-bg-primary'
                        : 'text-text-secondary hover:text-accent hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79620555858"
              className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <i className="fas fa-phone-alt text-sm"></i>
              <span className="text-sm font-medium">+7 (962) 055-58-58</span>
            </a>
            <button
              onClick={openBookingModal}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-bg-primary text-sm font-medium rounded-lg transition-all hover:scale-105"
            >
              Записаться
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/5 hover:bg-accent/20 text-text-secondary hover:text-accent transition-all flex items-center justify-center"
            aria-label="Меню"
          >
            <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-lg`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-bg-secondary rounded-xl overflow-hidden border border-white/5"
            >
              <div className="p-2">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div className="border-b border-white/5 last:border-0">
                        <div className="px-4 py-3 text-text-secondary font-medium">
                          {item.label}
                        </div>
                        {item.dropdown.map((subitem) => (
                          <button
                            key={subitem.path}
                            onClick={() => {
                              navigate(subitem.path);
                              setIsOpen(false);
                            }}
                            className="w-full text-left px-8 py-3 text-text-secondary hover:text-accent hover:bg-bg-element transition-colors text-sm"
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-accent text-bg-primary'
                            : 'text-text-secondary hover:bg-bg-element'
                        }`}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile contact info */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  <a
                    href="tel:+79620555858"
                    className="flex items-center gap-3 px-4 py-3 text-accent hover:bg-bg-element rounded-lg transition-colors"
                  >
                    <i className="fas fa-phone-alt"></i>
                    <span className="text-sm font-medium">+7 (962) 055-58-58</span>
                  </a>
                  <button
                    onClick={() => {
                      openBookingModal();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-accent hover:bg-accent-hover text-bg-primary text-sm font-medium rounded-lg transition-all"
                  >
                    Записаться онлайн
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;