import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-lg">Az</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Alazab</h3>
                <p className="text-xs opacity-70">نظام المصادقة المركزي</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              منصة شاملة لإدارة الحسابات والمصادقة عبر جميع منصات العزب مع أحدث التقنيات.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">إدارة الصيانة</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">طلب صيانة سريع</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">معرض الأعمال</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">طلب خدمة</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">دليل المستخدم</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 12 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@alazab.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm opacity-50">
          جميع الحقوق محفوظة © {new Date().getFullYear()} Alazab - نظام المصادقة المركزي
        </div>
      </div>
    </footer>
  );
};

export default Footer;
