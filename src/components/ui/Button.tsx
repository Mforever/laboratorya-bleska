import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'default' | 'compact' | 'small';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}) => {
  // Базовые классы
  const baseClasses = 'font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center';

  // Классы для размеров
  const sizeClasses = {
    default: 'px-6 py-3 text-base',
    compact: 'px-5 py-2 text-sm',
    small: 'px-4 py-1.5 text-sm'
  };

  // Классы для вариантов
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-hover text-bg-primary hover:scale-105',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-bg-primary',
    ghost: 'text-text-primary hover:text-accent border-b border-transparent hover:border-accent'
  };

  // Дополнительные классы
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;

  // Если есть href, рендерим ссылку
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {children}
      </motion.a>
    );
  }

  // Иначе рендерим кнопку
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;