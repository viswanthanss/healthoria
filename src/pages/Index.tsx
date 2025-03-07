
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Cta from '@/components/Cta';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Healthoria - AI-Powered Nutrition Tracking</title>
        <meta name="description" content="AI-powered health tracking with personalized insights, calorie calculations, and expert guidance. Transform your health journey with Healthoria." />
        <meta property="og:title" content="Healthoria - AI-Powered Nutrition Tracking" />
        <meta property="og:description" content="AI-powered health tracking with personalized insights, calorie calculations, and expert guidance. Transform your health journey with Healthoria." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <MainLayout>
        <div className="fixed top-4 right-4 flex flex-col sm:flex-row gap-2 z-50">
          <Link to="/signin">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-gold hover:opacity-90 transition-opacity">Sign Up</Button>
          </Link>
        </div>
        <Hero />
        <Features />
        <Comparison />
        <Testimonials />
        <Pricing />
        <Cta />
      </MainLayout>
    </>
  );
};

export default Index;
