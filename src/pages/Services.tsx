import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Briefcase, Users, Plane, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "ВИП и наменски превоз со професионален шофер",
    description: "LuxTaxi нуди луксузен ВИП превоз од Битола со дискретен и искусен шофер, идеален за клиенти кои очекуваат највисоко ниво на услуга. Нашите возила се нови, климатизирани и целосно опремени за комфорно патување.",
    features: [
      "Дискретен и искусен шофер",
      "Нови, климатизирани возила",
      "Целосно опремени за комфор",
      "Идеално за индивидуални клиенти",
      "Совршено за туристи и деловни патувања",
    ],
  },
  {
    icon: Briefcase,
    title: "Корпоративен транспорт за бизниси и ИТ компании",
    description: "Обезбедуваме корпоративен транспорт во Македонија за ИТ компании, странски фирми и деловни партнери. Точноста, професионалниот пристап и флексибилноста нè прават доверлив партнер за секој бизнис настан.",
    features: [
      "Транспорт за ИТ компании",
      "Превоз на деловни партнери",
      "Точност и професионалност",
      "Флексибилни термини",
      "Долгорочна соработка",
    ],
  },
  {
    icon: Users,
    title: "Превоз на делегации и официјални гости",
    description: "LuxTaxi е вистинскиот избор за транспорт на странски делегации и државни гости. Нашиот возен парк одговара на највисоките стандарди за безбедност и репрезентативност.",
    features: [
      "Транспорт на странски делегации",
      "Превоз на државни гости",
      "Највисоки стандарди за безбедност",
      "Пречек на аеродром",
      "Комплетна логистичка поддршка",
    ],
  },
  {
    icon: Plane,
    title: "Аеродромски трансфери",
    description: "Нудиме сигурен и луксузен аеродромски трансфер од Битола до Скопје и обратно, идеален за туристи, бизнис клиенти и странски делегации. Со LuxTaxi, секогаш пристигнувате навреме.",
    features: [
      "Трансфери до сите балкански аеродроми",
      "Следење на лет во реално време",
      "Навремено пристигнување",
      "Без стрес и компромис",
      "Грижа за секој детал",
    ],
  },
];

export default function ServicesPage() {
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
              Наши Услуги
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              Премиум <span className="gold-gradient-text">Услуги</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              Од ВИП превоз до корпоративен транспорт - целосна палета на луксузни услуги
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
                key={service.title}
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
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
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
              Потребен ви е <span className="gold-gradient-text">превоз?</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              Контактирајте нè за резервација или понуда
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
