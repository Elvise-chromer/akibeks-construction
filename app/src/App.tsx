import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout and Auth
import Layout from './components/Layout';
import { AuthProvider } from './lib';

// Main Website Pages
import Home from './views/Home';
import About from './views/About';
import Services from './views/Services';
import Projects from './views/Projects';
import Blog from './views/Blog';
import Contact from './views/Contact';
import Quote from './views/Quote';
import QuoteRequest from './views/QuoteRequest';
import Maintenance from './views/Maintenance';
import Careers from './views/Careers';
import Portfolio from './views/Portfolio';
import Downloads from './views/Downloads';
import CSR from './views/CSR';
import FAQ from './views/FAQ';
import Team from './views/Team';
import Safety from './views/Safety';
import CaseStudies from './views/CaseStudies';
import Emergency from './views/Emergency';
import Gallery from './views/Gallery';
import Testimonials from './views/Testimonials';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';
import CookiePolicy from './views/CookiePolicy';
import NotFound from './views/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './views/Login';
import Register from './views/Register';

// Service Pages
import CommercialServices from './views/services/CommercialServices';
import IndustrialServices from './views/services/IndustrialServices';
import RenovationServices from './views/services/RenovationServices';
import ResidentialServices from './views/services/ResidentialServices';

// Dynamic Detail Pages
import ProjectDetail from './views/ProjectDetail';
import ServiceDetail from './views/ServiceDetail';
import BlogPost from './views/BlogPost';

// Admin Portal Pages (Lazy Loaded)
const AdminLogin = lazy(() => import('./admin/auth/AdminLogin'));
const Admin = lazy(() => import('./views/admin/Admin'));

// Client Portal Pages (Lazy Loaded)
const ClientLogin = lazy(() => import('./views/client/ClientLogin'));

// Portal Pages (Lazy Loaded)
const ClientPortal = lazy(() => import('./views/portals/ClientPortal'));
const Analytics = lazy(() => import('./views/portals/Analytics'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/commercial" element={<CommercialServices />} />
              <Route path="services/industrial" element={<IndustrialServices />} />
              <Route path="services/renovation" element={<RenovationServices />} />
              <Route path="services/residential" element={<ResidentialServices />} />
              <Route path="services/:id" element={<ServiceDetail />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="quote" element={<Quote />} />
              <Route path="quote-request" element={<QuoteRequest />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="careers" element={<Careers />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="csr" element={<CSR />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="team" element={<Team />} />
              <Route path="safety" element={<Safety />} />
              <Route path="case-studies" element={<CaseStudies />} />
              <Route path="emergency" element={<Emergency />} />
              
              {/* Legal Pages */}
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="cookies" element={<CookiePolicy />} />
            </Route>

            {/* Admin Portal Routes */}
            <Route path="/admin/login" element={
              <Suspense fallback={<LoadingSpinner />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin/*" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Admin />
              </Suspense>
            } />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Client Portal Routes */}
            <Route path="/client/login" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ClientLogin />
              </Suspense>
            } />
            <Route path="/client/portal" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ClientPortal />
              </Suspense>
            } />

            {/* Analytics Portal Routes */}
            <Route path="/analytics" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Analytics />
              </Suspense>
            } />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;