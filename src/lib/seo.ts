export const SITE_URL = "https://luxtaxi-mk.com";

export interface PageMeta {
  title: string;
  description: string;
}

export interface RouteMeta {
  path: string;
  /** Breadcrumb label per language */
  crumb: { mk: string; en: string };
  mk: PageMeta;
  en: PageMeta;
}

export const routeMeta: Record<string, RouteMeta> = {
  home: {
    path: "/",
    crumb: { mk: "Почетна", en: "Home" },
    mk: {
      title: "LuxTaxi Битола — Луксузен такси превоз и трансфери",
      description:
        "Премиум такси превоз од Битола до сите дестинации во Македонија и Балканот. Аеродромски трансфери, ВИП и корпоративен превоз, 24/7.",
    },
    en: {
      title: "LuxTaxi Bitola — Luxury Taxi & Airport Transfers",
      description:
        "Premium taxi service from Bitola across Macedonia and the Balkans. Airport transfers, VIP and corporate transport, available 24/7.",
    },
  },
  services: {
    path: "/services",
    crumb: { mk: "Услуги", en: "Services" },
    mk: {
      title: "Нашите услуги — аеродромски, ВИП и корпоративен превоз | LuxTaxi",
      description:
        "Аеродромски трансфери, ВИП превоз, корпоративен транспорт и превоз на делегации од Битола. Фиксни цени договорени однапред.",
    },
    en: {
      title: "Our Services — Airport, VIP & Corporate Transfers | LuxTaxi",
      description:
        "Airport transfers, VIP transport, corporate travel and delegation transport from Bitola. Fixed prices agreed in advance.",
    },
  },
  fleet: {
    path: "/fleet",
    crumb: { mk: "Возен парк", en: "Fleet" },
    mk: {
      title: "Возен парк — Volkswagen Passat | LuxTaxi Битола",
      description:
        "Возете се во удобен и одржуван Volkswagen Passat со клима, WiFi и простор за багаж. Професионален возач на секое патување.",
    },
    en: {
      title: "Our Fleet — Volkswagen Passat | LuxTaxi Bitola",
      description:
        "Travel in a comfortable, well-maintained Volkswagen Passat with air conditioning, WiFi and ample luggage space, plus a professional driver.",
    },
  },
  destinations: {
    path: "/destinations",
    crumb: { mk: "Дестинации", en: "Destinations" },
    mk: {
      title: "Дестинации и цени од Битола | LuxTaxi",
      description:
        "Цени за превоз од Битола до аеродроми, гранични премини, градови во Македонија, Грција, Србија, Албанија, Бугарија и пошироко.",
    },
    en: {
      title: "Destinations & Prices from Bitola | LuxTaxi",
      description:
        "Transfer prices from Bitola to airports, border crossings, Macedonian cities, Greece, Serbia, Albania, Bulgaria and beyond.",
    },
  },
  about: {
    path: "/about",
    crumb: { mk: "За нас", en: "About" },
    mk: {
      title: "За нас — вашиот партнер во патувањето | LuxTaxi Битола",
      description:
        "Запознајте го LuxTaxi Битола: искуство, точност и грижа за патникот на секое патување низ Македонија и Балканот.",
    },
    en: {
      title: "About Us — Your Travel Partner | LuxTaxi Bitola",
      description:
        "Get to know LuxTaxi Bitola: experience, punctuality and passenger care on every journey across Macedonia and the Balkans.",
    },
  },
  contact: {
    path: "/contact",
    crumb: { mk: "Контакт", en: "Contact" },
    mk: {
      title: "Контакт и резервација | LuxTaxi Битола",
      description:
        "Резервирајте превоз преку Viber, WhatsApp, телефон или контакт формата. LuxTaxi Битола е достапен 24 часа, секој ден.",
    },
    en: {
      title: "Contact & Booking | LuxTaxi Bitola",
      description:
        "Book your ride via Viber, WhatsApp, phone or the contact form. LuxTaxi Bitola is available 24 hours a day, every day.",
    },
  },
  reviews: {
    path: "/reviews",
    crumb: { mk: "Мислења", en: "Reviews" },
    mk: {
      title: "Мислења од клиенти | LuxTaxi Битола",
      description:
        "Прочитајте искуства од патници кои патувале со LuxTaxi Битола и оставете го вашето мислење за нашата услуга.",
    },
    en: {
      title: "Customer Reviews | LuxTaxi Bitola",
      description:
        "Read experiences from passengers who travelled with LuxTaxi Bitola and share your own review of our service.",
    },
  },
};

export function breadcrumbJsonLd(key: string, language: "mk" | "en") {
  const meta = routeMeta[key];
  const items = [
    { name: routeMeta.home.crumb[language], item: `${SITE_URL}/` },
  ];
  if (meta && key !== "home") {
    items.push({ name: meta.crumb[language], item: `${SITE_URL}${meta.path}` });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
