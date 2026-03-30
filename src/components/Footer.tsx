import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="relative bg-foreground text-primary-foreground pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <span className="font-heading font-bold text-primary-foreground text-lg">Az</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Alazab</h3>
                <p className="text-xs opacity-60">نظام المصادقة المركزي</p>
              </div>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              منصة شاملة لإدارة الحسابات والمصادقة عبر جميع منصات العزب مع أحدث تقنيات الحماية والأمان.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold mb-5">خدماتنا</h4>
            <ul className="space-y-3 text-sm opacity-60">
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">إدارة الصيانة</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">طلب صيانة سريع</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">معرض الأعمال</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">طلب خدمة</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold mb-5">الدعم</h4>
            <ul className="space-y-3 text-sm opacity-60">
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">دليل المستخدم</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity hover:text-primary">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-5">تواصل معنا</h4>
            <div className="space-y-4 text-sm opacity-60">
              <a href="tel:+966123456789" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span dir="ltr">+966 12 345 6789</span>
              </a>
              <a href="mailto:info@alazab.com" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@alazab.com</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex items-center justify-between">
          <p className="text-sm opacity-40">
            جميع الحقوق محفوظة © {new Date().getFullYear()} Alazab
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
