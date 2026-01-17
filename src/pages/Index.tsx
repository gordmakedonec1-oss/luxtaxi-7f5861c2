import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Fleet } from "@/components/home/Fleet";
import { WhyUs } from "@/components/home/WhyUs";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <Fleet />
      <WhyUs />
      <CTA />
    </Layout>
  );
};

export default Index;
