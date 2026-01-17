import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Mountain, Building, Search, CreditCard, Banknote, FileText, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Ценовник - сите цени се од Битола до дестинацијата
const destinationCategories = [
  {
    id: "airports",
    nameKey: "destinationsPage.airports",
    icon: Plane,
    isForeign: false,
    destinations: [
      { name: "Атина", priceMkd: null, priceEur: "400 €" },
      { name: "Белград", priceMkd: null, priceEur: "370 €" },
      { name: "Охрид", priceMkd: "3300 ден", priceEur: "55 €" },
      { name: "Скопје", priceMkd: "5500 ден", priceEur: "90 €" },
      { name: "Солун", priceMkd: null, priceEur: "130 €" },
      { name: "Софија", priceMkd: null, priceEur: "250 €" },
      { name: "Тирана", priceMkd: null, priceEur: "150 €" },
    ],
  },
  {
    id: "borders",
    nameKey: "destinationsPage.borders",
    icon: MapPin,
    isForeign: false,
    destinations: [
      { name: "Блаце", priceMkd: "6300 ден", priceEur: "100 €" },
      { name: "Богородица", priceMkd: "5500 ден", priceEur: "90 €" },
      { name: "Деве Баир", priceMkd: "7200 ден", priceEur: "115 €" },
      { name: "Меџитлија / Фришоп", priceMkd: "600/900 ден", priceEur: "10/15 €" },
      { name: "Ново Село", priceMkd: "6500 ден", priceEur: "105 €" },
      { name: "Стење", priceMkd: "1700 ден", priceEur: "28 €" },
      { name: "Табановце", priceMkd: "6000 ден", priceEur: "95 €" },
      { name: "Кафасан", priceMkd: "3800 ден", priceEur: "60 €" },
    ],
  },
  {
    id: "greece",
    nameKey: "destinationsPage.greece",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Аминдео", priceEur: "60 €" },
      { name: "Аспровалта", priceEur: "170 €" },
      { name: "Атина", priceEur: "400 €" },
      { name: "Верија", priceEur: "100 €" },
      { name: "Воден", priceEur: "90 €" },
      { name: "Волос", priceEur: "190 €" },
      { name: "Врахос", priceEur: "200 €" },
      { name: "Гревена", priceEur: "100 €" },
      { name: "Игуменица", priceEur: "180 €" },
      { name: "Јанина", priceEur: "160 €" },
      { name: "Кавала", priceEur: "220 €" },
      { name: "Калитеа", priceEur: "170 €" },
      { name: "Катерини", priceEur: "130 €" },
      { name: "Кожани", priceEur: "90 €" },
      { name: "Костур", priceEur: "100 €" },
      { name: "Лариса", priceEur: "140 €" },
      { name: "Лептокарија", priceEur: "150 €" },
      { name: "Лерин", priceEur: "45 €" },
      { name: "Лефкада", priceEur: "220 €" },
      { name: "Лутраки", priceEur: "90 €" },
      { name: "Метеори", priceEur: "140 €" },
      { name: "Неаврасна", priceEur: "170 €" },
      { name: "Неапори", priceEur: "170 €" },
      { name: "Никити", priceEur: "170 €" },
      { name: "Паљури", priceEur: "190 €" },
      { name: "Паралија", priceEur: "130 €" },
      { name: "Парга", priceEur: "200 €" },
      { name: "Полихроно", priceEur: "170 €" },
      { name: "Птолемаида", priceEur: "80 €" },
      { name: "Сарти", priceEur: "180 €" },
      { name: "Солун", priceEur: "130 €" },
      { name: "Ставрос", priceEur: "200 €" },
      { name: "Торони", priceEur: "190 €" },
      { name: "Ураноуполис", priceEur: "180 €" },
    ],
  },
  {
    id: "serbia",
    nameKey: "destinationsPage.serbia",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Белград", priceEur: "370 €" },
      { name: "Врање", priceEur: "140 €" },
      { name: "Владичин Хан", priceEur: "150 €" },
      { name: "Јагодина", priceEur: "240 €" },
      { name: "Крушевац", priceEur: "240 €" },
      { name: "Лесковац", priceEur: "170 €" },
      { name: "Ниш", priceEur: "190 €" },
      { name: "Нови Сад", priceEur: "400 €" },
    ],
  },
  {
    id: "albania",
    nameKey: "destinationsPage.albania",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Валона", priceEur: "170 €" },
      { name: "Драч", priceEur: "160 €" },
      { name: "Елбасан", priceEur: "100 €" },
      { name: "Корча", priceEur: "70 €" },
      { name: "Ксамил", priceEur: "240 €" },
      { name: "Поградец", priceEur: "70 €" },
      { name: "Саранда", priceEur: "240 €" },
      { name: "Скадар", priceEur: "230 €" },
      { name: "Спиле", priceEur: "150 €" },
      { name: "Тирана", priceEur: "150 €" },
    ],
  },
  {
    id: "bulgaria",
    nameKey: "destinationsPage.bulgaria",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Банско", priceEur: "180 €" },
      { name: "Благоевград", priceEur: "170 €" },
      { name: "Варна", priceEur: "650 €" },
      { name: "Дупница", priceEur: "180 €" },
      { name: "Сандански", priceEur: "170 €" },
      { name: "Софија", priceEur: "250 €" },
      { name: "Кустендил", priceEur: "170 €" },
    ],
  },
  {
    id: "croatia",
    nameKey: "destinationsPage.croatia",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Загреб", priceEur: "500 €" },
      { name: "Сплит", priceEur: "650 €" },
      { name: "Дубровник", priceEur: "550 €" },
    ],
  },
  {
    id: "montenegro",
    nameKey: "destinationsPage.montenegro",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Будва", priceEur: "320 €" },
      { name: "Манастир Острог", priceEur: "330 €" },
      { name: "Подгорица", priceEur: "300 €" },
    ],
  },
  {
    id: "kosovo",
    nameKey: "destinationsPage.kosovo",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { name: "Ѓилане", priceEur: "160 €" },
      { name: "Приштина", priceEur: "150 €" },
    ],
  },
  {
    id: "tourist",
    nameKey: "destinationsPage.tourist",
    icon: Mountain,
    isForeign: false,
    destinations: [
      { name: "Бигорски Манастир", priceMkd: "4500 ден", priceEur: "73 €" },
      { name: "Голема Ливада", priceMkd: "700 ден", priceEur: "12 €" },
      { name: "Градиште Охрид", priceMkd: "3300 ден", priceEur: "55 €" },
      { name: "Дебарски Бањи", priceMkd: "4900 ден", priceEur: "80 €" },
      { name: "Детското Пелистер", priceMkd: "700 ден", priceEur: "12 €" },
      { name: "Коњарка (излет)", priceMkd: "1300 ден", priceEur: "21 €" },
      { name: "Крстоар Манастир", priceMkd: "300 ден", priceEur: "5 €" },
      { name: "Маврово", priceMkd: "4300 ден", priceEur: "70 €" },
      { name: "Мала Ливада", priceMkd: "700 ден", priceEur: "12 €" },
      { name: "Молика", priceMkd: "800 ден", priceEur: "13 €" },
      { name: "Негорски Бањи", priceMkd: "5500 ден", priceEur: "90 €" },
      { name: "Попова Шапка", priceMkd: "5500 ден", priceEur: "90 €" },
      { name: "Свети Наум", priceMkd: "3800 ден", priceEur: "62 €" },
    ],
  },
  {
    id: "cities",
    nameKey: "destinationsPage.cities",
    icon: Building,
    isForeign: false,
    destinations: [
      { name: "Берово", priceMkd: "6800 ден", priceEur: "110 €" },
      { name: "Богданци", priceMkd: "5300 ден", priceEur: "86 €" },
      { name: "Валандово", priceMkd: "5000 ден", priceEur: "81 €" },
      { name: "Велес", priceMkd: "4000 ден", priceEur: "65 €" },
      { name: "Виница", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Гевгелија", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Гостивар", priceMkd: "4200 ден", priceEur: "68 €" },
      { name: "Дебар", priceMkd: "4700 ден", priceEur: "76 €" },
      { name: "Делчево", priceMkd: "6800 ден", priceEur: "110 €" },
      { name: "Демир Капија", priceMkd: "4000 ден", priceEur: "65 €" },
      { name: "Демир Хисар", priceMkd: "900 ден", priceEur: "15 €" },
      { name: "Дојран", priceMkd: "5700 ден", priceEur: "93 €" },
      { name: "Кавадарци", priceMkd: "3200 ден", priceEur: "52 €" },
      { name: "Кичево", priceMkd: "3000 ден", priceEur: "49 €" },
      { name: "Кочани", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Кратово", priceMkd: "6300 ден", priceEur: "102 €" },
      { name: "Крива Паланка", priceMkd: "6800 ден", priceEur: "110 €" },
      { name: "Крушево", priceMkd: "2000 ден", priceEur: "32 €" },
      { name: "Куманово", priceMkd: "6000 ден", priceEur: "97 €" },
      { name: "Македонска Каменица", priceMkd: "6300 ден", priceEur: "102 €" },
      { name: "Македонски Брод", priceMkd: "3000 ден", priceEur: "49 €" },
      { name: "Неготино", priceMkd: "3500 ден", priceEur: "57 €" },
      { name: "Охрид", priceMkd: "2800 ден", priceEur: "45 €" },
      { name: "Пехчево", priceMkd: "6800 ден", priceEur: "110 €" },
      { name: "Прилеп", priceMkd: "1400 ден", priceEur: "23 €" },
      { name: "Пробиштип", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Радовиш", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Ресен", priceMkd: "1300 ден", priceEur: "21 €" },
      { name: "Свети Николе", priceMkd: "4800 ден", priceEur: "78 €" },
      { name: "Скопје", priceMkd: "6300 ден", priceEur: "102 €" },
      { name: "Струга", priceMkd: "3300 ден", priceEur: "54 €" },
      { name: "Струмица", priceMkd: "5800 ден", priceEur: "94 €" },
      { name: "Тетово", priceMkd: "5000 ден", priceEur: "81 €" },
      { name: "Штип", priceMkd: "4800 ден", priceEur: "78 €" },
    ],
  },
];

export default function DestinationsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("airports");
  const [searchTerm, setSearchTerm] = useState("");

  const activeData = destinationCategories.find((c) => c.id === activeCategory);
  
  const filteredDestinations = activeData?.destinations.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {t("destinationsPage.label")}
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              {t("destinationsPage.title")} <span className="gold-gradient-text">{t("destinationsPage.titleHighlight")}</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              {t("destinationsPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-secondary/95">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-3">
            {destinationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {t(category.nameKey)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Results */}
      <section className="section-padding relative z-10 bg-background">
        <div className="container-luxury">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("destinationsPage.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Results Table */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="luxury-card overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-serif font-semibold text-foreground flex items-center gap-3">
                {activeData && <activeData.icon className="w-6 h-6 text-primary" />}
                {activeData && t(activeData.nameKey)}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">{t("destinationsPage.destination")}</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">{t("destinationsPage.price")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDestinations?.map((dest, index) => (
                    <motion.tr
                      key={dest.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground font-medium">{dest.name}</td>
                      <td className="px-6 py-4 text-right">
                        {activeData?.isForeign ? (
                          <span className="text-primary font-semibold">{dest.priceEur}</span>
                        ) : (
                          <div className="flex flex-col items-end gap-1">
                            {"priceMkd" in dest && dest.priceMkd && (
                              <span className="text-primary font-semibold">{String(dest.priceMkd)}</span>
                            )}
                            <span className="text-muted-foreground text-sm">{dest.priceEur}</span>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Payment Info */}
          <div className="mt-12 space-y-6">
            {/* Payment Methods */}
            <div className="luxury-card p-6">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                {t("destinationsPage.paymentMethods")}
              </h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Banknote className="w-5 h-5 text-primary" />
                  <span>{t("destinationsPage.cash")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>{t("destinationsPage.card")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>{t("destinationsPage.invoice")}</span>
                </div>
              </div>
            </div>

            {/* Discount Info */}
            <div className="luxury-card p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {t("destinationsPage.discountTitle")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("destinationsPage.discountText")}
                  </p>
                </div>
              </div>
            </div>
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
              {t("destinationsPage.cta.title")} <span className="gold-gradient-text">{t("destinationsPage.cta.titleHighlight")}</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              {t("destinationsPage.cta.subtitle")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("destinationsPage.cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
