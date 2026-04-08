import { motion } from "framer-motion";
import logoAlazab from "@/assets/logo-alazab.png";
import logoUberfix from "@/assets/logo-uberfix.png";
import logoLuxury from "@/assets/logo-luxury.png";
import logoBrand from "@/assets/logo-brand.png";
import logoLaban from "@/assets/logo-laban.png";
import { useLanguage } from "@/contexts/LanguageContext";

const brands = [
  { name: "Alazab", logo: logoAlazab, url: "https://alazab.com" },
  { name: "UberFix", logo: logoUberfix, url: "https://uberfix.alazab.com" },
  { name: "Luxury Finishing", logo: logoLuxury, url: "https://luxury-finishing.alazab.com" },
  { name: "Brand Identity", logo: logoBrand, url: "https://brand-identity.alazab.com" },
  { name: "Laban Alasfour", logo: logoLaban, url: "https://laban-alasfour.alazab.com" },
];

const CinematicStrip = () => {
  const { t } = useLanguage();
  const doubled = [...brands, ...brands];

  return (
    <section id="platforms" className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      <div className="container text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
            {t("platforms.badge")}
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
            {t("platforms.title")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t("platforms.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-strip w-max hover:[animation-play-state:paused]">
          {doubled.map((brand, i) => (
            <a
              key={`${brand.name}-${i}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-5 group"
            >
              <div className="w-56 bg-card rounded-2xl shadow-card border border-border/50 p-7 flex flex-col items-center gap-4 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-2 group-hover:border-primary/30">
                <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-9 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicStrip;
