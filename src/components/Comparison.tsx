
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

const Comparison = () => {
  const [activePlan, setActivePlan] = useState<'free' | 'premium'>('free');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const comparisons = [
    {
      feature: 'AI-Powered Food Tracking',
      competitors: false,
      healthoriaFree: true,
      healthoriaPremium: true
    },
    {
      feature: 'Detailed Nutrition Analytics',
      competitors: true,
      healthoriaFree: true,
      healthoriaPremium: true
    },
    {
      feature: 'Personalized Vitamin Guide',
      competitors: false,
      healthoriaFree: true,
      healthoriaPremium: true
    },
    {
      feature: 'Smart Health Questionnaire',
      competitors: false,
      healthoriaFree: false,
      healthoriaPremium: true
    },
    {
      feature: 'One-Tap Doctor Consultation',
      competitors: false,
      healthoriaFree: false,
      healthoriaPremium: true
    },
    {
      feature: 'Advanced Health Insights',
      competitors: false,
      healthoriaFree: false,
      healthoriaPremium: true
    },
    {
      feature: 'Custom Meal Planning',
      competitors: true,
      healthoriaFree: false,
      healthoriaPremium: true
    }
  ];

  return (
    <section id="comparison" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-xs font-medium bg-gradient-gold bg-opacity-10 text-healthoria-navy rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Healthoria?
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-healthoria-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See How We <span className="text-gradient-gold">Compare</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover why Healthoria stands out from other nutrition and health tracking solutions.
          </motion.p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-lg flex items-center">
            <button
              className={`py-2 px-6 rounded-md transition-all duration-300 ${
                activePlan === 'free'
                  ? 'bg-white shadow-sm text-healthoria-navy'
                  : 'text-gray-500 hover:text-healthoria-navy'
              }`}
              onClick={() => setActivePlan('free')}
            >
              Free Plan
            </button>
            <button
              className={`py-2 px-6 rounded-md transition-all duration-300 ${
                activePlan === 'premium'
                  ? 'bg-white shadow-sm text-healthoria-navy'
                  : 'text-gray-500 hover:text-healthoria-navy'
              }`}
              onClick={() => setActivePlan('premium')}
            >
              Premium Plan
            </button>
          </div>
        </div>
        
        <motion.div
          ref={ref}
          className="glass-card rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-healthoria-navy">Features</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-healthoria-navy">Competitors</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-healthoria-gold">
                    Healthoria {activePlan === 'premium' ? 'Premium' : 'Free'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => {
                  const healthoriaValue = activePlan === 'premium' ? item.healthoriaPremium : item.healthoriaFree;
                  
                  return (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-4 px-6 text-sm text-healthoria-navy font-medium">{item.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {item.competitors ? (
                          <Check size={20} className="inline-block text-green-500" />
                        ) : (
                          <X size={20} className="inline-block text-red-400" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {healthoriaValue ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Check size={20} className="inline-block text-healthoria-gold" />
                          </motion.div>
                        ) : (
                          <X size={20} className="inline-block text-gray-300" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
