import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../lib/AuthContext';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiShield,
  FiBarChart
} from 'react-icons/fi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Construction', href: '/services/construction' },
        { name: 'Engineering', href: '/services/engineering' },
        { name: 'Architecture', href: '/services/architecture' },
        { name: 'Project Management', href: '/services/project-management' },
        { name: 'Consultation', href: '/services/consultation' },
      ]
    },
    {
      name: 'Projects',
      href: '/projects',
      dropdown: [
        { name: 'Residential', href: '/projects?category=residential' },
        { name: 'Commercial', href: '/projects?category=commercial' },
        { name: 'Industrial', href: '/projects?category=industrial' },
        { name: 'Portfolio', href: '/portfolio' },
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActivePath = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Akibeks Engineering Solutions - Home"
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 transition-transform group-hover:scale-105">
              <img 
                src="/akibeks-logo.svg" 
                alt="Akibeks Engineering Solutions"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg lg:text-xl transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                AKIBEKS
              </h1>
              <p className={`text-xs lg:text-sm font-medium transition-colors ${
                isScrolled ? 'text-orange-600' : 'text-orange-300'
              }`}>
                Engineering Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActivePath(link.href)
                          ? isScrolled 
                            ? 'text-orange-600 bg-orange-50' 
                            : 'text-orange-300 bg-white/10'
                          : isScrolled
                            ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                            : 'text-white hover:text-orange-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      <FiChevronDown 
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(link.href)
                        ? isScrolled 
                          ? 'text-orange-600 bg-orange-50' 
                          : 'text-orange-300 bg-white/10'
                        : isScrolled
                          ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                          : 'text-white hover:text-orange-300 hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('user')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                      : 'text-white hover:text-orange-300 hover:bg-white/10'
                  }`}
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <FiUser className="w-5 h-5" />
                  )}
                  <span className="hidden xl:block">
                    {user.firstName} {user.lastName}
                  </span>
                  <FiChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <FiShield className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <Link
                        to="/client/portal"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Client Portal</span>
                      </Link>
                      
                      <Link
                        to="/analytics"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <FiBarChart className="w-4 h-4" />
                        <span>Analytics</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                    isScrolled
                      ? 'text-gray-700 hover:text-orange-600'
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/quote"
                  className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                : 'text-white hover:text-orange-300 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(`mobile-${link.name}`)}
                          className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <span className="font-medium">{link.name}</span>
                          <FiChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === `mobile-${link.name}` ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === `mobile-${link.name}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-1"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                          isActivePath(link.href)
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Auth Section */}
                {isAuthenticated && user ? (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-orange-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mt-3">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <FiShield className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full px-3 py-2 text-center text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/quote"
                      className="block w-full px-3 py-2 text-center bg-orange-600 text-white hover:bg-orange-700 rounded-md transition-colors font-medium"
                    >
                      Get Quote
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;