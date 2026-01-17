import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Clock, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { value: "10+", labelKey: "aboutPage.stat1" },
    { value: "5000+", labelKey: "aboutPage.stat2" },
    { value: "50+", labelKey: "aboutPage.stat3" },
    { value: "24/7", labelKey: "aboutPage.stat4" },
  ];

  const values = [
    {
      icon: Shield,
      titleKey: "aboutPage.safety.title",
      descriptionKey: "aboutPage.safety.description",
    },
    {
      icon: Clock,
      titleKey: "aboutPage.punctuality.title",
      descriptionKey: "aboutPage.punctuality.description",
    },
    {
      icon: Award,
      titleKey: "aboutPage.professionalism.title",
      descriptionKey: "aboutPage.professionalism.description",
    },
    {
      icon: Heart,
      titleKey: "aboutPage.dedication.title",
      descriptionKey: "aboutPage.dedication.description",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="LuxTaxi" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              {t("aboutPage.label")}
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("aboutPage.title")} <span className="gold-gradient-text">{t("aboutPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-3xl mx-auto">
              {t("aboutPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/30">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                {t("aboutPage.welcomeTitle")} <span className="gold-gradient-text">{t("aboutPage.welcomeTitleHighlight")}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none text-center"
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("aboutPage.welcomeText1")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("aboutPage.welcomeText2")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("aboutPage.welcomeText3")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-navy-light">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              {t("aboutPage.valuesLabel")}
            </span>
            <h2 className="luxury-heading text-foreground mb-6">
              {t("aboutPage.valuesTitle")} <span className="gold-gradient-text">{t("aboutPage.valuesTitleHighlight")}</span>
            </h2>
            <div className="divider-gold" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {t(value.titleKey)}
                </h3>
                <p className="text-muted-foreground">{t(value.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="luxury-heading text-foreground mb-6">
              {t("aboutPage.cta.title")} <span className="gold-gradient-text">{t("aboutPage.cta.titleHighlight")}</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              {t("aboutPage.cta.subtitle")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("aboutPage.cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
