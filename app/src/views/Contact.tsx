import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiPaperAirplane,
  HiOfficeBuilding,
  HiHome,
  HiCog
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';

// Validation schema
const contactSchema = yup.object().shape({
  name: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^(\+254|0)[17]\d{8}$/, 'Please enter a valid Kenyan phone number'),
  company: yup.string().optional(),
  serviceType: yup.string().required('Please select a service type'),
  projectBudget: yup.string().optional(),
  timeline: yup.string().optional(),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

type ContactForm = yup.InferType<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: yupResolver(contactSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // First try the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'website_contact_form'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          toast.success(result.message || 'Thank you! Your inquiry has been sent successfully. We\'ll get back to you within 24 hours.');
          reset();
          
          // Track successful submission
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              event_category: 'Contact',
              event_label: 'Contact Form'
            });
          }
        } else {
          // Handle API validation errors
          if (result.details && Array.isArray(result.details)) {
            const errorMessages = result.details.map((error: any) => error.msg).join(', ');
            toast.error(`Please check your form: ${errorMessages}`);
          } else {
            throw new Error(result.error || 'Failed to send message');
          }
        }
      } else {
        // If API fails, try email fallback
        await handleEmailFallback(data);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Try email fallback as last resort
      try {
        await handleEmailFallback(data);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        toast.error(
          'Network error. Please contact us directly at +254-700-123-456 or info@akibeks.co.ke',
          { duration: 10000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailFallback = async (data: ContactForm) => {
    // Create mailto link as fallback
    const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Service Type: ${data.serviceType}
Project Budget: ${data.projectBudget || 'N/A'}
Timeline: ${data.timeline || 'N/A'}

Message:
${data.message}

---
Sent from Akibeks Construction website contact form
    `);
    
    const mailtoLink = `mailto:info@akibeks.co.ke?subject=${subject}&body=${body}`;
    
    // Show fallback message
    toast.error(
      'Unable to send message automatically. Please click the button below to send via email.',
      { duration: 8000 }
    );
    
    // Open email client
    window.open(mailtoLink, '_blank');
  };

  const contactInfo = [
    {
      icon: HiLocationMarker,
      title: "Visit Our Office",
      details: [
        "Kiambu Road, Nairobi",
        "P.O. Box 12345-00100",
        "Nairobi, Kenya"
      ]
    },
    {
      icon: HiPhone,
      title: "Call Us",
      details: [
        "+254 700 123 456",
        "+254 733 654 321",
        "24/7 Emergency Line"
      ]
    },
    {
      icon: HiMail,
      title: "Email Us",
      details: [
        "info@akibeks.co.ke",
        "projects@akibeks.co.ke",
        "support@akibeks.co.ke"
      ]
    },
    {
      icon: HiClock,
      title: "Working Hours",
      details: [
        "Mon - Fri: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Emergency Only"
      ]
    }
  ];

  const serviceTypes = [
    { value: "residential", label: "Residential Construction", icon: HiHome },
    { value: "commercial", label: "Commercial Buildings", icon: HiOfficeBuilding },
    { value: "industrial", label: "Industrial Projects", icon: HiCog },
    { value: "renovation", label: "Renovations & Extensions", icon: HiHome },
    { value: "consultation", label: "Consultation & Planning", icon: HiOfficeBuilding },
    { value: "other", label: "Other Services", icon: HiCog }
  ];

  const budgetRanges = [
    "Under KSh 1M",
    "KSh 1M - 5M",
    "KSh 5M - 10M",
    "KSh 10M - 25M",
    "KSh 25M - 50M",
    "Over KSh 50M"
  ];

  const timelines = [
    "Less than 3 months",
    "3-6 months",
    "6-12 months",
    "1-2 years",
    "More than 2 years",
    "Not sure yet"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Us - Akibeks Construction Ltd"
        description="Get in touch with Akibeks Construction Ltd. Contact us for construction projects, quotes, and consultations. Call +254-700-123-456 or email info@akibeks.co.ke"
        keywords="contact, construction company, Kenya, Nairobi, building services, quote request"
        canonical="/contact"
        ogTitle="Contact Akibeks Construction Ltd"
        ogDescription="Get in touch with Kenya's premier construction company. Contact us for construction projects, quotes, and consultations."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Akibeks Construction Ltd",
          "description": "Contact page for Akibeks Construction Ltd",
          "url": "https://akibeks.co.ke/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Akibeks Construction Ltd",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kiambu Road, Nairobi",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "postalCode": "00100",
              "addressCountry": "KE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254-700-123-456",
              "contactType": "customer service",
              "areaServed": "KE",
              "availableLanguage": "English"
            }
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to start your construction project? Contact us today for a free 
              consultation and detailed quote tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help bring your construction dreams to life. 
                    Reach out to us through any of the following channels.
                  </p>
                </div>

                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-800 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* WhatsApp Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <a
                    href="https://wa.me/254700123456?text=Hello%20Akibeks%20Construction,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-accent-600 hover:bg-accent-700 text-white px-6 py-4 rounded-lg transition-colors duration-200 w-full justify-center"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    <span className="font-medium">Chat on WhatsApp</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card p-8"
              >
                <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: "Phone number is required" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+254 700 123 456"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        {...register("serviceType", { required: "Please select a service type" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select service type</option>
                        {serviceTypes.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Budget
                      </label>
                      <select
                        {...register("projectBudget")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        {...register("timeline")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        {...register("subject", { required: "Subject is required" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Brief description of your project"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", { required: "Message is required" })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Please provide details about your construction project, including location, specifications, and any special requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100">
        <div className="h-96 bg-gray-300 relative rounded-lg overflow-hidden">
          {/* Interactive Map with Office Location */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.844285476774!2d36.79893631475388!3d-1.2647848990562698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x940b62a3c8efde4c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Akibeks Engineering Solutions Office Location"
            className="w-full h-full"
          />
          
          {/* Office Location Overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-start space-x-3">
              <HiLocationMarker className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-secondary-800 mb-1">
                  Akibeks Engineering Solutions
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  123 Construction Avenue, Industrial Area<br />
                  Nairobi, Kenya
                </p>
                <div className="flex flex-col space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <HiPhone className="h-4 w-4 text-primary-600" />
                    <span>+254 700 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HiMail className="h-4 w-4 text-primary-600" />
                    <span>info@akibeks.co.ke</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.open('https://maps.google.com/?q=Nairobi,Kenya', '_blank')}
              className="mt-3 w-full bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Get Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;