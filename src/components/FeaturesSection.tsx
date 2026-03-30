import { motion } from "framer-motion";
import { Settings, Zap, Users, ShieldCheck } from "lucide-react";

const features = [
  { icon: Settings, title: "تكامل كامل", desc: "ربط جميع الخدمات في مكان واحد" },
  { icon: Zap, title: "خدمة سريعة", desc: "استجابة فورية لطلباتك" },
  { icon: Users, title: "تجربة سهلة", desc: "واجهة بسيطة وسهلة الاستخدام" },
  { icon: ShieldCheck, title: "الأمان والحماية", desc: "حماية متقدمة لبياناتك" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-muted/50">
      <div className="container text-center mb-10">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">مزايا النظام</h2>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl shadow-card border border-border/50 p-6 text-center hover:shadow-card-hover transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
