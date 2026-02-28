import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingButtonProps {
  onOpenModal: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={onOpenModal}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-accent rounded-full flex items-center justify-center text-bg-primary text-2xl shadow-lg z-40 hover:bg-accent-hover transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-phone"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingButton;