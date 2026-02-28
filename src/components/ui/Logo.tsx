import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showText = true,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Выбираем версию логотипа в зависимости от варианта
  const logoSrc = variant === 'light'
    ? '/images/logo/logo-white.svg'
    : '/images/logo/logo.svg';

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 focus:outline-none group ${className}`}
      aria-label="На главную"
    >
      {/* Логотип изображение */}
      <div className="relative">
        <img
          src={logoSrc}
          alt="Лаборатория блеска"
          className="h-10 w-auto transition-transform group-hover:scale-105"
        />
        {/* Легкое свечение при наведении */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-xl transition-all" />
      </div>

      {/* Текстовое название компании - ОДНА СТРОКА, ОДИН ЦВЕТ */}
      {showText && (
        <span className="font-bold text-base text-text-primary">
          Лаборатория блеска
        </span>
      )}
    </button>
  );
};

export default Logo;