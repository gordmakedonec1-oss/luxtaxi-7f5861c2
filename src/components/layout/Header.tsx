import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Почетна", path: "/" },
  { name: "Услуги", path: "/services" },
  { name: "Возен Парк", path: "/fleet" },
  { name: "Дестинации", path: "/destinations" },
  { name: "Рецензии", path: "/reviews" },
  { name: "За Нас", path: "/about" },
  { name: "Контакт", path: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
            <span className="text-primary-foreground font-serif font-bold text-xl">LT</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-serif font-semibold text-foreground">LuxTaxi</h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">Македонија</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+38970123456"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+389 75 269 459</span>
          </a>
          <Button variant="gold" size="lg" asChild>
            <Link to="/contact">Резервирај</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-lg border-b border-border"
          >
            <nav className="container-luxury py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="gold" size="lg" className="mt-4" asChild>
                <Link to="/contact">Резервирај Сега</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
