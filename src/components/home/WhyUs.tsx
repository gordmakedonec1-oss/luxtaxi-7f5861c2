import { motion } from "framer-motion";
import { Award, Clock, Shield, MapPin, CreditCard, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyUs() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Award,
      titleKey: "whyUs.drivers.title",
      descriptionKey: "whyUs.drivers.description",
    },
    {
      icon: Clock,
      titleKey: "whyUs.punctuality.title",
      descriptionKey: "whyUs.punctuality.description",
    },
    {
      icon: Shield,
      titleKey: "whyUs.safety.title",
      descriptionKey: "whyUs.safety.description",
    },
    {
      icon: MapPin,
      titleKey: "whyUs.terrain.title",
      descriptionKey: "whyUs.terrain.description",
    },
    {
      icon: CreditCard,
      titleKey: "whyUs.prices.title",
      descriptionKey: "whyUs.prices.description",
    },
    {
      icon: HeadphonesIcon,
      titleKey: "whyUs.support.title",
      descriptionKey: "whyUs.support.description",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-navy-light to-background">
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
            {t("whyUs.label")}
          </span>
          <h2 className="luxury-heading text-foreground mb-6">
            {t("whyUs.title")} <span className="gold-gradient-text">{t("whyUs.titleHighlight")}</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="luxury-subheading max-w-2xl mx-auto">
            {t("whyUs.subtitle")}
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                <reason.icon className="w-10 h-10 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {t(reason.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(reason.descriptionKey)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
