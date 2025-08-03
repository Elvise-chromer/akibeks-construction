import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiChevronDown, 
  HiQuestionMarkCircle,
  HiClock,
  HiCash,
  HiShieldCheck,
  HiCog,
  HiDocumentText,
  HiSupport
} from 'react-icons/hi';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Services",
      icon: HiCog,
      color: "from-blue-500 to-blue-600",
      faqs: [
        {
          question: "What types of construction services do you offer?",
          answer: "We offer comprehensive construction services including residential building, commercial construction, road construction, bridge construction, water and sewer systems, electrical installations, maintenance services, and project management. Our team handles projects from planning and design through completion and maintenance."
        },
        {
          question: "Do you provide both construction and maintenance services?",
          answer: "Yes, we provide end-to-end services including new construction, renovations, regular maintenance, emergency repairs, and preventive maintenance programs. Our maintenance services help extend the life of your structures and ensure optimal performance."
        },
        {
          question: "What areas do you serve?",
          answer: "We primarily serve Kenya with offices in major cities including Nairobi, Mombasa, Kisumu, and Eldoret. We also undertake projects in neighboring East African countries for larger commercial and infrastructure projects."
        }
      ]
    },
    {
      title: "Project Timeline & Process",
      icon: HiClock,
      color: "from-green-500 to-green-600",
      faqs: [
        {
          question: "How long does a typical construction project take?",
          answer: "Project timelines vary based on scope and complexity. Residential projects typically take 6-12 months, commercial buildings 12-24 months, and infrastructure projects can range from 6 months to several years. We provide detailed timelines during the planning phase and keep you updated throughout the project."
        },
        {
          question: "What is your project management process?",
          answer: "Our process includes: 1) Initial consultation and site assessment, 2) Design and planning phase, 3) Permits and approvals, 4) Construction phase with regular updates, 5) Quality inspections, 6) Final walkthrough and handover, 7) Warranty and maintenance support."
        },
        {
          question: "How do you handle project delays or changes?",
          answer: "We maintain open communication about any potential delays and work to minimize their impact. Change orders are documented and approved before implementation. We provide revised timelines and cost estimates for any approved changes to ensure transparency."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: HiCash,
      color: "from-yellow-500 to-orange-600",
      faqs: [
        {
          question: "How do you determine project costs?",
          answer: "Project costs are based on materials, labor, equipment, permits, and project complexity. We provide detailed estimates after site assessment and design finalization. Our pricing is transparent with no hidden fees, and we offer competitive rates while maintaining high quality standards."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, M-Pesa, cash payments, and checks. For larger projects, we typically work with a payment schedule tied to project milestones. We require a deposit to begin work, with remaining payments distributed throughout the project timeline."
        },
        {
          question: "Do you offer financing options?",
          answer: "Yes, we partner with several financial institutions to offer financing options for qualified clients. We can help you explore loan options, payment plans, and work with your existing financing arrangements to make your project more affordable."
        }
      ]
    },
    {
      title: "Quality & Warranties",
      icon: HiShieldCheck,
      color: "from-purple-500 to-purple-600",
      faqs: [
        {
          question: "What warranties do you provide?",
          answer: "We provide comprehensive warranties: 1-year warranty on workmanship, 5-year warranty on structural elements, and manufacturer warranties on materials and equipment. Our warranty covers defects in materials and workmanship under normal use conditions."
        },
        {
          question: "How do you ensure quality control?",
          answer: "We implement rigorous quality control measures including regular inspections, certified materials, skilled craftsmen, adherence to building codes, and third-party inspections when required. Our project managers conduct daily quality checks and document progress."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, we are fully licensed by the National Construction Authority (NCA) and carry comprehensive insurance including general liability, workers' compensation, and professional indemnity insurance. All our certifications and insurance are current and available for review."
        }
      ]
    },
    {
      title: "Permits & Documentation",
      icon: HiDocumentText,
      color: "from-red-500 to-red-600",
      faqs: [
        {
          question: "Do you handle permits and approvals?",
          answer: "Yes, we handle all necessary permits and approvals including building permits, environmental impact assessments, utility connections, and regulatory approvals. We have relationships with local authorities to expedite the approval process."
        },
        {
          question: "What documents do I need to provide?",
          answer: "Typically, you'll need: property title deeds, survey plans, architectural drawings (if available), identification documents, and any existing permits or approvals. We'll guide you through the specific requirements for your project."
        },
        {
          question: "How long does the permit process take?",
          answer: "Permit timelines vary by project type and location. Simple residential permits may take 2-4 weeks, while commercial projects can take 6-12 weeks. We begin the permit process early and keep you informed of progress and any requirements."
        }
      ]
    }
  ];

  const quickAnswers = [
    {
      question: "Do you provide free estimates?",
      answer: "Yes, we provide free initial consultations and estimates for all projects.",
      icon: HiQuestionMarkCircle
    },
    {
      question: "Are you available for emergency repairs?",
      answer: "Yes, we offer 24/7 emergency repair services for urgent construction issues.",
      icon: HiSupport
    },
    {
      question: "Do you work on weekends?",
      answer: "We can arrange weekend work for urgent projects or to meet specific deadlines.",
      icon: HiClock
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced Size */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white hero-height-small">
        <div className="container-custom h-full flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-xl mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-primary-100 max-w-2xl mx-auto"
            >
              Find answers to common questions about our construction services, processes, and policies
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="section-padding-small bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Quick Answers</h2>
            <p className="text-body text-gray-600">Common questions answered at a glance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAnswers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <item.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="heading-sm text-gray-900 mb-3">{item.question}</h3>
                <p className="text-body-sm text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Detailed FAQ by Category
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Browse through our comprehensive FAQ sections organized by topic to find detailed answers to your questions.
            </motion.p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <category.icon className="w-8 h-8 mr-4" />
                    <h3 className="heading-md">{category.title}</h3>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="divide-y divide-gray-200">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);

                    return (
                      <div key={faqIndex} className="p-6">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full text-left flex items-center justify-between hover:text-primary-600 transition-colors"
                        >
                          <h4 className="heading-sm text-gray-900 pr-4">{faq.question}</h4>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <HiChevronDown className="w-5 h-5 text-gray-500" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                <p className="text-body text-gray-600 leading-relaxed">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HiSupport className="w-16 h-16 mx-auto mb-6" />
              <h2 className="heading-lg mb-4">Still Have Questions?</h2>
              <p className="text-body text-primary-100 mb-8 max-w-3xl mx-auto">
                Can't find the answer you're looking for? Our team is here to help. 
                Contact us directly and we'll get back to you with personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Support
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Request Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;