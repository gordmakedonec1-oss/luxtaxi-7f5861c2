import { useLanguage, Language } from "@/contexts/LanguageContext";

const languages: { code: Language; flag: string; name: string }[] = [
  { code: "mk", flag: "🇲🇰", name: "Македонски" },
  { code: "en", flag: "🇬🇧", name: "English" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 text-lg ${
            language === lang.code
              ? "bg-primary/20 ring-2 ring-primary"
              : "hover:bg-secondary"
          }`}
          title={lang.name}
          aria-label={`Switch to ${lang.name}`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
