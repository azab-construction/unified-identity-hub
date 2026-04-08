import { useState, useEffect } from "react";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.platforms"), href: "#platforms" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled 
        ? "border-border/80 glass-strong shadow-sm" 
        : "border-transparent bg-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span className="font-heading font-bold text-primary-foreground text-lg">Az</span>
          </div>
          <div>
            <h1 className="font-heading font-bold text-foreground text-lg leading-tight">Alazab</h1>
            <p className="text-[10px] text-muted-foreground tracking-wide">{t("nav.subtitle")}</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={toggleLang}>
            <Globe className="w-4 h-4" />
            {t("nav.lang")}
          </Button>
          <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40" asChild>
            <Link to="/login">{t("nav.login")}</Link>
          </Button>
          <Button size="sm" className="shadow-md" asChild>
            <Link to="/signup/client">{t("nav.signup")}</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={toggleLang}>
            <Globe className="w-4 h-4" />
          </Button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border glass-strong overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm py-2.5 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-3 mt-2 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1" asChild><Link to="/login">{t("nav.login")}</Link></Button>
                <Button size="sm" className="flex-1" asChild><Link to="/signup/client">{t("nav.signup")}</Link></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
