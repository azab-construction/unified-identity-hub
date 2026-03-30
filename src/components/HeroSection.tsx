import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Shield className="w-4 h-4" />
            اختر نوع حسابك
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground leading-tight">
            مرحباً بك في{" "}
            <span className="text-primary">Alazab</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-lg">
            يرجى اختيار نوع الحساب المناسب لك للوصول إلى جميع منصاتنا
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
