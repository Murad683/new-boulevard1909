import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative hover-zoom">
              <video
                src="/videos/atmosphere-4.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 border border-primary/30 -translate-x-4 -translate-y-4 pointer-events-none" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <span className="text-body-sm text-primary block mb-6">
              Haqqımızda
            </span>
            <h2 className="text-heading-lg text-foreground mb-8">
              Ənənə və Müasirliyin Harmoniyası
            </h2>
            <div className="gold-separator mb-8 mx-0" />
            <p className="text-body text-muted-foreground mb-6">
              Boulevard 1909, Bakının mərkəzində, tarixi bulvarın yanında yerləşən premium restoran olaraq, Azərbaycan mətbəxinin zəngin irsini müasir kulinariya sənəti ilə birləşdirir.
            </p>
            <p className="text-body text-muted-foreground mb-10">
              Hər bir yeməyimiz, ən təzə yerli məhsullardan hazırlanaraq, ənənəvi reseptlərin müasir interpretasiyasını təqdim edir. Zərafətli atmosferimiz və qonaqpərvər xidmətimiz ilə unutulmaz bir qastronomik təcrübə yaşayacaqsınız.
            </p>
            <div className="flex items-center gap-12">
              <div>
                <span className="text-heading-md text-primary block">2019</span>
                <span className="text-body-sm text-muted-foreground">-dən bəri</span>
              </div>
              <div className="w-px h-12 bg-primary/30" />
              <div>
                <span className="text-heading-md text-primary block">100+</span>
                <span className="text-body-sm text-muted-foreground">Unikal yemək</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
