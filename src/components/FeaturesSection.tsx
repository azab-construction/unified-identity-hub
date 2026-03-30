import { motion } from "framer-motion";
import { Settings, Zap, Users, ShieldCheck, Fingerprint, CloudCog } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "أمان متقدم", desc: "تشفير من الدرجة العسكرية لحماية بياناتك" },
  { icon: Zap, title: "سرعة فائقة", desc: "استجابة فورية وأداء عالٍ على جميع المنصات" },
  { icon: Users, title: "تجربة سلسة", desc: "واجهة بديهية مصممة للمستخدم العربي" },
  { icon: Settings, title: "تكامل شامل", desc: "ربط جميع الخدمات والمنصات في مكان واحد" },
  { icon: Fingerprint, title: "مصادقة ذكية", desc: "دخول سريع عبر البصمة والتحقق المزدوج" },
  { icon: CloudCog, title: "إدارة سحابية", desc: "بياناتك محفوظة بأمان في السحابة" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            لماذا تختارنا؟
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">مزايا النظام</h2>
          <p className="text-muted-foreground max-w-md mx-auto">تقنيات حديثة تضمن لك أفضل تجربة مصادقة</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card rounded-2xl shadow-card border border-border/50 p-6 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
