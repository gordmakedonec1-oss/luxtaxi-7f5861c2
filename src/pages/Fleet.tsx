import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Snowflake, Wifi, Briefcase, Check } from "lucide-react";
import passat1 from "@/assets/passat-1.jpg";
import passat2 from "@/assets/passat-2.jpg";
import passat3 from "@/assets/passat-3.jpg";

const vehicles = [
  {
    image: passat1,
    name: "Volkswagen Passat",
    subtitle: "Бизнис Класа",
    description: "Елегантен и моќен, идеален за бизнис патувања и аеродромски трансфери.",
    features: ["4 патници", "Автоматик", "Клима", "WiFi", "Кожни седишта", "USB полнач"],
  },
  {
    image: passat2,
    name: "Volkswagen Passat",
    subtitle: "Комфорт Класа",
    description: "Луксузен кожен ентериер со клима, грејачи и најсовремена технологија.",
    features: ["4 патници", "Греење седишта", "Клима", "Аудио систем", "LED осветлување", "Амбиент"],
  },
  {
    image: passat3,
    name: "Volkswagen Passat",
    subtitle: "Тура Класа",
    description: "Комфорно и безбедно патување низ прекрасните балкански предели.",
    features: ["4 патници", "Навигација", "Климатроник", "Панорама", "Багажник", "Комфорни седишта"],
  },
];

const allFeatures = [
  { icon: Users, label: "Капацитет: 4 патници" },
  { icon: Snowflake, label: "Клима контрола" },
  { icon: Wifi, label: "Бесплатен WiFi" },
  { icon: Briefcase, label: "Голем багажник" },
];

export default function FleetPage() {
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
              Возен Парк
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              Нашите <span className="gold-gradient-text">Возила</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              Модерни Volkswagen Passat возила, опремени со сè што ви треба за комфорно патување
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-secondary/50">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-8">
            {allFeatures.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3">
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-foreground font-medium">{feature.label}</span>
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
                  <p className="text-primary text-sm font-medium mb-2">{vehicle.subtitle}</p>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                    {vehicle.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-secondary rounded-full text-foreground"
                      >
                        <Check className="w-3 h-3 text-primary" />
                        {feature}
                      </span>
                    ))}
                  </div>
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
              Резервирајте <span className="gold-gradient-text">денес</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              Изберете го вашето возило и започнете го патувањето со стил
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Резервирај Сега</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
