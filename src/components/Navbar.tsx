import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "خدماتنا", href: "#services" },
  { label: "المنصات", href: "#platforms" },
  { label: "المزايا", href: "#features" },
  { label: "تواصل معنا", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
            <span className="font-heading font-bold text-primary-foreground text-lg">Az</span>
          </div>
          <div className="text-right">
            <h1 className="font-heading font-bold text-foreground text-lg leading-tight">Alazab</h1>
            <p className="text-xs text-muted-foreground">نظام المصادقة المركزي</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Globe className="w-4 h-4" />
            العربية
          </Button>
          <Button variant="outline" size="sm">تسجيل الدخول</Button>
          <Button size="sm">إنشاء حساب</Button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-card overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm py-2 text-muted-foreground hover:text-primary">
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">تسجيل الدخول</Button>
                <Button size="sm" className="flex-1">إنشاء حساب</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
