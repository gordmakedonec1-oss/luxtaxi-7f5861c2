import { useLanguage, Language } from "@/contexts/LanguageContext";

// Macedonian Flag SVG - Sun with 8 rays
const MacedonianFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#D20000" width="1200" height="600"/>
    {/* 8 rays emanating from center to edges */}
    <polygon fill="#FFE600" points="600,300 0,0 0,150"/>
    <polygon fill="#FFE600" points="600,300 0,450 0,600"/>
    <polygon fill="#FFE600" points="600,300 1200,0 1200,150"/>
    <polygon fill="#FFE600" points="600,300 1200,450 1200,600"/>
    <polygon fill="#FFE600" points="600,300 450,0 750,0"/>
    <polygon fill="#FFE600" points="600,300 450,600 750,600"/>
    <polygon fill="#FFE600" points="600,300 0,225 0,375"/>
    <polygon fill="#FFE600" points="600,300 1200,225 1200,375"/>
    {/* Central sun circle with red border */}
    <circle fill="#FFE600" cx="600" cy="300" r="115"/>
    <circle fill="none" cx="600" cy="300" r="115" stroke="#D20000" strokeWidth="20"/>
  </svg>
);

// UK Flag SVG
const UKFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const languages: { code: Language; name: string }[] = [
  { code: "mk", name: "Македонски" },
  { code: "en", name: "English" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
            language === lang.code
              ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
              : "hover:ring-2 hover:ring-muted-foreground/30"
          }`}
          title={lang.name}
          aria-label={`Switch to ${lang.name}`}
        >
          {lang.code === "mk" ? (
            <MacedonianFlag className="w-6 h-6" />
          ) : (
            <UKFlag className="w-7 h-5" />
          )}
        </button>
      ))}
    </div>
  );
}
