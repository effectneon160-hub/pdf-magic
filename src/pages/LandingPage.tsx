import React, { Children } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Edit3,
  Scan,
  Languages,
  Layers,
  ArrowRight,
  UploadCloud,
  Zap,
  CheckCircle2 } from
'lucide-react';
export const LandingPage = () => {
  const { setGuestMode } = useAuth();
  const navigate = useNavigate();
  const handleTryNow = () => {
    setGuestMode();
    navigate('/editor');
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-sm font-medium mb-6">
              
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>{' '}
              Next-gen PDF Editing
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              
              Edit PDFs like a{' '}
              <span className="text-primary relative inline-block">
                Word Document
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none">
                  
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent" />
                  
                </svg>
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              
              Seamlessly edit text, run OCR on scanned documents, and preserve
              original formatting. Full support for English and Hindi
              (Devanagari).
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              
              <button
                onClick={handleTryNow}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                
                Try Editor Now <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/auth"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center">
                
                Create Free Account
              </Link>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-gray-500">
              
              No credit card required. Try as a guest.
            </motion.p>
          </motion.div>

          {/* Animated Hero Illustration */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.5
            }}
            className="flex-1 w-full max-w-md relative">
            
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 aspect-[1/1.2] relative overflow-hidden">
              <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
              <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
              <div className="w-5/6 h-4 bg-gray-100 rounded mb-8"></div>

              <motion.div
                animate={{
                  x: [0, 20, 0],
                  backgroundColor: ['#f3f4f6', '#fef08a', '#f3f4f6']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3
                }}
                className="w-2/3 h-6 rounded mb-4 flex items-center px-2 text-xs font-bold text-gray-700">
                
                Editable Text Block
              </motion.div>

              <div className="w-full h-32 bg-blue-50 border border-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-300">
                Image Area
              </div>

              {/* Floating Cursor */}
              <motion.div
                animate={{
                  x: [50, 150, 50],
                  y: [100, 120, 100]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4
                }}
                className="absolute z-10">
                
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  
                  <path
                    d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.35a.5.5 0 0 0-.85.35Z"
                    fill="#1e3a5f"
                    stroke="white"
                    strokeWidth="2" />
                  
                </svg>
              </motion.div>
            </div>

            {/* Drag Drop Overlay */}
            <div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={handleTryNow}>
              
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Upload PDF</p>
                <p className="text-xs text-gray-500">Drop file here to edit</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary text-white py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">10M+</h3>
              <p className="text-primary-200">PDFs Edited</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-primary-200">Languages Supported</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-primary-200">Uptime</p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10"></div>
              {[
              {
                step: 1,
                title: 'Upload',
                desc: 'Drag & drop your PDF document. No installation required.'
              },
              {
                step: 2,
                title: 'Edit',
                desc: 'Click any text to edit inline. Use OCR for scanned pages.'
              },
              {
                step: 3,
                title: 'Download',
                desc: 'Export your edited PDF with original formatting preserved.'
              }].
              map((s, i) =>
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
                
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              Everything you need to manage PDFs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Edit3 className="w-6 h-6 text-blue-500" />}
                title="Inline Text Editing"
                description="Click any text block to edit it directly. We preserve the original font, size, and color." />
              
              <FeatureCard
                icon={<Scan className="w-6 h-6 text-green-500" />}
                title="Powerful OCR"
                description="Turn scanned images into editable text instantly. Perfect for old documents and receipts." />
              
              <FeatureCard
                icon={<Languages className="w-6 h-6 text-purple-500" />}
                title="Hindi & English Support"
                description="Flawless rendering of Devanagari script alongside English, maintaining perfect layout." />
              
              <FeatureCard
                icon={<Layers className="w-6 h-6 text-orange-500" />}
                title="Merge & Split"
                description="Combine multiple PDFs into one, or extract specific pages with ease." />
              
              <FeatureCard
                icon={<FileText className="w-6 h-6 text-red-500" />}
                title="Annotate & Sign"
                description="Add comments, highlight text, and draw or type your signature securely." />
              
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                title="Compress & Optimize"
                description="Reduce file size significantly without losing visual quality for easy sharing." />
              
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              Loved by professionals
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
              {
                name: 'Sarah J.',
                role: 'Legal Consultant',
                quote:
                'The Hindi OCR is a game changer. I can edit old legal documents in minutes instead of retyping them.'
              },
              {
                name: 'Mark T.',
                role: 'Financial Analyst',
                quote:
                'Editing numbers directly in the PDF tables saves me hours every week. The formatting stays perfect.'
              },
              {
                name: 'Priya R.',
                role: 'HR Manager',
                quote:
                "Merging, signing, and compressing employee contracts all in one place. Best tool I've used."
              }].
              map((t, i) =>
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {'★★★★★'}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <FileText className="w-6 h-6" /> PDFMagic
            </div>
            <p className="text-sm max-w-sm">
              The most advanced web-based PDF editor. Edit text, run OCR, and
              manage documents seamlessly.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} PDFMagic. All rights reserved.
        </div>
      </footer>
    </div>);

};
const FeatureCard = ({
  icon,
  title,
  description




}: {icon: React.ReactNode;title: string;description: string;}) =>
<motion.div
  whileHover={{
    y: -5
  }}
  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
  
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>;