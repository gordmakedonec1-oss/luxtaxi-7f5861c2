import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

export function CTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-navy-light via-background to-navy-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="luxury-heading text-foreground mb-6">
            Подготвени сте за <span className="gold-gradient-text">патување?</span>
          </h2>
          <p className="luxury-subheading mb-10">
            Контактирајте нè денес за резервација или понуда. Достапни сме 24/7 за вашите потреби.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <a href="tel:+38970123456" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Јави се сега
              </a>
            </Button>
            <Button variant="gold-outline" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Контакт форма
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-8">
            <span className="text-primary font-semibold">+389 70 123 456</span> • Достапни 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
}
