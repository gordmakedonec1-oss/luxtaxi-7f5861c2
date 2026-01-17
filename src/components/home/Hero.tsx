import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="LuxTaxi Македонија"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Премиум ВИП Превоз</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="luxury-heading text-foreground mb-6">
            <span className="block">LuxTaxi</span>
            <span className="gold-gradient-text">Македонија</span>
          </h1>

          {/* Subheading */}
          <p className="luxury-subheading max-w-2xl mx-auto mb-8">
            Луксузен такси превоз за туристи, бизнис клиенти и делегации низ Македонија и Балканот
          </p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-foreground/60 font-serif italic text-lg mb-10"
          >
            „Симбол на елеганција, сигурност и врвна услуга"
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Резервирај Сега</Link>
            </Button>
            <Button variant="gold-outline" size="xl" asChild>
              <Link to="/destinations">Види Дестинации</Link>
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-foreground/80 font-medium">Лиценциран Превоз</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <span className="text-foreground/80 font-medium">24/7 Достапност</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <span className="text-foreground/80 font-medium">Професионални Шофери</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
