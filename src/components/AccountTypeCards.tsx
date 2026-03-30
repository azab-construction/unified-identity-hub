import { motion } from "framer-motion";
import { Building2, Wrench, User, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const accountTypes = [
  {
    icon: Building2,
    title: "شركة",
    description: "للشركات التي تدير عمليات الصيانة",
    features: ["إدارة الموظفين والفنيين", "التقارير والتحليلات", "إدارة العقود"],
    color: "bg-primary/10 text-primary",
    borderHover: "hover:border-primary/40",
    glowClass: "group-hover:shadow-[0_0_30px_hsl(217_71%_45%/0.12)]",
    buttonLabel: "التسجيل كشركة",
    path: "/signup/company",
  },
  {
    icon: Wrench,
    title: "فني",
    description: "للفنيين الذين يقدمون خدمات الصيانة",
    features: ["استقبال طلبات العمل", "إدارة المواعيد", "تتبع الأرباح"],
    color: "bg-accent/10 text-accent",
    borderHover: "hover:border-accent/40",
    glowClass: "group-hover:shadow-[0_0_30px_hsl(170_60%_45%/0.12)]",
    buttonLabel: "التسجيل كفني",
    path: "/signup/technician",
  },
  {
    icon: User,
    title: "عميل",
    description: "للعملاء الذين يريدون طلب خدمات الصيانة",
    features: ["طلب خدمات الصيانة", "تتبع حالة الطلبات", "تقييم الخدمات"],
    color: "bg-ring/10 text-ring",
    borderHover: "hover:border-ring/40",
    glowClass: "group-hover:shadow-[0_0_30px_hsl(217_71%_45%/0.1)]",
    buttonLabel: "التسجيل كعميل",
    path: "/signup/client",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AccountTypeCards = () => {
  return (
    <section id="services" className="py-16">
      <div className="container text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">اختر نوع حسابك</h2>
          <p className="text-muted-foreground">حدد الدور المناسب لك للحصول على أفضل تجربة</p>
        </motion.div>
      </div>

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
            className={`group bg-card rounded-2xl shadow-card border border-border/50 ${type.borderHover} p-7 flex flex-col items-center text-center transition-all duration-400 hover:-translate-y-2 ${type.glowClass}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${type.color} transition-transform duration-300 group-hover:scale-110`}>
              <type.icon className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2">{type.title}</h3>
            <p className="text-sm text-muted-foreground mb-5">{type.description}</p>

            <ul className="text-sm text-muted-foreground space-y-2.5 mb-7 w-full">
              {type.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 justify-center">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button className="w-full mt-auto gap-2 h-11" asChild>
              <Link to={type.path}>
                <ArrowLeft className="w-4 h-4" />
                {type.buttonLabel}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AccountTypeCards;
