import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "mk" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  mk: {
    // Navigation
    "nav.home": "Почетна",
    "nav.services": "Услуги",
    "nav.fleet": "Возен Парк",
    "nav.destinations": "Дестинации",
    "nav.reviews": "Рецензии",
    "nav.about": "За Нас",
    "nav.contact": "Контакт",
    "nav.book": "Резервирај",
    
    // Hero
    "hero.badge": "Премиум ВИП Превоз",
    "hero.title": "LuxTaxi",
    "hero.subtitle": "Македонија",
    "hero.description": "Луксузен такси превоз за туристи, бизнис клиенти и делегации низ Македонија и Балканот",
    "hero.tagline": "Симбол на елеганција, сигурност и врвна услуга",
    "hero.bookNow": "Резервирај Сега",
    "hero.viewDestinations": "Види Дестинации",
    "hero.licensedTransport": "Лиценциран Превоз",
    "hero.availability": "24/7 Достапност",
    "hero.professionalDrivers": "Професионални Шофери",
    
    // Services section
    "services.label": "Наши Услуги",
    "services.title": "Премиум",
    "services.titleHighlight": "Превоз",
    "services.subtitle": "Од аеродромски трансфери до луксузни тури низ балканските метрополи",
    "services.allServices": "Сите Услуги",
    "services.vip.title": "ВИП Превоз",
    "services.vip.description": "Луксузен ВИП превоз од Битола со дискретен и искусен шофер, идеален за клиенти кои очекуваат највисоко ниво на услуга.",
    "services.corporate.title": "Корпоративен Транспорт",
    "services.corporate.description": "Обезбедуваме корпоративен транспорт за ИТ компании, странски фирми и деловни партнери. Точност и професионалност.",
    "services.delegations.title": "Превоз на Делегации",
    "services.delegations.description": "Транспорт на странски делегации и државни гости со највисоки стандарди за безбедност и репрезентативност.",
    "services.airport.title": "Аеродромски Трансфери",
    "services.airport.description": "Сигурен и луксузен аеродромски трансфер од Битола до сите балкански аеродроми. Навремено пристигнување, без стрес.",
    
    // Why Us section
    "whyUs.label": "Зошто Ние",
    "whyUs.title": "Зошто да",
    "whyUs.titleHighlight": "Не Одберете",
    "whyUs.subtitle": "Секое патување со нас е искуство на класа, прецизност и стил",
    "whyUs.drivers.title": "Професионални Шофери",
    "whyUs.drivers.description": "Искусни и дискретни шофери со познавање на сите рути низ Балканот.",
    "whyUs.punctuality.title": "Точност",
    "whyUs.punctuality.description": "Го следиме вашиот лет и секогаш сме навреме за пречек или испраќање.",
    "whyUs.safety.title": "Безбедност",
    "whyUs.safety.description": "Лиценцирани возила со редовен сервис и целосно осигурување.",
    "whyUs.terrain.title": "Познавање на Терен",
    "whyUs.terrain.description": "Ги знаеме сите патишта, алтернативни рути и локални совети.",
    "whyUs.prices.title": "Фиксни Цени",
    "whyUs.prices.description": "Транспарентен ценовник без скриени трошоци. Знаете колку плаќате.",
    "whyUs.support.title": "24/7 Поддршка",
    "whyUs.support.description": "Достапни сме во секое време за вашите резервации и прашања.",
    
    // CTA section
    "cta.title": "Подготвени сте за",
    "cta.titleHighlight": "патување?",
    "cta.description": "Контактирајте нè денес за резервација или понуда. Достапни сме 24/7 за вашите потреби.",
    "cta.callNow": "Јави се сега",
    "cta.contactForm": "Контакт форма",
    "cta.available": "Достапни 24/7",
    
    // Footer
    "footer.description": "Премиум такси услуги за туристи, бизнис клиенти и делегации низ Македонија и Балканот.",
    "footer.navigation": "Навигација",
    "footer.contact": "Контакт",
    "footer.followUs": "Следете Нè",
    "footer.waitingFee": "Чекање: 1 час = 400 ден.",
    "footer.rights": "Сите права задржани.",
    "footer.luxuryTransport": "Луксузен превоз од Битола до сите дестинации",
    "footer.location": "Битола, Македонија",
    "footer.availability": "24/7 достапност",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.fleet": "Fleet",
    "nav.destinations": "Destinations",
    "nav.reviews": "Reviews",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.book": "Book Now",
    
    // Hero
    "hero.badge": "Premium VIP Transport",
    "hero.title": "LuxTaxi",
    "hero.subtitle": "Macedonia",
    "hero.description": "Luxury taxi transport for tourists, business clients and delegations across Macedonia and the Balkans",
    "hero.tagline": "\"A symbol of elegance, safety and premium service\"",
    "hero.bookNow": "Book Now",
    "hero.viewDestinations": "View Destinations",
    "hero.licensedTransport": "Licensed Transport",
    "hero.availability": "24/7 Availability",
    "hero.professionalDrivers": "Professional Drivers",
    
    // Services section
    "services.label": "Our Services",
    "services.title": "Premium",
    "services.titleHighlight": "Transport",
    "services.subtitle": "From airport transfers to luxury tours across Balkan metropolises",
    "services.allServices": "All Services",
    "services.vip.title": "VIP Transport",
    "services.vip.description": "Luxury VIP transport from Bitola with a discreet and experienced driver, ideal for clients who expect the highest level of service.",
    "services.corporate.title": "Corporate Transport",
    "services.corporate.description": "We provide corporate transport for IT companies, foreign firms and business partners. Punctuality and professionalism.",
    "services.delegations.title": "Delegation Transport",
    "services.delegations.description": "Transport of foreign delegations and state guests with the highest standards of security and representativeness.",
    "services.airport.title": "Airport Transfers",
    "services.airport.description": "Safe and luxurious airport transfer from Bitola to all Balkan airports. Timely arrival, stress-free.",
    
    // Why Us section
    "whyUs.label": "Why Us",
    "whyUs.title": "Why",
    "whyUs.titleHighlight": "Choose Us",
    "whyUs.subtitle": "Every journey with us is an experience of class, precision and style",
    "whyUs.drivers.title": "Professional Drivers",
    "whyUs.drivers.description": "Experienced and discreet drivers with knowledge of all routes across the Balkans.",
    "whyUs.punctuality.title": "Punctuality",
    "whyUs.punctuality.description": "We track your flight and are always on time for pickup or drop-off.",
    "whyUs.safety.title": "Safety",
    "whyUs.safety.description": "Licensed vehicles with regular service and full insurance.",
    "whyUs.terrain.title": "Local Knowledge",
    "whyUs.terrain.description": "We know all the roads, alternative routes and local tips.",
    "whyUs.prices.title": "Fixed Prices",
    "whyUs.prices.description": "Transparent pricing without hidden costs. You know what you pay.",
    "whyUs.support.title": "24/7 Support",
    "whyUs.support.description": "We are available at any time for your reservations and questions.",
    
    // CTA section
    "cta.title": "Ready for your",
    "cta.titleHighlight": "journey?",
    "cta.description": "Contact us today for a reservation or quote. We are available 24/7 for your needs.",
    "cta.callNow": "Call Now",
    "cta.contactForm": "Contact Form",
    "cta.available": "Available 24/7",
    
    // Footer
    "footer.description": "Premium taxi services for tourists, business clients and delegations across Macedonia and the Balkans.",
    "footer.navigation": "Navigation",
    "footer.contact": "Contact",
    "footer.followUs": "Follow Us",
    "footer.waitingFee": "Waiting: 1 hour = 400 MKD",
    "footer.rights": "All rights reserved.",
    "footer.luxuryTransport": "Luxury transport from Bitola to all destinations",
    "footer.location": "Bitola, Macedonia",
    "footer.availability": "24/7 availability",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("luxtaxi-language");
    return (saved as Language) || "mk";
  });

  useEffect(() => {
    localStorage.setItem("luxtaxi-language", language);
    document.documentElement.lang = language === "mk" ? "mk" : "en";
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
