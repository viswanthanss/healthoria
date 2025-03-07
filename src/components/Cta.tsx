
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Laptop } from 'lucide-react';

const Cta = () => {
  return (
    <section id="cta" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-healthoria-gold/10 to-healthoria-mint/10 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 bg-healthoria-gold/5 w-64 h-64 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 bg-healthoria-mint/5 w-64 h-64 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-healthoria-navy mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Start Your <span className="text-gradient-gold">Health Journey</span> Today
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of users who are transforming their health with Healthoria's AI-powered insights and personalized recommendations.
            </motion.p>
            
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full py-3.5 pl-4 pr-36 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthoria-gold focus:border-transparent shadow-sm"
                />
                <button
                  className="absolute right-1.5 top-1.5 bg-gradient-gold text-white text-sm font-medium py-2 px-4 rounded-md group hover:shadow-md transition-all"
                >
                  Get Started
                  <ArrowRight size={14} className="inline-block ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                No credit card required. 7-day free trial on premium features.
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="#" 
                className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors w-full sm:w-auto"
              >
                <Smartphone size={20} />
                <span>App Store</span>
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors w-full sm:w-auto"
              >
                <Laptop size={20} />
                <span>Google Play</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
