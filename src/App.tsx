import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingButton from './components/layout/FloatingButton';
import ModalForm from './components/ui/ModalForm';
import { useModal } from './hooks/useModal';
import { useHashScroll } from './hooks/useHashScroll';

// Импорт страниц
import Home from './pages/Home';
import Polish from './pages/Polish';
import Ceramic from './pages/Ceramic';
import PPF from './pages/PPF';
import Gallery from './pages/Gallery';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Компонент для обработки скролла к якорям
const ScrollHandler: React.FC = () => {
  useHashScroll();
  return null;
};

function App() {
  const { isOpen, modalOptions, openModal, closeModal } = useModal();

  // Слушатель для открытия модалки из любого места
  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      openModal(event.detail);
    };

    window.addEventListener('openModal', handleOpenModal as EventListener);
    return () => window.removeEventListener('openModal', handleOpenModal as EventListener);
  }, [openModal]);

  return (
    <HelmetProvider>
      <Router>
        <ScrollHandler />
        <div className="min-h-screen flex flex-col bg-bg-primary">
          <Header />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/polish" element={<Polish />} />
                <Route path="/ceramic" element={<Ceramic />} />
                <Route path="/ppf" element={<PPF />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          {/* Передаем функцию открытия модалки в FloatingButton */}
          <FloatingButton onOpenModal={() => openModal({ serviceType: 'general', serviceName: 'услугу' })} />

          {/* Модальная форма */}
          <ModalForm
            isOpen={isOpen}
            onClose={closeModal}
            serviceType={modalOptions.serviceType}
            serviceName={modalOptions.serviceName}
            selectedZones={modalOptions.selectedZones}
            totalPrice={modalOptions.totalPrice}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;