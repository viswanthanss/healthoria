
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { ArrowRight, Heart, Brain, Salad, UserCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gradient-mint bg-opacity-10 text-healthoria-navy rounded-full mb-4">
                AI-Powered Health Tracking
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-healthoria-navy mb-6">
                Track Your Health
                <br />
                <span className="text-gradient-gold">Like Never Before</span>
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Discover a revolutionary approach to health monitoring with AI-powered insights, personalized recommendations, and expert guidance.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <motion.div 
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Salad size={18} className="text-healthoria-gold" />
                  <span>Calorie Meter</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Heart size={18} className="text-healthoria-gold" />
                  <span>Vitamin Guide</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Brain size={18} className="text-healthoria-gold" />
                  <span>Health Questionnaire</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <UserCheck size={18} className="text-healthoria-gold" />
                  <span>Doctor Consultation</span>
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-64 py-3 px-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthoria-gold focus:border-transparent"
                  />
                </motion.div>
                
                <motion.a
                  href="#cta"
                  className="button-primary flex items-center justify-center gap-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.a>
                
                <motion.a
                  href="#features"
                  className="button-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Features
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-healthoria-gold/10 to-healthoria-mint/10 backdrop-blur-sm rounded-2xl p-4 md:p-8">
              <ThreeScene />
            </div>
            
            <div className="absolute -bottom-6 left-0 right-0 text-center">
              <span className="inline-block py-2 px-4 text-xs backdrop-blur-lg bg-white/50 rounded-full shadow-sm border border-white/20">
                <span className="text-gradient-gold font-medium">10,000+</span> users tracking their health with AI
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
