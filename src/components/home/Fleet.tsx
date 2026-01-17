import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Snowflake, Wifi, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import passat1 from "@/assets/passat-1.jpg";
import passat2 from "@/assets/passat-2.jpg";
import passat3 from "@/assets/passat-3.jpg";

const fleetItems = [
  {
    image: passat1,
    title: "Volkswagen Passat",
    subtitleKey: "fleet.exterior",
    descriptionKey: "fleet.vehicle1.description",
  },
  {
    image: passat2,
    title: "Volkswagen Passat",
    subtitleKey: "fleet.interior",
    descriptionKey: "fleet.vehicle2.description",
  },
  {
    image: passat3,
    title: "Volkswagen Passat",
    subtitleKey: "fleet.onRoad",
    descriptionKey: "fleet.vehicle3.description",
  },
];

const features = [
  { icon: Users, labelKey: "fleet.passengers" },
  { icon: Snowflake, labelKey: "fleet.climate" },
  { icon: Wifi, labelKey: "fleet.wifi" },
  { icon: Briefcase, labelKey: "fleet.luggage" },
];

export function Fleet() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % fleetItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + fleetItems.length) % fleetItems.length);
  };

  return (
    <section className="section-padding bg-background">
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
            {t("fleet.label")}
          </span>
          <h2 className="luxury-heading text-foreground mb-6">
            {t("fleet.title")} <span className="gold-gradient-text">{t("fleet.titleHighlight")}</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="luxury-subheading max-w-2xl mx-auto">
            {t("fleet.subtitle")}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src={fleetItems[currentIndex].image}
                  alt={fleetItems[currentIndex].title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-1">
                    {fleetItems[currentIndex].title}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {t(fleetItems[currentIndex].subtitleKey)}
                  </p>
                  <p className="text-muted-foreground">
                    {t(fleetItems[currentIndex].descriptionKey)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {fleetItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {features.map((feature) => (
            <div
              key={feature.labelKey}
              className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-full"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{t(feature.labelKey)}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="gold-outline" size="lg" asChild>
            <Link to="/fleet">{t("fleet.viewAll")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
