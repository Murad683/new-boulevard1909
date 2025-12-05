import { useEffect, useRef, useState } from "react";

const dishes = [
  {
    name: "Qara Çay ilə Marine Edilmiş Quzu",
    description: "Yumuşaq quzu əti, yerli otlar, mevsimlik tərəvəzlər",
    price: "38 ₼",
  },
  {
    name: "Xəzər Nərəsi",
    description: "Təzə nərə, narşərab sousu, balqabaq püresi",
    price: "52 ₼",
  },
  {
    name: "Boulevard Plovü",
    description: "Qazan plovü, qara kürü, sarımsaq aioli",
    price: "42 ₼",
  },
  {
    name: "Şəkərbura Deser",
    description: "Müasir şəkərbura, fındıq dondurması, bal sousu",
    price: "18 ₼",
  },
];

const FeaturedDishes = () => {
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
    <section ref={sectionRef} className="bg-card section-padding">
      <div className="container-narrow">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-body-sm text-primary block mb-6">
            Seçilmiş Dadlar
          </span>
          <h2 className="text-heading-lg text-foreground mb-6">
            Şef Tövsiyəsi
          </h2>
          <div className="gold-separator" />
        </div>

        {/* Dishes Grid */}
        <div className="space-y-0">
          {dishes.map((dish, index) => (
            <div
              key={dish.name}
              className={`py-10 border-b border-primary/20 last:border-b-0 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-heading-sm text-foreground mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {dish.description}
                  </p>
                </div>
                <span className="text-heading-sm text-primary">
                  {dish.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
