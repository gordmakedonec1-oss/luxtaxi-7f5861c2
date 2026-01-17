import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

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
                <p className="text-xs text-muted-foreground tracking-widest uppercase">{t("hero.subtitle")}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">{t("footer.navigation")}</h4>
            <div className="flex flex-col gap-3">
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.services")}
              </Link>
              <Link to="/fleet" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.fleet")}
              </Link>
              <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.destinations")}
              </Link>
              <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.reviews")}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.about")}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.contact")}
              </Link>
            </div>
          </nav>

          {/* Contact Info */}
          <address className="not-italic">
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+38975269459"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>+389 75 269 459</span>
              </a>
              <a
                href="mailto:info@luxtaxi.mk"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>info@luxtaxi.mk</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>{t("footer.availability")}</span>
              </div>
            </div>
          </address>

          {/* Social */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-foreground mb-6">{t("footer.followUs")}</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">{t("footer.waitingFee")}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-6">
        <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2024 LuxTaxi {t("hero.subtitle")}. {t("footer.rights")}</p>
          <p className="text-sm text-muted-foreground">{t("footer.luxuryTransport")}</p>
        </div>
      </div>
    </footer>
  );
}
