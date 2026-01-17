import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Briefcase, Users, Car } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "ВИП Превоз",
    description: "Луксузен ВИП превоз од Битола со дискретен и искусен шофер, идеален за клиенти кои очекуваат највисоко ниво на услуга.",
  },
  {
    icon: Briefcase,
    title: "Корпоративен Транспорт",
    description: "Обезбедуваме корпоративен транспорт за ИТ компании, странски фирми и деловни партнери. Точност и професионалност.",
  },
  {
    icon: Users,
    title: "Превоз на Делегации",
    description: "Транспорт на странски делегации и државни гости со највисоки стандарди за безбедност и репрезентативност.",
  },
  {
    icon: Plane,
    title: "Аеродромски Трансфери",
    description: "Сигурен и луксузен аеродромски трансфер од Битола до сите балкански аеродроми. Навремено пристигнување, без стрес.",
  },
];

export function Services() {
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
            Наши Услуги
          </span>
          <h2 className="luxury-heading text-foreground mb-6">
            Премиум <span className="gold-gradient-text">Превоз</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="luxury-subheading max-w-2xl mx-auto">
            Од аеродромски трансфери до луксузни тури низ балканските метрополи
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="luxury-card p-8 group hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
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
            <Link to="/services">Сите Услуги</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
