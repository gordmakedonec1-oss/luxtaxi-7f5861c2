import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Briefcase, Users, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      titleKey: "services.vip.title",
      descriptionKey: "services.vip.description",
    },
    {
      icon: Briefcase,
      titleKey: "services.corporate.title",
      descriptionKey: "services.corporate.description",
    },
    {
      icon: Users,
      titleKey: "services.delegations.title",
      descriptionKey: "services.delegations.description",
    },
    {
      icon: Plane,
      titleKey: "services.airport.title",
      descriptionKey: "services.airport.description",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-navy-light">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            {t("services.label")}
          </span>
          <h2 className="luxury-heading text-foreground mb-6">
            {t("services.title")} <span className="gold-gradient-text">{t("services.titleHighlight")}</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="luxury-subheading max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="luxury-card p-8 group hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="gold-outline" size="lg" asChild>
            <Link to="/services">{t("services.allServices")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
