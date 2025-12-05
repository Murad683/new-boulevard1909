import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-surface section-padding relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container-narrow relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-body-sm text-primary block mb-6">
            Rezervasiya
          </span>
          <h2 className="text-heading-lg text-secondary-foreground mb-6 max-w-3xl mx-auto">
            Bu Axşam Üçün Masa Ayırın
          </h2>
          <p className="text-body-lg text-secondary-foreground/70 mb-12 max-w-xl mx-auto">
            Unutulmaz bir axşam üçün yerinizi indi rezerv edin
          </p>
          <Link to="/reservation" className="btn-primary-glow">
            Rezervasiya Et
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
