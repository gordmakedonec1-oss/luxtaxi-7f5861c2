import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Mountain, Building, Search, CreditCard, Banknote, FileText, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Destination {
  nameMk: string;
  nameEn: string;
  priceMkd?: string | null;
  priceEur: string;
}

interface DestinationCategory {
  id: string;
  nameKey: string;
  icon: typeof Plane;
  isForeign: boolean;
  destinations: Destination[];
}

// Ценовник - сите цени се од Битола до дестинацијата
const destinationCategories: DestinationCategory[] = [
  {
    id: "airports",
    nameKey: "destinationsPage.airports",
    icon: Plane,
    isForeign: false,
    destinations: [
      { nameMk: "Атина", nameEn: "Athens", priceMkd: null, priceEur: "400 €" },
      { nameMk: "Белград", nameEn: "Belgrade", priceMkd: null, priceEur: "370 €" },
      { nameMk: "Охрид", nameEn: "Ohrid", priceMkd: "3300 ден", priceEur: "55 €" },
      { nameMk: "Скопје", nameEn: "Skopje", priceMkd: "5500 ден", priceEur: "90 €" },
      { nameMk: "Солун", nameEn: "Thessaloniki", priceMkd: null, priceEur: "130 €" },
      { nameMk: "Софија", nameEn: "Sofia", priceMkd: null, priceEur: "250 €" },
      { nameMk: "Тирана", nameEn: "Tirana", priceMkd: null, priceEur: "150 €" },
    ],
  },
  {
    id: "borders",
    nameKey: "destinationsPage.borders",
    icon: MapPin,
    isForeign: false,
    destinations: [
      { nameMk: "Блаце", nameEn: "Blace", priceMkd: "6300 ден", priceEur: "100 €" },
      { nameMk: "Богородица", nameEn: "Bogorodica", priceMkd: "5500 ден", priceEur: "90 €" },
      { nameMk: "Деве Баир", nameEn: "Deve Bair", priceMkd: "7200 ден", priceEur: "115 €" },
      { nameMk: "Меџитлија / Фришоп", nameEn: "Medzitlija / Free Shop", priceMkd: "600/900 ден", priceEur: "10/15 €" },
      { nameMk: "Ново Село", nameEn: "Novo Selo", priceMkd: "6500 ден", priceEur: "105 €" },
      { nameMk: "Стење", nameEn: "Stenje", priceMkd: "1700 ден", priceEur: "28 €" },
      { nameMk: "Табановце", nameEn: "Tabanovce", priceMkd: "6000 ден", priceEur: "95 €" },
      { nameMk: "Кафасан", nameEn: "Kafasan", priceMkd: "3800 ден", priceEur: "60 €" },
    ],
  },
  {
    id: "greece",
    nameKey: "destinationsPage.greece",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Аминдео", nameEn: "Amyndeo", priceEur: "60 €" },
      { nameMk: "Аспровалта", nameEn: "Asprovalta", priceEur: "170 €" },
      { nameMk: "Атина", nameEn: "Athens", priceEur: "400 €" },
      { nameMk: "Верија", nameEn: "Veria", priceEur: "100 €" },
      { nameMk: "Воден", nameEn: "Edessa", priceEur: "90 €" },
      { nameMk: "Волос", nameEn: "Volos", priceEur: "190 €" },
      { nameMk: "Врахос", nameEn: "Vrahos", priceEur: "200 €" },
      { nameMk: "Гревена", nameEn: "Grevena", priceEur: "100 €" },
      { nameMk: "Игуменица", nameEn: "Igoumenitsa", priceEur: "180 €" },
      { nameMk: "Јанина", nameEn: "Ioannina", priceEur: "160 €" },
      { nameMk: "Кавала", nameEn: "Kavala", priceEur: "220 €" },
      { nameMk: "Калитеа", nameEn: "Kallithea", priceEur: "170 €" },
      { nameMk: "Катерини", nameEn: "Katerini", priceEur: "130 €" },
      { nameMk: "Кожани", nameEn: "Kozani", priceEur: "90 €" },
      { nameMk: "Костур", nameEn: "Kastoria", priceEur: "100 €" },
      { nameMk: "Лариса", nameEn: "Larissa", priceEur: "140 €" },
      { nameMk: "Лептокарија", nameEn: "Leptokarya", priceEur: "150 €" },
      { nameMk: "Лерин", nameEn: "Florina", priceEur: "45 €" },
      { nameMk: "Лефкада", nameEn: "Lefkada", priceEur: "220 €" },
      { nameMk: "Лутраки", nameEn: "Loutraki", priceEur: "90 €" },
      { nameMk: "Метеори", nameEn: "Meteora", priceEur: "140 €" },
      { nameMk: "Неаврасна", nameEn: "Nea Vrasna", priceEur: "170 €" },
      { nameMk: "Неапори", nameEn: "Nea Peramos", priceEur: "170 €" },
      { nameMk: "Никити", nameEn: "Nikiti", priceEur: "170 €" },
      { nameMk: "Паљури", nameEn: "Paliouri", priceEur: "190 €" },
      { nameMk: "Паралија", nameEn: "Paralia", priceEur: "130 €" },
      { nameMk: "Парга", nameEn: "Parga", priceEur: "200 €" },
      { nameMk: "Полихроно", nameEn: "Polychrono", priceEur: "170 €" },
      { nameMk: "Птолемаида", nameEn: "Ptolemaida", priceEur: "80 €" },
      { nameMk: "Сарти", nameEn: "Sarti", priceEur: "180 €" },
      { nameMk: "Солун", nameEn: "Thessaloniki", priceEur: "130 €" },
      { nameMk: "Ставрос", nameEn: "Stavros", priceEur: "200 €" },
      { nameMk: "Торони", nameEn: "Toroni", priceEur: "190 €" },
      { nameMk: "Ураноуполис", nameEn: "Ouranoupoli", priceEur: "180 €" },
    ],
  },
  {
    id: "serbia",
    nameKey: "destinationsPage.serbia",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Белград", nameEn: "Belgrade", priceEur: "370 €" },
      { nameMk: "Врање", nameEn: "Vranje", priceEur: "140 €" },
      { nameMk: "Владичин Хан", nameEn: "Vladicin Han", priceEur: "150 €" },
      { nameMk: "Јагодина", nameEn: "Jagodina", priceEur: "240 €" },
      { nameMk: "Крушевац", nameEn: "Krusevac", priceEur: "240 €" },
      { nameMk: "Лесковац", nameEn: "Leskovac", priceEur: "170 €" },
      { nameMk: "Ниш", nameEn: "Nis", priceEur: "190 €" },
      { nameMk: "Нови Сад", nameEn: "Novi Sad", priceEur: "400 €" },
    ],
  },
  {
    id: "albania",
    nameKey: "destinationsPage.albania",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Валона", nameEn: "Vlora", priceEur: "170 €" },
      { nameMk: "Драч", nameEn: "Durres", priceEur: "160 €" },
      { nameMk: "Елбасан", nameEn: "Elbasan", priceEur: "100 €" },
      { nameMk: "Корча", nameEn: "Korca", priceEur: "70 €" },
      { nameMk: "Ксамил", nameEn: "Ksamil", priceEur: "240 €" },
      { nameMk: "Поградец", nameEn: "Pogradec", priceEur: "70 €" },
      { nameMk: "Саранда", nameEn: "Saranda", priceEur: "240 €" },
      { nameMk: "Скадар", nameEn: "Shkoder", priceEur: "230 €" },
      { nameMk: "Спиле", nameEn: "Spille", priceEur: "150 €" },
      { nameMk: "Тирана", nameEn: "Tirana", priceEur: "150 €" },
    ],
  },
  {
    id: "bulgaria",
    nameKey: "destinationsPage.bulgaria",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Банско", nameEn: "Bansko", priceEur: "180 €" },
      { nameMk: "Благоевград", nameEn: "Blagoevgrad", priceEur: "170 €" },
      { nameMk: "Варна", nameEn: "Varna", priceEur: "650 €" },
      { nameMk: "Дупница", nameEn: "Dupnitsa", priceEur: "180 €" },
      { nameMk: "Сандански", nameEn: "Sandanski", priceEur: "170 €" },
      { nameMk: "Софија", nameEn: "Sofia", priceEur: "250 €" },
      { nameMk: "Кустендил", nameEn: "Kyustendil", priceEur: "170 €" },
    ],
  },
  {
    id: "croatia",
    nameKey: "destinationsPage.croatia",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Загреб", nameEn: "Zagreb", priceEur: "500 €" },
      { nameMk: "Сплит", nameEn: "Split", priceEur: "650 €" },
      { nameMk: "Дубровник", nameEn: "Dubrovnik", priceEur: "550 €" },
    ],
  },
  {
    id: "montenegro",
    nameKey: "destinationsPage.montenegro",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Будва", nameEn: "Budva", priceEur: "320 €" },
      { nameMk: "Манастир Острог", nameEn: "Ostrog Monastery", priceEur: "330 €" },
      { nameMk: "Подгорица", nameEn: "Podgorica", priceEur: "300 €" },
    ],
  },
  {
    id: "kosovo",
    nameKey: "destinationsPage.kosovo",
    icon: MapPin,
    isForeign: true,
    destinations: [
      { nameMk: "Ѓилане", nameEn: "Gjilan", priceEur: "160 €" },
      { nameMk: "Приштина", nameEn: "Pristina", priceEur: "150 €" },
    ],
  },
  {
    id: "tourist",
    nameKey: "destinationsPage.tourist",
    icon: Mountain,
    isForeign: false,
    destinations: [
      { nameMk: "Бигорски Манастир", nameEn: "Bigorski Monastery", priceMkd: "4500 ден", priceEur: "73 €" },
      { nameMk: "Голема Ливада", nameEn: "Golema Livada", priceMkd: "700 ден", priceEur: "12 €" },
      { nameMk: "Градиште Охрид", nameEn: "Gradiste Ohrid", priceMkd: "3300 ден", priceEur: "55 €" },
      { nameMk: "Дебарски Бањи", nameEn: "Debar Spa", priceMkd: "4900 ден", priceEur: "80 €" },
      { nameMk: "Детското Пелистер", nameEn: "Pelister Children's Resort", priceMkd: "700 ден", priceEur: "12 €" },
      { nameMk: "Коњарка (излет)", nameEn: "Konjarka (excursion)", priceMkd: "1300 ден", priceEur: "21 €" },
      { nameMk: "Крстоар Манастир", nameEn: "Krstoar Monastery", priceMkd: "300 ден", priceEur: "5 €" },
      { nameMk: "Маврово", nameEn: "Mavrovo", priceMkd: "4300 ден", priceEur: "70 €" },
      { nameMk: "Мала Ливада", nameEn: "Mala Livada", priceMkd: "700 ден", priceEur: "12 €" },
      { nameMk: "Молика", nameEn: "Molika", priceMkd: "800 ден", priceEur: "13 €" },
      { nameMk: "Негорски Бањи", nameEn: "Negorski Spa", priceMkd: "5500 ден", priceEur: "90 €" },
      { nameMk: "Попова Шапка", nameEn: "Popova Shapka", priceMkd: "5500 ден", priceEur: "90 €" },
      { nameMk: "Свети Наум", nameEn: "St. Naum", priceMkd: "3800 ден", priceEur: "62 €" },
    ],
  },
  {
    id: "cities",
    nameKey: "destinationsPage.cities",
    icon: Building,
    isForeign: false,
    destinations: [
      { nameMk: "Берово", nameEn: "Berovo", priceMkd: "6800 ден", priceEur: "110 €" },
      { nameMk: "Богданци", nameEn: "Bogdanci", priceMkd: "5300 ден", priceEur: "86 €" },
      { nameMk: "Валандово", nameEn: "Valandovo", priceMkd: "5000 ден", priceEur: "81 €" },
      { nameMk: "Велес", nameEn: "Veles", priceMkd: "4000 ден", priceEur: "65 €" },
      { nameMk: "Виница", nameEn: "Vinica", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Гевгелија", nameEn: "Gevgelija", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Гостивар", nameEn: "Gostivar", priceMkd: "4200 ден", priceEur: "68 €" },
      { nameMk: "Дебар", nameEn: "Debar", priceMkd: "4700 ден", priceEur: "76 €" },
      { nameMk: "Делчево", nameEn: "Delcevo", priceMkd: "6800 ден", priceEur: "110 €" },
      { nameMk: "Демир Капија", nameEn: "Demir Kapija", priceMkd: "4000 ден", priceEur: "65 €" },
      { nameMk: "Демир Хисар", nameEn: "Demir Hisar", priceMkd: "900 ден", priceEur: "15 €" },
      { nameMk: "Дојран", nameEn: "Dojran", priceMkd: "5700 ден", priceEur: "93 €" },
      { nameMk: "Кавадарци", nameEn: "Kavadarci", priceMkd: "3200 ден", priceEur: "52 €" },
      { nameMk: "Кичево", nameEn: "Kicevo", priceMkd: "3000 ден", priceEur: "49 €" },
      { nameMk: "Кочани", nameEn: "Kocani", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Кратово", nameEn: "Kratovo", priceMkd: "6300 ден", priceEur: "102 €" },
      { nameMk: "Крива Паланка", nameEn: "Kriva Palanka", priceMkd: "6800 ден", priceEur: "110 €" },
      { nameMk: "Крушево", nameEn: "Krusevo", priceMkd: "2000 ден", priceEur: "32 €" },
      { nameMk: "Куманово", nameEn: "Kumanovo", priceMkd: "6000 ден", priceEur: "97 €" },
      { nameMk: "Македонска Каменица", nameEn: "Makedonska Kamenica", priceMkd: "6300 ден", priceEur: "102 €" },
      { nameMk: "Македонски Брод", nameEn: "Makedonski Brod", priceMkd: "3000 ден", priceEur: "49 €" },
      { nameMk: "Неготино", nameEn: "Negotino", priceMkd: "3500 ден", priceEur: "57 €" },
      { nameMk: "Охрид", nameEn: "Ohrid", priceMkd: "2800 ден", priceEur: "45 €" },
      { nameMk: "Пехчево", nameEn: "Pehcevo", priceMkd: "6800 ден", priceEur: "110 €" },
      { nameMk: "Прилеп", nameEn: "Prilep", priceMkd: "1400 ден", priceEur: "23 €" },
      { nameMk: "Пробиштип", nameEn: "Probistip", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Радовиш", nameEn: "Radovis", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Ресен", nameEn: "Resen", priceMkd: "1300 ден", priceEur: "21 €" },
      { nameMk: "Свети Николе", nameEn: "Sveti Nikole", priceMkd: "4800 ден", priceEur: "78 €" },
      { nameMk: "Скопје", nameEn: "Skopje", priceMkd: "6300 ден", priceEur: "102 €" },
      { nameMk: "Струга", nameEn: "Struga", priceMkd: "3300 ден", priceEur: "54 €" },
      { nameMk: "Струмица", nameEn: "Strumica", priceMkd: "5800 ден", priceEur: "94 €" },
      { nameMk: "Тетово", nameEn: "Tetovo", priceMkd: "5000 ден", priceEur: "81 €" },
      { nameMk: "Штип", nameEn: "Stip", priceMkd: "4800 ден", priceEur: "78 €" },
    ],
  },
];

export default function DestinationsPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("airports");
  const [searchTerm, setSearchTerm] = useState("");

  const activeData = destinationCategories.find((c) => c.id === activeCategory);
  
  const getDestinationName = (dest: Destination) => {
    return language === "mk" ? dest.nameMk : dest.nameEn;
  };
  
  const filteredDestinations = activeData?.destinations.filter((d) =>
    getDestinationName(d).toLowerCase().includes(searchTerm.toLowerCase())
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
                      key={dest.nameMk}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground font-medium">{getDestinationName(dest)}</td>
                      <td className="px-6 py-4 text-right">
                        {activeData?.isForeign ? (
                          <span className="text-primary font-semibold">{dest.priceEur}</span>
                        ) : (
                          <div className="flex flex-col items-end gap-1">
                            {dest.priceMkd && (
                              <span className="text-primary font-semibold">{dest.priceMkd}</span>
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
