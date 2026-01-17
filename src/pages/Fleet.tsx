import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Snowflake, Wifi, Briefcase, Armchair } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import passat1 from "@/assets/passat-1.jpg";
import passat2 from "@/assets/passat-2.jpg";
import passat3 from "@/assets/passat-3.jpg";

export default function FleetPage() {
  const { t } = useLanguage();

  const vehicles = [
    {
      image: passat1,
      name: "Volkswagen Passat",
      descriptionKey: "fleetPage.vehicle1.description",
    },
    {
      image: passat2,
      name: "Volkswagen Passat",
      descriptionKey: "fleetPage.vehicle2.description",
    },
    {
      image: passat3,
      name: "Volkswagen Passat",
      descriptionKey: "fleetPage.vehicle3.description",
    },
  ];

  const allFeatures = [
    { icon: Users, labelKey: "fleetPage.passengers" },
    { icon: Snowflake, labelKey: "fleetPage.climate" },
    { icon: Wifi, labelKey: "fleetPage.wireless" },
    { icon: Armchair, labelKey: "fleetPage.seats" },
    { icon: Briefcase, labelKey: "fleetPage.luggage" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-navy-light to-background">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              {t("fleetPage.label")}
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("fleetPage.title")} <span className="gold-gradient-text">{t("fleetPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              {t("fleetPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-secondary/50">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-8">
            {allFeatures.map((feature) => (
              <div key={feature.labelKey} className="flex items-center gap-3">
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">{t(feature.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="luxury-card overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                    {vehicle.name}
                  </h3>
                  <p className="text-muted-foreground">{t(vehicle.descriptionKey)}</p>
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
              {t("fleetPage.cta.title")} <span className="gold-gradient-text">{t("fleetPage.cta.titleHighlight")}</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              {t("fleetPage.cta.subtitle")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("fleetPage.cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
