import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, MapPin, Clock, Shield, Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "10+", label: "Години искуство" },
  { value: "5000+", label: "Задоволни клиенти" },
  { value: "50+", label: "Дестинации" },
  { value: "24/7", label: "Достапност" },
];

const values = [
  {
    icon: Shield,
    title: "Безбедност",
    description: "Безбедноста на нашите патници е наш приоритет. Лиценцирани возила со редовен сервис.",
  },
  {
    icon: Clock,
    title: "Точност",
    description: "Секогаш сме навреме. Го следиме вашиот лет и се прилагодуваме на вашите потреби.",
  },
  {
    icon: Award,
    title: "Професионалност",
    description: "Нашите шофери се обучени за врвна услуга и дискреција. Секој детал е важен.",
  },
  {
    icon: Heart,
    title: "Посветеност",
    description: "Секој клиент е важен. Се грижиме за вашето комфорно и пријатно патување.",
  },
];

export default function AboutPage() {
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
              За Нас
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              Луксузен Такси <span className="gold-gradient-text">Превоз</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-3xl mx-auto">
              Симбол на елеганција, сигурност и врвна услуга во премиум превозот низ Балканот
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
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
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
                Добредојдовте во <span className="gold-gradient-text">LuxTaxi Македонија</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none text-center"
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Нашите модерни возила и професионални шофери овозможуваат незаборавно и безбедно патување, 
                без разлика дали патувате кон аеродром, деловен состанок или вашата омилена туристичка дестинација.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Од ВИП аеродромски трансфери, преку приватен превоз за деловни и дипломатски клиенти, 
                до луксузни тури низ балканските метрополи – секое патување со нас е искуство на класа, 
                прецизност и стил.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Со седиште во Битола, ги покриваме сите дестинации низ Македонија и Балканот. 
                Нашата мисија е да обезбедиме врвен комфорт и сигурност за секој патник.
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
              Наши Вредности
            </span>
            <h2 className="luxury-heading text-foreground mb-6">
              Што нè <span className="gold-gradient-text">издвојува</span>
            </h2>
            <div className="divider-gold" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
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
              Започнете го патувањето <span className="gold-gradient-text">денес</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              Контактирајте нè за резервација или понуда
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Контакт</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
