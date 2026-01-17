import { useLanguage, Language } from "@/contexts/LanguageContext";

// Macedonian Flag SVG
const MacedonianFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#D20000" width="512" height="512"/>
    <polygon fill="#FFE600" points="256,77 295,192 256,256"/>
    <polygon fill="#FFE600" points="256,77 217,192 256,256"/>
    <polygon fill="#FFE600" points="256,435 295,320 256,256"/>
    <polygon fill="#FFE600" points="256,435 217,320 256,256"/>
    <polygon fill="#FFE600" points="77,256 192,217 256,256"/>
    <polygon fill="#FFE600" points="77,256 192,295 256,256"/>
    <polygon fill="#FFE600" points="435,256 320,217 256,256"/>
    <polygon fill="#FFE600" points="435,256 320,295 256,256"/>
    <circle fill="#D20000" cx="256" cy="256" r="77" stroke="#FFE600" strokeWidth="20"/>
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
