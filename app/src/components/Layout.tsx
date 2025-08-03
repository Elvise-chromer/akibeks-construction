import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import LoadingSpinner from './LoadingSpinner';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Handle route change loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    in: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    out: { 
      opacity: 0, 
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <LoadingSpinner size="lg" />
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;