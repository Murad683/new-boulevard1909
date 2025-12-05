import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/atmosphere-1.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-dark-surface/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="gold-separator-wide mb-10" />
          
          <h1 className="text-heading-xl text-secondary-foreground mb-6 max-w-4xl">
            Dadın Əfsanəvi Səyahəti
          </h1>
          
          <p className="text-body-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-12">
            Ənənəvi Azərbaycan mətbəxinin ən seçkin dadlarını müasir zərafətlə kəşf edin
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/reservation" className="btn-primary">
              Rezervasiya et
            </Link>
            <Link to="/menu" className="btn-outline-light">
              Menyunu aç
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
