import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, MapPin, Mountain, Building, Home, Search } from "lucide-react";

// Ценовник - сите цени се од Битола до дестинацијата
const destinationCategories = [
  {
    id: "airports",
    name: "Аеродроми",
    icon: Plane,
    destinations: [
      { name: "Атина", distance: "582 км", price: "400 €" },
      { name: "Белград", distance: "581 км", price: "370 €" },
      { name: "Охрид", distance: "77 км", price: "3300 ден" },
      { name: "Скопје", distance: "152 км", price: "5500 ден" },
      { name: "Солун", distance: "214 км", price: "130 €" },
      { name: "Софија", distance: "371 км", price: "250 €" },
      { name: "Тирана", distance: "198 км", price: "150 €" },
    ],
  },
  {
    id: "borders",
    name: "Гранични Премини",
    icon: MapPin,
    destinations: [
      { name: "Блаце", distance: "189 км", price: "6300 ден" },
      { name: "Богородица", distance: "173 км", price: "5500 ден" },
      { name: "Деве Баир", distance: "249 км", price: "7200 ден" },
      { name: "Меџитлија / Фришоп", distance: "15.4 км", price: "600/900 ден" },
      { name: "Ново Село", distance: "216 км", price: "6500 ден" },
      { name: "Стење", distance: "52 км", price: "1700 ден" },
      { name: "Табановце", distance: "184 км", price: "6000 ден" },
      { name: "Кафасан", distance: "94.9 км", price: "3800 ден" },
    ],
  },
  {
    id: "tourist",
    name: "Туристички Дестинации",
    icon: Mountain,
    destinations: [
      { name: "Бигорски Манастир", distance: "147 км", price: "4500 ден" },
      { name: "Голема Ливада", distance: "-", price: "700 ден" },
      { name: "Градиште Охрид", distance: "83 км", price: "3300 ден" },
      { name: "Дебарски Бањи", distance: "139 км", price: "4900 ден" },
      { name: "Детското Пелистер", distance: "12.2 км", price: "700 ден" },
      { name: "Коњарка (излет)", distance: "39 км", price: "1300 ден" },
      { name: "Кромберг & Шуберт", distance: "13 км", price: "450 ден" },
      { name: "Крстоар Манастир", distance: "6.5 км", price: "300 ден" },
      { name: "Маврово", distance: "129 км", price: "4300 ден" },
      { name: "Мала Ливада", distance: "12.4 км", price: "700 ден" },
      { name: "Молика", distance: "14.8 км", price: "800 ден" },
      { name: "Негорски Бањи", distance: "166 км", price: "5500 ден" },
      { name: "Попова Шапка", distance: "165 км", price: "5500 ден" },
      { name: "РЕК Рудник", distance: "15.3 км", price: "500 ден" },
      { name: "РЕК Термо", distance: "12.8 км", price: "450 ден" },
      { name: "Свети Наум", distance: "97 км", price: "3800 ден" },
    ],
  },
  {
    id: "cities",
    name: "Градови во Македонија",
    icon: Building,
    destinations: [
      { name: "Берово", distance: "236 км", price: "6800 ден" },
      { name: "Богданци", distance: "176 км", price: "5300 ден" },
      { name: "Валандово", distance: "165 км", price: "5000 ден" },
      { name: "Велес", distance: "121 км", price: "4000 ден" },
      { name: "Виница", distance: "193 км", price: "5800 ден" },
      { name: "Гевгелија", distance: "169 км", price: "5800 ден" },
      { name: "Гостивар", distance: "124 км", price: "4200 ден" },
      { name: "Дебар", distance: "134 км", price: "4700 ден" },
      { name: "Делчево", distance: "233 км", price: "6800 ден" },
      { name: "Демир Капија", distance: "128 км", price: "4000 ден" },
      { name: "Демир Хисар", distance: "28 км", price: "900 ден" },
      { name: "Дојран", distance: "181 км", price: "5700 ден" },
      { name: "Кавадарци", distance: "89 км", price: "3200 ден" },
      { name: "Кичево", distance: "79 км", price: "3000 ден" },
      { name: "Кочани", distance: "185 км", price: "5800 ден" },
      { name: "Кратово", distance: "226 км", price: "6300 ден" },
      { name: "Крива Паланка", distance: "234 км", price: "6800 ден" },
      { name: "Крушево", distance: "53 км", price: "2000 ден" },
      { name: "Куманово", distance: "175 км", price: "6000 ден" },
      { name: "Македонска Каменица", distance: "211 км", price: "6300 ден" },
      { name: "Македонски Брод", distance: "82 км", price: "3000 ден" },
      { name: "Неготино", distance: "101 км", price: "3500 ден" },
      { name: "Охрид", distance: "69 км", price: "2800 ден" },
      { name: "Пехчево", distance: "238 км", price: "6800 ден" },
      { name: "Прилеп", distance: "43 км", price: "1400 ден" },
      { name: "Пробиштип", distance: "187 км", price: "5800 ден" },
      { name: "Радовиш", distance: "156 км", price: "5800 ден" },
      { name: "Ресен", distance: "34 км", price: "1300 ден" },
      { name: "Свети Николе", distance: "151 км", price: "4800 ден" },
      { name: "Скопје", distance: "170 км", price: "6300 ден" },
      { name: "Струга", distance: "83 км", price: "3300 ден" },
      { name: "Струмица", distance: "187 км", price: "5800 ден" },
      { name: "Тетово", distance: "150 км", price: "5000 ден" },
      { name: "Штип", distance: "160 км", price: "4800 ден" },
    ],
  },
  {
    id: "villages",
    name: "Села",
    icon: Home,
    destinations: [
      { name: "Стрежево", distance: "23.1 км", price: "900 ден" },
      { name: "Стругово", distance: "27.3 км", price: "900 ден" },
      { name: "Суво Грло", distance: "38 км", price: "1200 ден" },
      { name: "Суводол Д. Хисар", distance: "27.9 км", price: "900 ден" },
      { name: "Суводол РЕК", distance: "20.4 км", price: "680 ден" },
      { name: "Тепавци", distance: "22.3 км", price: "800 ден" },
      { name: "Тополчани", distance: "25.5 км", price: "800 ден" },
      { name: "Трап", distance: "19.4 км", price: "630 ден" },
      { name: "Трн", distance: "8.6 км", price: "330 ден" },
      { name: "Трново", distance: "7.8 км", price: "300 ден" },
      { name: "Трновци", distance: "29.1 км", price: "950 ден" },
      { name: "Тројкрсти", distance: "27.7 км", price: "900 ден" },
      { name: "Трпејца", distance: "88.2 км", price: "3400 ден" },
      { name: "Утово", distance: "24.7 км", price: "850 ден" },
      { name: "Цапари", distance: "15.5 км", price: "530 ден" },
      { name: "Царев Двор", distance: "32.7 км", price: "1200 ден" },
      { name: "Цер", distance: "64.8 км", price: "2000 ден" },
      { name: "Церово", distance: "52.3 км", price: "1800 ден" },
      { name: "Црничани", distance: "24.9 км", price: "800 ден" },
      { name: "Црнобуки", distance: "11.9 км", price: "400 ден" },
      { name: "Црновец", distance: "20 км", price: "700 ден" },
      { name: "Чарлија", distance: "19.1 км", price: "630 ден" },
      { name: "Чепигово", distance: "29.9 км", price: "1000 ден" },
      { name: "Штрбово", distance: "45.6 км", price: "1500 ден" },
    ],
  },
  {
    id: "greece",
    name: "Грција",
    icon: MapPin,
    destinations: [
      { name: "Аминдео", distance: "61 км", price: "60 €" },
      { name: "Аспровалта", distance: "295 км", price: "170 €" },
      { name: "Атина", distance: "654 км", price: "400 €" },
      { name: "Верија", distance: "155 км", price: "100 €" },
      { name: "Воден", distance: "104 км", price: "90 €" },
      { name: "Волос", distance: "289 км", price: "190 €" },
      { name: "Врахос", distance: "340 км", price: "200 €" },
      { name: "Гревена", distance: "150 км", price: "100 €" },
      { name: "Игуменица", distance: "309 км", price: "180 €" },
      { name: "Јанина", distance: "246 км", price: "160 €" },
      { name: "Кавала", distance: "370 км", price: "220 €" },
      { name: "Калитеа", distance: "285 км", price: "170 €" },
      { name: "Катерини", distance: "223 км", price: "130 €" },
      { name: "Кожани", distance: "108 км", price: "90 €" },
      { name: "Костур", distance: "96 км", price: "100 €" },
      { name: "Лариса", distance: "225 км", price: "140 €" },
      { name: "Лептокарија", distance: "250 км", price: "150 €" },
      { name: "Лерин", distance: "33 км", price: "45 €" },
      { name: "Лефкада", distance: "363 км", price: "220 €" },
      { name: "Лутраки", distance: "123 км", price: "90 €" },
      { name: "Метеори", distance: "214 км", price: "140 €" },
      { name: "Неаврасна", distance: "263 км", price: "170 €" },
      { name: "Неапори", distance: "261 км", price: "170 €" },
      { name: "Никити", distance: "299 км", price: "170 €" },
      { name: "Паљури", distance: "313 км", price: "190 €" },
      { name: "Паралија", distance: "226 км", price: "130 €" },
      { name: "Парга", distance: "329 км", price: "200 €" },
      { name: "Полихроно", distance: "78.9 км", price: "80 €" },
      { name: "Птолемаида", distance: "-", price: "-" },
      { name: "Сарти", distance: "339 км", price: "180 €" },
      { name: "Солун", distance: "201 км", price: "130 €" },
      { name: "Ставрос", distance: "336 км", price: "200 €" },
      { name: "Торони", distance: "356 км", price: "190 €" },
      { name: "Ураноуполис", distance: "300 км", price: "180 €" },
    ],
  },
  {
    id: "serbia",
    name: "Србија",
    icon: MapPin,
    destinations: [
      { name: "Белград", distance: "566 км", price: "370 €" },
      { name: "Врање", distance: "232 км", price: "140 €" },
      { name: "Владичин Хан", distance: "254 км", price: "150 €" },
      { name: "Јагодина", distance: "434 км", price: "240 €" },
      { name: "Крушевац", distance: "400 км", price: "240 €" },
      { name: "Лесковац", distance: "296 км", price: "170 €" },
      { name: "Ниш", distance: "340 км", price: "190 €" },
      { name: "Нови Сад", distance: "662 км", price: "400 €" },
    ],
  },
  {
    id: "bulgaria",
    name: "Бугарија",
    icon: MapPin,
    destinations: [
      { name: "Банско", distance: "323 км", price: "180 €" },
      { name: "Благоевград", distance: "272 км", price: "170 €" },
      { name: "Варна", distance: "813 км", price: "650 €" },
      { name: "Дупница", distance: "304 км", price: "180 €" },
      { name: "Сандански", distance: "264 км", price: "170 €" },
      { name: "Софија", distance: "367 км", price: "250 €" },
      { name: "Кустендил", distance: "273 км", price: "170 €" },
    ],
  },
  {
    id: "albania",
    name: "Албанија",
    icon: MapPin,
    destinations: [
      { name: "Валона", distance: "292 км", price: "170 €" },
      { name: "Драч", distance: "234 км", price: "160 €" },
      { name: "Елбасан", distance: "159 км", price: "100 €" },
      { name: "Корча", distance: "97 км", price: "70 €" },
      { name: "Ксамил", distance: "379 км", price: "240 €" },
      { name: "Поградец", distance: "90 км", price: "70 €" },
      { name: "Саранда", distance: "372 км", price: "240 €" },
      { name: "Скадар", distance: "299 км", price: "230 €" },
      { name: "Спиле", distance: "226 км", price: "150 €" },
      { name: "Тирана", distance: "198 км", price: "150 €" },
    ],
  },
  {
    id: "montenegro",
    name: "Црна Гора",
    icon: MapPin,
    destinations: [
      { name: "Будва", distance: "379 км", price: "320 €" },
      { name: "Манастир Острог", distance: "402 км", price: "330 €" },
      { name: "Подгорица", distance: "358 км", price: "300 €" },
    ],
  },
  {
    id: "kosovo",
    name: "Косово",
    icon: MapPin,
    destinations: [
      { name: "Ѓилане", distance: "224 км", price: "160 €" },
      { name: "Приштина", distance: "259 км", price: "150 €" },
    ],
  },
];

export default function DestinationsPage() {
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
              Дестинации
            </span>
            <h1 className="luxury-heading text-foreground mb-6">
              Цени и <span className="gold-gradient-text">Дестинации</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="luxury-subheading max-w-2xl mx-auto">
              Сите цени се од Битола до дестинацијата и обратно
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-secondary/30 sticky top-[72px] z-40 backdrop-blur-lg">
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
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Results */}
      <section className="section-padding">
        <div className="container-luxury">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Пребарувај дестинација..."
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
                {activeData?.name}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Дестинација</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Растојание</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Цена</th>
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
                      <td className="px-6 py-4 text-muted-foreground">{dest.distance}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-primary font-semibold">{dest.price}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Note */}
          <p className="text-center text-muted-foreground mt-8">
            * Чекање: 1 час = 400 ден. | Сите цени се од Битола до дестинацијата и обратно.
          </p>
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
              Резервирајте го вашето <span className="gold-gradient-text">патување</span>
            </h2>
            <p className="luxury-subheading mb-8 max-w-xl mx-auto">
              Контактирајте нè за точна понуда и резервација
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Контактирајте Нè</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
