import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Briefcase, Users, Plane, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/components/Seo";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      titleKey: "servicesPage.vip.title",
      descriptionKey: "servicesPage.vip.description",
      featureKeys: [
        "servicesPage.vip.feature1",
        "servicesPage.vip.feature2",
        "servicesPage.vip.feature3",
        "servicesPage.vip.feature4",
        "servicesPage.vip.feature5",
      ],
    },
    {
      icon: Briefcase,
      titleKey: "servicesPage.corporate.title",
      descriptionKey: "servicesPage.corporate.description",
      featureKeys: [
        "servicesPage.corporate.feature1",
        "servicesPage.corporate.feature2",
        "servicesPage.corporate.feature3",
        "servicesPage.corporate.feature4",
        "servicesPage.corporate.feature5",
      ],
    },
    {
      icon: Users,
      titleKey: "servicesPage.delegations.title",
      descriptionKey: "servicesPage.delegations.description",
      featureKeys: [
        "servicesPage.delegations.feature1",
        "servicesPage.delegations.feature2",
        "servicesPage.delegations.feature3",
        "servicesPage.delegations.feature4",
        "servicesPage.delegations.feature5",
      ],
    },
    {
      icon: Plane,
      titleKey: "servicesPage.airport.title",
      descriptionKey: "servicesPage.airport.description",
      featureKeys: [
        "servicesPage.airport.feature1",
        "servicesPage.airport.feature2",
        "servicesPage.airport.feature3",
        "servicesPage.airport.feature4",
        "servicesPage.airport.feature5",
      ],
    },
  ];

  return (
    <Layout>
      <Seo page="services" />
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-navy-light to-background">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              {t("servicesPage.label")}
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("servicesPage.title")} <span className="gold-gradient-text">{t("servicesPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              {t("servicesPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Icon/Visual */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <service.icon className="w-16 h-16 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                    {t(service.titleKey)}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {t(service.descriptionKey)}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.featureKeys.map((featureKey) => (
                      <li key={featureKey} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-light">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="luxury-heading text-foreground mb-6">
              {t("servicesPage.cta.title")} <span className="gold-gradient-text">{t("servicesPage.cta.titleHighlight")}</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              {t("servicesPage.cta.subtitle")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("servicesPage.cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
