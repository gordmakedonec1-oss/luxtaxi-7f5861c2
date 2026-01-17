import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-light border-t border-border">
      <div className="container-luxury section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">LT</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground">LuxTaxi</h3>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">Македонија</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Премиум такси услуги за туристи, бизнис клиенти и делегации низ Македонија и Балканот.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Навигација</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</Link>
              <Link to="/fleet" className="text-muted-foreground hover:text-primary transition-colors">Возен Парк</Link>
              <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">Дестинации</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">За Нас</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Контакт</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Контакт</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+38970123456" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span>+389 70 123 456</span>
              </a>
              <a href="mailto:info@luxtaxi.mk" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@luxtaxi.mk</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Битола, Северна Македонија</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 достапност</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">Следете Нè</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Чекање: 1 час = 400 ден.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-6">
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 LuxTaxi Македонија. Сите права задржани.
          </p>
          <p className="text-sm text-muted-foreground">
            Луксузен превоз од Битола до сите дестинации
          </p>
        </div>
      </div>
    </footer>
  );
}
