
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Utensils, 
  Pill, // Replaced Vitamin with Pill
  ClipboardList, 
  UserPlus,
  Bot,
  BarChart,
  Zap,
  Smartphone
} from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const Features = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const featuresData = [
    {
      icon: <Utensils size={28} />,
      title: "AI-Powered Calorie & Nutrition Tracker",
      description: "Instantly identify foods and track nutrients with our advanced image recognition technology.",
      color: "bg-gradient-gold"
    },
    {
      icon: <Pill size={28} />, // Using Pill icon instead of Vitamin
      title: "Personalized Vitamin Guide",
      description: "Receive tailored vitamin and supplement recommendations based on your unique profile and goals.",
      color: "bg-gradient-mint"
    },
    {
      icon: <ClipboardList size={28} />,
      title: "Smart Health Questionnaire",
      description: "Complete our intelligent assessment to receive personalized health insights and recommendations.",
      color: "bg-gradient-mixed"
    },
    {
      icon: <UserPlus size={28} />,
      title: "One-Tap Doctor Consultation",
      description: "Connect with healthcare professionals instantly for personalized advice and expertise.",
      color: "bg-gradient-gold"
    }
  ];

  const advancedFeaturesData = [
    {
      icon: <Bot size={24} />,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your dietary patterns and health goals."
    },
    {
      icon: <BarChart size={24} />,
      title: "Detailed Analytics",
      description: "Track trends and correlations between your nutrition, activity, and wellness metrics."
    },
    {
      icon: <Zap size={24} />,
      title: "Real-time Feedback",
      description: "Receive instant guidance on improving your nutritional balance throughout the day."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Seamless Integration",
      description: "Sync with your favorite fitness apps and wearables for a complete health picture."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-xs font-medium bg-gradient-mint bg-opacity-10 text-healthoria-navy rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Health Insights
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-healthoria-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Revolutionary Features for Your <span className="text-gradient-gold">Health Journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover how our integrated suite of AI-powered tools can transform your approach to health and nutrition tracking.
          </motion.p>
        </div>
        
        <motion.div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "show" : "hidden"}
        >
          {featuresData.map((feature, index) => (
            <motion.div 
              key={index} 
              className="glass-card rounded-xl p-6 group hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-white mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-healthoria-navy mb-3 group-hover:text-healthoria-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gradient-gold bg-opacity-10 text-healthoria-navy rounded-full mb-4">
                Beyond Basic Tracking
              </span>
              
              <h2 className="text-3xl font-bold text-healthoria-navy mb-4">
                Advanced Health Analytics <span className="text-gradient-gold">Powered by AI</span>
              </h2>
              
              <p className="text-gray-600 mb-6">
                Our sophisticated algorithms analyze your nutrition data to provide personalized insights that help you make better health decisions every day.
              </p>
              
              <motion.a 
                href="#cta" 
                className="inline-flex items-center text-healthoria-gold font-medium group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Learn more about our technology
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advancedFeaturesData.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-5 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-healthoria-gold mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-healthoria-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
