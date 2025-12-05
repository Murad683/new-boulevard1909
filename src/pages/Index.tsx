import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FeaturedDishes />
      <CTASection />
    </Layout>
  );
};

export default Index;
