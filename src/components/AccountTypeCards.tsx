import { motion } from "framer-motion";
import { Building2, Wrench, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const accountTypes = [
  {
    icon: Building2,
    title: "شركة",
    description: "للشركات التي تدير عمليات الصيانة",
    features: ["إدارة الموظفين والفنيين", "التقارير والتحليلات", "إدارة العقود"],
    color: "bg-primary/10 text-primary",
    buttonLabel: "التسجيل كشركة",
  },
  {
    icon: Wrench,
    title: "فني",
    description: "للفنيين الذين يقدمون خدمات الصيانة",
    features: ["استقبال طلبات العمل", "إدارة المواعيد", "تتبع الأرباح"],
    color: "bg-accent/10 text-accent",
    buttonLabel: "التسجيل كفني",
  },
  {
    icon: User,
    title: "عميل",
    description: "للعملاء الذين يريدون طلب خدمات الصيانة",
    features: ["طلب خدمات الصيانة", "تتبع حالة الطلبات", "تقييم الخدمات"],
    color: "bg-blue-500/10 text-blue-600",
    buttonLabel: "التسجيل كعميل",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AccountTypeCards = () => {
  return (
    <section className="py-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
      >
        {accountTypes.map((type) => (
          <motion.div
            key={type.title}
            variants={item}
            className="group bg-card rounded-xl shadow-card hover:shadow-card-hover border border-border/50 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${type.color}`}>
              <type.icon className="w-7 h-7" />
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2">{type.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{type.description}</p>

            <ul className="text-sm text-muted-foreground space-y-2 mb-6 w-full">
              {type.features.map((f) => (
                <li key={f} className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {f}
                </li>
              ))}
            </ul>

            <Button className="w-full mt-auto gap-2">
              <ArrowLeft className="w-4 h-4" />
              {type.buttonLabel}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AccountTypeCards;
