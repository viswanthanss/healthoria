
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/utils/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-xs font-medium bg-gradient-mint bg-opacity-10 text-healthoria-navy rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            User Testimonials
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-healthoria-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear From Our <span className="text-gradient-gold">Satisfied Users</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            See how Healthoria has transformed the way people monitor and improve their health.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handlePrevious}
              className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-healthoria-navy" />
            </button>
          </div>
          
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-healthoria-navy" />
            </button>
          </div>
          
          <div className="glass-card rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-healthoria-mint/10">
              <Quote size={150} strokeWidth={0.5} />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="mb-8">
                  <Quote size={28} className="text-healthoria-gold" />
                  <p className="text-lg md:text-xl text-gray-700 italic mt-4">
                    {testimonials[currentIndex].quote}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="relative w-14 h-14 mr-4">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-full border-2 border-healthoria-gold"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-healthoria-navy">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].company && `, ${testimonials[currentIndex].company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-healthoria-gold scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-healthoria-navy font-medium mb-6">Trusted by health-conscious individuals worldwide</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <span className="text-gray-400 text-lg font-semibold">FitnessMag</span>
            <span className="text-gray-400 text-lg font-semibold">HealthTech</span>
            <span className="text-gray-400 text-lg font-semibold">NutritionWeekly</span>
            <span className="text-gray-400 text-lg font-semibold">WellnessDaily</span>
            <span className="text-gray-400 text-lg font-semibold">TechHealth</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
