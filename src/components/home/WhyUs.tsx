import { motion } from "framer-motion";
import { Award, Clock, Shield, MapPin, CreditCard, HeadphonesIcon } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Професионални Шофери",
    description: "Искусни и дискретни шофери со познавање на сите рути низ Балканот.",
  },
  {
    icon: Clock,
    title: "Точност",
    description: "Го следиме вашиот лет и секогаш сме навреме за пречек или испраќање.",
  },
  {
    icon: Shield,
    title: "Безбедност",
    description: "Лиценцирани возила со редовен сервис и целосно осигурување.",
  },
  {
    icon: MapPin,
    title: "Познавање на Терен",
    description: "Ги знаеме сите патишта, алтернативни рути и локални совети.",
  },
  {
    icon: CreditCard,
    title: "Фиксни Цени",
    description: "Транспарентен ценовник без скриени трошоци. Знаете колку плаќате.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Поддршка",
    description: "Достапни сме во секое време за вашите резервации и прашања.",
  },
];

export function WhyUs() {
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
            Зошто Ние
          </span>
          <h2 className="luxury-heading text-foreground mb-6">
            Зошто да <span className="gold-gradient-text">Не Одберете</span>
          </h2>
          <div className="divider-gold mb-6" />
          <p className="luxury-subheading max-w-2xl mx-auto">
            Секое патување со нас е искуство на класа, прецизност и стил
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                <reason.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
