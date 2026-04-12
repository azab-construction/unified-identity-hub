import { motion } from "framer-motion";
import { Shield, Lock, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const floatingIcons = [
  { icon: Shield, x: "10%", y: "20%", delay: 0, size: "w-8 h-8" },
  { icon: Lock, x: "85%", y: "30%", delay: 0.5, size: "w-6 h-6" },
  { icon: Globe, x: "75%", y: "70%", delay: 1, size: "w-7 h-7" },
];

const HeroSection = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const stats = [
    { value: t("hero.stat1.value"), label: t("hero.stat1.label") },
    { value: t("hero.stat2.value"), label: t("hero.stat2.label") },
    { value: t("hero.stat3.value"), label: t("hero.stat3.label") },
  ];

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg text-primary/60"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <item.icon className={item.size} />
        </motion.div>
      ))}

      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-sm font-medium"
          >
            <div className="relative">
              <Shield className="w-4 h-4" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
            </div>
            {t("hero.badge")}
          </motion.div>

          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white leading-tight max-w-3xl">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
            <br />
            <span className="text-primary">Alazab</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <Button size="lg" className="h-12 px-8 text-base gap-2 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/auth/login">
                {t("hero.cta")}
                <Arrow className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:border-white/30" asChild>
              <Link to="/auth/login">{t("nav.login")}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 md:gap-12 mt-8 pt-8 border-t border-white/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-2xl md:text-3xl text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
