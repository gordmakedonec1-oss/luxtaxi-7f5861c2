import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Fleet } from "@/components/home/Fleet";
import { WhyUs } from "@/components/home/WhyUs";
import { CTA } from "@/components/home/CTA";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <Layout>
      <Seo page="home" />
      <Hero />
      <Services />
      <Fleet />
      <WhyUs />
      <CTA />
    </Layout>
  );
};

export default Index;
