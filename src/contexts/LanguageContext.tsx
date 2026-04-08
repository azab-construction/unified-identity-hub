import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.platforms": "المنصات",
    "nav.features": "المزايا",
    "nav.contact": "تواصل معنا",
    "nav.login": "تسجيل الدخول",
    "nav.signup": "إنشاء حساب",
    "nav.lang": "English",
    "nav.subtitle": "نظام المصادقة المركزي",

    // Hero
    "hero.badge": "نظام مصادقة مركزي آمن",
    "hero.title1": "حساب واحد",
    "hero.title2": "لجميع منصات",
    "hero.subtitle": "اختر نوع حسابك وابدأ رحلتك مع أكثر من 5 منصات متخصصة في خدمات الصيانة والتشطيب",
    "hero.cta": "ابدأ الآن مجاناً",
    "hero.stat1.value": "5+",
    "hero.stat1.label": "منصة متصلة",
    "hero.stat2.value": "24/7",
    "hero.stat2.label": "دعم متواصل",
    "hero.stat3.value": "100%",
    "hero.stat3.label": "حماية مشفرة",

    // Account Types
    "accounts.title": "اختر نوع حسابك",
    "accounts.subtitle": "حدد الدور المناسب لك للحصول على أفضل تجربة",
    "accounts.company": "شركة",
    "accounts.company.desc": "للشركات التي تدير عمليات الصيانة",
    "accounts.company.f1": "إدارة الموظفين والفنيين",
    "accounts.company.f2": "التقارير والتحليلات",
    "accounts.company.f3": "إدارة العقود",
    "accounts.company.btn": "التسجيل كشركة",
    "accounts.technician": "فني",
    "accounts.technician.desc": "للفنيين الذين يقدمون خدمات الصيانة",
    "accounts.technician.f1": "استقبال طلبات العمل",
    "accounts.technician.f2": "إدارة المواعيد",
    "accounts.technician.f3": "تتبع الأرباح",
    "accounts.technician.btn": "التسجيل كفني",
    "accounts.client": "عميل",
    "accounts.client.desc": "للعملاء الذين يريدون طلب خدمات الصيانة",
    "accounts.client.f1": "طلب خدمات الصيانة",
    "accounts.client.f2": "تتبع حالة الطلبات",
    "accounts.client.f3": "تقييم الخدمات",
    "accounts.client.btn": "التسجيل كعميل",

    // Cinematic Strip
    "platforms.badge": "حساب واحد • وصول متعدد",
    "platforms.title": "منصاتنا المتكاملة",
    "platforms.subtitle": "سجّل مرة واحدة واستمتع بالوصول الفوري لجميع خدماتنا",

    // Features
    "features.badge": "لماذا تختارنا؟",
    "features.title": "مزايا النظام",
    "features.subtitle": "تقنيات حديثة تضمن لك أفضل تجربة مصادقة",
    "features.security": "أمان متقدم",
    "features.security.desc": "تشفير من الدرجة العسكرية لحماية بياناتك",
    "features.speed": "سرعة فائقة",
    "features.speed.desc": "استجابة فورية وأداء عالٍ على جميع المنصات",
    "features.ux": "تجربة سلسة",
    "features.ux.desc": "واجهة بديهية مصممة للمستخدم العربي",
    "features.integration": "تكامل شامل",
    "features.integration.desc": "ربط جميع الخدمات والمنصات في مكان واحد",
    "features.auth": "مصادقة ذكية",
    "features.auth.desc": "دخول سريع عبر البصمة والتحقق المزدوج",
    "features.cloud": "إدارة سحابية",
    "features.cloud.desc": "بياناتك محفوظة بأمان في السحابة",

    // Footer
    "footer.desc": "منصة شاملة لإدارة الحسابات والمصادقة عبر جميع منصات العزب مع أحدث تقنيات الحماية والأمان.",
    "footer.services": "خدماتنا",
    "footer.services.1": "إدارة الصيانة",
    "footer.services.2": "طلب صيانة سريع",
    "footer.services.3": "معرض الأعمال",
    "footer.services.4": "طلب خدمة",
    "footer.support": "الدعم",
    "footer.support.1": "الأسئلة الشائعة",
    "footer.support.2": "دليل المستخدم",
    "footer.support.3": "الشروط والأحكام",
    "footer.support.4": "تواصل معنا",
    "footer.contact": "تواصل معنا",
    "footer.location": "الرياض، المملكة العربية السعودية",
    "footer.rights": "جميع الحقوق محفوظة",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.login.subtitle": "اختر نوع حسابك وسجّل دخولك",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.forgot": "نسيت كلمة المرور؟",
    "auth.or": "أو",
    "auth.no_account": "ليس لديك حساب؟",
    "auth.create_account": "إنشاء حساب جديد",
    "auth.has_account": "لديك حساب بالفعل؟",
    "auth.signup": "إنشاء حساب جديد",
    "auth.signup.btn": "إنشاء الحساب",
    "auth.or_signup": "أو التسجيل بواسطة",
    "auth.firstName": "الاسم الأول",
    "auth.lastName": "اسم العائلة",
    "auth.phone": "رقم الهاتف",
    "auth.terms": "أوافق على",
    "auth.terms_link": "الشروط والأحكام",
    "auth.privacy_link": "سياسة الخصوصية",
    "auth.and": "و",
    "auth.encrypted": "حماية مشفرة بالكامل",
    "auth.back": "العودة للرئيسية",
    "auth.company.title": "بوابة الشركات",
    "auth.company.subtitle": "إدارة شاملة لعمليات الصيانة والموظفين والتقارير",
    "auth.technician.title": "بوابة الفنيين",
    "auth.technician.subtitle": "استقبال الطلبات وإدارة المواعيد وتتبع الأرباح",
    "auth.client.title": "بوابة العملاء",
    "auth.client.subtitle": "اطلب خدمات الصيانة وتتبع طلباتك بسهولة",
    "auth.signup.company.title": "تسجيل شركة جديدة",
    "auth.signup.company.subtitle": "أنشئ حساب شركتك وابدأ بإدارة عمليات الصيانة",
    "auth.signup.technician.title": "تسجيل فني جديد",
    "auth.signup.technician.subtitle": "انضم كفني وابدأ باستقبال طلبات العمل",
    "auth.signup.client.title": "تسجيل عميل جديد",
    "auth.signup.client.subtitle": "أنشئ حسابك واطلب خدمات الصيانة بسهولة",
    "auth.companyName": "اسم الشركة",
    "auth.commercialReg": "السجل التجاري",
    "auth.specialty": "التخصص",
    "auth.experience": "سنوات الخبرة",
    "strength.weak": "ضعيفة",
    "strength.medium": "متوسطة",
    "strength.good": "جيدة",
    "strength.strong": "قوية",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.platforms": "Platforms",
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.lang": "العربية",
    "nav.subtitle": "Central Auth System",

    // Hero
    "hero.badge": "Secure Central Authentication",
    "hero.title1": "One Account",
    "hero.title2": "for All Platforms",
    "hero.subtitle": "Choose your account type and start your journey with 5+ specialized maintenance and finishing platforms",
    "hero.cta": "Get Started Free",
    "hero.stat1.value": "5+",
    "hero.stat1.label": "Connected Platforms",
    "hero.stat2.value": "24/7",
    "hero.stat2.label": "Continuous Support",
    "hero.stat3.value": "100%",
    "hero.stat3.label": "Encrypted Security",

    // Account Types
    "accounts.title": "Choose Your Account Type",
    "accounts.subtitle": "Select the role that suits you for the best experience",
    "accounts.company": "Company",
    "accounts.company.desc": "For companies managing maintenance operations",
    "accounts.company.f1": "Employee & technician management",
    "accounts.company.f2": "Reports & analytics",
    "accounts.company.f3": "Contract management",
    "accounts.company.btn": "Register as Company",
    "accounts.technician": "Technician",
    "accounts.technician.desc": "For technicians providing maintenance services",
    "accounts.technician.f1": "Receive work requests",
    "accounts.technician.f2": "Manage appointments",
    "accounts.technician.f3": "Track earnings",
    "accounts.technician.btn": "Register as Technician",
    "accounts.client": "Client",
    "accounts.client.desc": "For clients requesting maintenance services",
    "accounts.client.f1": "Request maintenance services",
    "accounts.client.f2": "Track order status",
    "accounts.client.f3": "Rate services",
    "accounts.client.btn": "Register as Client",

    // Cinematic Strip
    "platforms.badge": "One Account • Multiple Access",
    "platforms.title": "Our Integrated Platforms",
    "platforms.subtitle": "Register once and enjoy instant access to all our services",

    // Features
    "features.badge": "Why Choose Us?",
    "features.title": "System Features",
    "features.subtitle": "Modern technologies ensuring the best authentication experience",
    "features.security": "Advanced Security",
    "features.security.desc": "Military-grade encryption to protect your data",
    "features.speed": "Ultra Fast",
    "features.speed.desc": "Instant response and high performance across all platforms",
    "features.ux": "Smooth Experience",
    "features.ux.desc": "Intuitive interface designed for ease of use",
    "features.integration": "Full Integration",
    "features.integration.desc": "Connect all services and platforms in one place",
    "features.auth": "Smart Auth",
    "features.auth.desc": "Quick login via fingerprint and two-factor verification",
    "features.cloud": "Cloud Management",
    "features.cloud.desc": "Your data is securely stored in the cloud",

    // Footer
    "footer.desc": "A comprehensive platform for managing accounts and authentication across all Alazab platforms with the latest security technologies.",
    "footer.services": "Our Services",
    "footer.services.1": "Maintenance Management",
    "footer.services.2": "Quick Maintenance Request",
    "footer.services.3": "Portfolio",
    "footer.services.4": "Request a Service",
    "footer.support": "Support",
    "footer.support.1": "FAQ",
    "footer.support.2": "User Guide",
    "footer.support.3": "Terms & Conditions",
    "footer.support.4": "Contact Us",
    "footer.contact": "Contact Us",
    "footer.location": "Riyadh, Saudi Arabia",
    "footer.rights": "All Rights Reserved",

    // Auth
    "auth.login": "Login",
    "auth.login.subtitle": "Choose your account type and log in",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgot": "Forgot password?",
    "auth.or": "or",
    "auth.no_account": "Don't have an account?",
    "auth.create_account": "Create new account",
    "auth.has_account": "Already have an account?",
    "auth.signup": "Create New Account",
    "auth.signup.btn": "Create Account",
    "auth.or_signup": "Or sign up with",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.phone": "Phone Number",
    "auth.terms": "I agree to the",
    "auth.terms_link": "Terms & Conditions",
    "auth.privacy_link": "Privacy Policy",
    "auth.and": "and",
    "auth.encrypted": "Fully Encrypted Protection",
    "auth.back": "Back to Home",
    "auth.company.title": "Company Portal",
    "auth.company.subtitle": "Comprehensive management for maintenance, employees, and reports",
    "auth.technician.title": "Technician Portal",
    "auth.technician.subtitle": "Receive requests, manage appointments, and track earnings",
    "auth.client.title": "Client Portal",
    "auth.client.subtitle": "Request maintenance services and track your orders easily",
    "auth.signup.company.title": "Register New Company",
    "auth.signup.company.subtitle": "Create your company account and start managing maintenance",
    "auth.signup.technician.title": "Register New Technician",
    "auth.signup.technician.subtitle": "Join as a technician and start receiving work requests",
    "auth.signup.client.title": "Register New Client",
    "auth.signup.client.subtitle": "Create your account and request maintenance services easily",
    "auth.companyName": "Company Name",
    "auth.commercialReg": "Commercial Registration",
    "auth.specialty": "Specialty",
    "auth.experience": "Years of Experience",
    "strength.weak": "Weak",
    "strength.medium": "Medium",
    "strength.good": "Good",
    "strength.strong": "Strong",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  dir: "rtl",
  toggleLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "ar";
    }
    return "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  const t = (key: string) => translations[lang]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
