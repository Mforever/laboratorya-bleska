// src/components/ui/LogoImage.tsx
import React from 'react';

interface LogoImageProps {
  variant?: 'dark' | 'light';
  className?: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ variant = 'light', className = '' }) => {
  const logoSrc = variant === 'light'
    ? '/images/logo/logo-white.svg'
    : '/images/logo/logo.svg';

  return (
    <img
      src={logoSrc}
      alt="Лаборатория блеска"
      className={`h-10 w-auto ${className}`}
    />
  );
};

export default LogoImage;