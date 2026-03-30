import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
}

const AuthLayout = ({ children, title, subtitle, icon, accentColor }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Side Panel */}
      <div className={`hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center ${accentColor}`}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-12"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-xl">
              {icon}
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl animate-pulse-ring bg-white/10" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold mb-4">{title}</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">{subtitle}</p>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
            <Shield className="w-4 h-4" />
            حماية مشفرة بالكامل
          </div>
        </motion.div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

        <div className="p-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
