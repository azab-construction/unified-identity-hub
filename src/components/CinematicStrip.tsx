import logoAlazab from "@/assets/logo-alazab.png";
import logoUberfix from "@/assets/logo-uberfix.png";
import logoLuxury from "@/assets/logo-luxury.png";
import logoBrand from "@/assets/logo-brand.png";
import logoLaban from "@/assets/logo-laban.png";

const brands = [
  { name: "Alazab", logo: logoAlazab, url: "https://alazab.com" },
  { name: "UberFix", logo: logoUberfix, url: "https://uberfix.alazab.com" },
  { name: "Luxury Finishing", logo: logoLuxury, url: "https://luxury-finishing.alazab.com" },
  { name: "Brand Identity", logo: logoBrand, url: "https://brand-identity.alazab.com" },
  { name: "Laban Alasfour", logo: logoLaban, url: "https://laban-alasfour.alazab.com" },
];

const CinematicStrip = () => {
  // Duplicate for seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <section id="platforms" className="py-16 overflow-hidden">
      <div className="container text-center mb-10">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
          منصاتنا
        </h2>
        <p className="text-muted-foreground">حساب واحد للوصول إلى جميع خدماتنا</p>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-strip w-max hover:[animation-play-state:paused]">
          {doubled.map((brand, i) => (
            <a
              key={`${brand.name}-${i}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 group"
            >
              <div className="w-52 bg-card rounded-xl shadow-card border border-border/50 p-6 flex flex-col items-center gap-3 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-primary/30">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicStrip;
