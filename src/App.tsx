import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingButton from './components/layout/FloatingButton';
import { useHashScroll } from './hooks/useHashScroll';
import Home from './pages/Home';
import Polish from './pages/Polish';
import Ceramic from './pages/Ceramic';
import PPF from './pages/PPF';
import Gallery from './pages/Gallery';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Компонент для обработки скролла
const ScrollHandler: React.FC = () => {
  useHashScroll();
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollHandler />
        <div className="min-h-screen flex flex-col">
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
          <FloatingButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;