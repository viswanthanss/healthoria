
import { Helmet } from 'react-helmet';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Cta from '@/components/Cta';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Healthoria - Track Your Health Like Never Before</title>
        <meta name="description" content="AI-powered health tracking with personalized insights, vitamin recommendations, and expert guidance. Transform your health journey with Healthoria." />
        <meta property="og:title" content="Healthoria - Track Your Health Like Never Before" />
        <meta property="og:description" content="AI-powered health tracking with personalized insights, vitamin recommendations, and expert guidance. Transform your health journey with Healthoria." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <MainLayout>
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
