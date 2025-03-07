
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const freePlanFeatures = [
    'Basic Food Tracking',
    'Calorie Counting',
    'Daily Nutrition Summary',
    'Weekly Progress Reports',
    'Limited Recipe Suggestions'
  ];

  const premiumPlanFeatures = [
    'Advanced AI Food Recognition',
    'Detailed Nutrient Breakdown',
    'Personalized Vitamin Guide',
    'Smart Health Questionnaire',
    'One-Tap Doctor Consultation',
    'Custom Meal Planning',
    'Unlimited Recipe Access',
    'Premium Support'
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-xs font-medium bg-gradient-gold bg-opacity-10 text-healthoria-navy rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing & Plans
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-healthoria-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the <span className="text-gradient-gold">Perfect Plan</span> for You
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Whether you're just starting your health journey or looking for advanced features, we have a plan that fits your needs.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="glass-card rounded-xl p-8 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-healthoria-navy mb-2">Free Plan</h3>
              <p className="text-gray-500 mb-6">Get started with the basics</p>
              <div className="text-5xl font-bold text-healthoria-navy">
                $0<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {freePlanFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check size={18} className="text-healthoria-mint mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center">
              <a 
                href="#cta" 
                className="button-secondary w-full block"
              >
                Get Started
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-xl p-8 border border-healthoria-gold/30 shadow-lg relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="absolute -top-4 right-8">
              <span className="bg-gradient-gold text-white text-xs font-bold py-1 px-3 rounded-full">
                MOST POPULAR
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-healthoria-navy mb-2">Premium Plan</h3>
              <p className="text-gray-500 mb-6">Advanced features for health enthusiasts</p>
              <div className="text-5xl font-bold text-healthoria-navy">
                $9.99<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {premiumPlanFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check size={18} className="text-healthoria-gold mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center">
              <a 
                href="#cta" 
                className="button-primary w-full block"
              >
                Get Premium
              </a>
              <p className="text-xs text-gray-500 mt-2">7-day free trial, cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
