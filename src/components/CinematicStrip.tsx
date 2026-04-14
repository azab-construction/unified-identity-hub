import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const brands = [
  { name: "العزب", logo: "/brands/logo1.png", url: "https://alazab.com" },
  { name: "UberFix", logo: "/brands/logo2.png", url: "https://uberfix.alazab.com" },
  { name: "Luxury Finishing", logo: "/brands/logo3.png", url: "https://luxury-finishing.alazab.com" },
  { name: "Brand Identity", logo: "/brands/logo4.png", url: "https://brand-identity.alazab.com" },
  { name: "لبن العصفور", logo: "/brands/laban-alasfour.png", url: "https://laban-alasfour.alazab.com" },
  { name: "Alazab Group", logo: "/brands/logo5.png", url: "https://alazab.com" },
];

const CinematicStrip = () => {
  const { t } = useLanguage();
  const doubled = [...brands, ...brands];

  return (
    <motion.section
      id="platforms"
      className="py-20 overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >

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
              <div className="w-72 bg-card rounded-2xl shadow-card border border-border/50 p-8 flex flex-col items-center gap-5 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-2 group-hover:border-primary/30">
                <div className="w-24 h-24 rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-20 w-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
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
