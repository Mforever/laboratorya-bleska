import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  showSlogan?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showSlogan = true,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 focus:outline-none group ${className}`}
      aria-label="На главную"
    >
      {/* Логотип изображение */}
      <img
        src={variant === 'light' ? '/images/logo/logo-white.svg' : '/images/logo/logo.svg'}
        alt="Лаборатория блеска"
        className="h-10 w-auto transition-transform group-hover:scale-105"
      />

      {/* Слоган */}
      {showSlogan && (
        <span className="font-semibold text-sm text-text-secondary hidden sm:block">
          Лаборатория блеска
        </span>
      )}
    </button>
  );
};

export default Logo;