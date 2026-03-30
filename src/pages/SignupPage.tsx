import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Wrench, User, Mail, Lock, Eye, EyeOff, UserCircle, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/AuthLayout";
import { motion } from "framer-motion";

const accountConfig = {
  company: {
    icon: <Building2 className="w-12 h-12 text-white" />,
    title: "تسجيل شركة جديدة",
    subtitle: "أنشئ حساب شركتك وابدأ بإدارة عمليات الصيانة",
    accent: "gradient-hero",
    label: "شركة",
    extraFields: [
      { id: "companyName", label: "اسم الشركة", icon: Building2, placeholder: "أدخل اسم الشركة", type: "text" },
      { id: "commercialReg", label: "السجل التجاري", icon: UserCircle, placeholder: "رقم السجل التجاري", type: "text" },
    ],
  },
  technician: {
    icon: <Wrench className="w-12 h-12 text-white" />,
    title: "تسجيل فني جديد",
    subtitle: "انضم كفني وابدأ باستقبال طلبات العمل",
    accent: "bg-accent",
    label: "فني",
    extraFields: [
      { id: "specialty", label: "التخصص", icon: Wrench, placeholder: "مثال: كهرباء، سباكة، تكييف", type: "text" },
      { id: "experience", label: "سنوات الخبرة", icon: UserCircle, placeholder: "عدد سنوات الخبرة", type: "number" },
    ],
  },
  client: {
    icon: <User className="w-12 h-12 text-white" />,
    title: "تسجيل عميل جديد",
    subtitle: "أنشئ حسابك واطلب خدمات الصيانة بسهولة",
    accent: "gradient-hero-vivid",
    label: "عميل",
    extraFields: [],
  },
};

type AccountType = keyof typeof accountConfig;

const PasswordStrength = ({ password }: { password: string }) => {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return Math.min(s, 4);
  };
  const strength = getStrength();
  const labels = ["", "ضعيفة", "متوسطة", "جيدة", "قوية"];
  const colors = ["", "bg-destructive", "bg-orange-400", "bg-accent", "bg-green-500"];

  if (!password) return null;

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= strength ? colors[strength] : "bg-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{labels[strength]}</span>
    </div>
  );
};

const SignupPage = () => {
  const { type } = useParams<{ type: string }>();
  const accountType = (type && type in accountConfig ? type : "client") as AccountType;
  const config = accountConfig[accountType];
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <AuthLayout
      title={config.title}
      subtitle={config.subtitle}
      icon={config.icon}
      accentColor={config.accent}
    >
      <div className="space-y-5">
        <div className="text-center lg:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
            <Check className="w-3 h-3" />
            حساب {config.label}
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground text-sm mt-1">{config.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">الاسم الأول</Label>
              <div className="relative">
                <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="firstName" placeholder="الاسم الأول" className="pr-10 h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">اسم العائلة</Label>
              <Input id="lastName" placeholder="اسم العائلة" className="h-11 rounded-xl" />
            </div>
          </div>

          {config.extraFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <div className="relative">
                <field.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id={field.id} type={field.type} placeholder={field.placeholder} className="pr-10 h-11 rounded-xl" />
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="phone" type="tel" placeholder="+966 5XX XXX XXXX" className="pr-10 h-11 rounded-xl" dir="ltr" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="example@email.com" className="pr-10 h-11 rounded-xl" dir="ltr" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10 pl-10 h-11 rounded-xl"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="terms" className="mt-1" />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              أوافق على{" "}
              <a href="#" className="text-primary hover:underline">الشروط والأحكام</a>
              {" "}و{" "}
              <a href="#" className="text-primary hover:underline">سياسة الخصوصية</a>
            </label>
          </div>

          <Button className="w-full h-11 text-base rounded-xl shadow-md hover:shadow-lg transition-shadow">
            إنشاء الحساب
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-4 text-muted-foreground">أو التسجيل بواسطة</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 gap-2 rounded-xl hover:shadow-sm transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="flex-1 h-11 gap-2 rounded-xl hover:shadow-sm transition-shadow">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground pt-2">
          لديك حساب بالفعل؟{" "}
          <Link to={`/login?type=${accountType}`} className="text-primary font-medium hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
