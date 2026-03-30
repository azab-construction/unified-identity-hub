import { motion } from "framer-motion";
import { Shield, Lock, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const floatingIcons = [
  { icon: Shield, x: "10%", y: "20%", delay: 0, size: "w-8 h-8" },
  { icon: Lock, x: "85%", y: "30%", delay: 0.5, size: "w-6 h-6" },
  { icon: Globe, x: "75%", y: "70%", delay: 1, size: "w-7 h-7" },
];

const stats = [
  { value: "5+", label: "منصة متصلة" },
  { value: "24/7", label: "دعم متواصل" },
  { value: "100%", label: "حماية مشفرة" },
];

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-xl glass border border-border/50 shadow-card text-primary/40"
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <div className="relative">
              <Shield className="w-4 h-4" />
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
            </div>
            نظام مصادقة مركزي آمن
          </motion.div>

          {/* Heading */}
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-foreground leading-tight max-w-3xl">
            حساب واحد{" "}
            <span className="text-gradient">لجميع منصات</span>
            <br />
            <span className="text-primary">Alazab</span>
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
            اختر نوع حسابك وابدأ رحلتك مع أكثر من 5 منصات متخصصة في خدمات الصيانة والتشطيب
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <Button size="lg" className="h-12 px-8 text-base gap-2 shadow-lg" asChild>
              <Link to="/signup/client">
                ابدأ الآن مجاناً
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 md:gap-12 mt-8 pt-8 border-t border-border/50"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-2xl md:text-3xl text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
