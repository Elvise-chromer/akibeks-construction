import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiMail, HiPhone, HiLocationMarker, HiShieldCheck, HiUser
} from 'react-icons/hi';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Construction', href: '/services#construction' },
    { name: 'Renovation', href: '/services#renovation' },
    { name: 'Maintenance', href: '/services#maintenance' },
    { name: 'Consultation', href: '/services#consultation' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Safety Guidelines', href: '/safety' },
    { name: 'Quality Standards', href: '/quality' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/akibeks', icon: FaFacebook },
    { name: 'Twitter', href: 'https://twitter.com/akibeks', icon: FaTwitter },
    { name: 'Instagram', href: 'https://instagram.com/akibeks', icon: FaInstagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/akibeks', icon: FaLinkedin },
    { name: 'YouTube', href: 'https://youtube.com/@akibeks', icon: FaYoutube }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Portal Access Buttons */}
      <div className="bg-blue-800 py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-blue-100 font-medium">Portal Access:</span>
            <div className="flex gap-3">
              <Link 
                to="/admin/login"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                <HiShieldCheck className="w-4 h-4" />
                Admin Portal
              </Link>
              <Link 
                to="/client/login"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                <HiUser className="w-4 h-4" />
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">AKIBEKS</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building Excellence in Construction. We are a premier construction company 
                  committed to delivering high-quality projects with integrity, innovation, 
                  and exceptional craftsmanship.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <HiLocationMarker className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">
                    P.O. Box 12345-00100, Nairobi, Kenya
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <HiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">+254-700-000000</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">info@akibeks.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
              <nav className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Our Services</h4>
              <nav className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Legal & Support</h4>
              <nav className="space-y-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/faq"
                  className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  FAQ
                </Link>
                <Link
                  to="/support"
                  className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Support
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Akibeks Construction Limited. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Registered in Kenya</span>
              <span>•</span>
              <span>License No: KEN/CON/2024/001</span>
              <span>•</span>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;