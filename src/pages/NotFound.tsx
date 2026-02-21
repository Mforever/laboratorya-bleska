import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <Helmet>
        <title>Страница не найдена | Лаборатория блеска</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
        <p className="text-text-secondary mb-8 max-w-lg">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/">
          <Button>Вернуться на главную</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;