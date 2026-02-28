import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButton from './FloatingButton';

interface LayoutProps {
  children: React.ReactNode;
  onOpenModal: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenModal }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingButton onOpenModal={onOpenModal} />
    </div>
  );
};

export default Layout;