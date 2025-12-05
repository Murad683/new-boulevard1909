import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";

const menuCategories = [
  {
    id: "aperitives",
    name: "Aperitivlər",
    items: [
      { name: "Mevsimlik Sıralar", description: "Müxtəlif yerli peynirlər, zeytun, quru meyvələr", price: "24 ₼" },
      { name: "Qara Kürü Brusketta", description: "Çörək üzərində kürü, xama, göyərti", price: "38 ₼" },
      { name: "Badımcan Rolu", description: "Qoz-fındıq pastası ilə badımcan ruloları", price: "16 ₼" },
      { name: "Lüla Kebab Mini", description: "Kiçik lüla kebab, nar sousu", price: "22 ₼" },
    ],
  },
  {
    id: "salads",
    name: "Salatlar",
    items: [
      { name: "Boulevard Salatı", description: "Mevsimlik yaşıllar, balqabaq toxumu, zeytun yağı", price: "18 ₼" },
      { name: "Manqal Tərəvəz", description: "Közlənmiş tərəvəzlər, sumaq, sarımsaq sousu", price: "20 ₼" },
      { name: "Nar Salatı", description: "Rukola, nar, qoz, keçi pendiri", price: "22 ₼" },
      { name: "Xəzər Salatı", description: "Təzə balıq, avokado, sitrus dressinq", price: "28 ₼" },
    ],
  },
  {
    id: "main",
    name: "Əsas Yeməklər",
    items: [
      { name: "Qara Çay ilə Marine Edilmiş Quzu", description: "Yumuşaq quzu əti, yerli otlar, mevsimlik tərəvəzlər", price: "38 ₼" },
      { name: "Xəzər Nərəsi", description: "Təzə nərə, narşərab sousu, balqabaq püresi", price: "52 ₼" },
      { name: "Boulevard Plovü", description: "Qazan plovü, qara kürü, sarımsaq aioli", price: "42 ₼" },
      { name: "Təndir Toyuq", description: "Yavaş bişmiş toyuq, kişmiş, badam", price: "32 ₼" },
      { name: "Dana Medallion", description: "Premium dana əti, trüffel sousu, kartof püresi", price: "58 ₼" },
      { name: "Lavangi", description: "Ənənəvi lavangi, qoz-şabalıd içi", price: "36 ₼" },
    ],
  },
  {
    id: "desserts",
    name: "Desertlər",
    items: [
      { name: "Şəkərbura Deser", description: "Müasir şəkərbura, fındıq dondurması, bal sousu", price: "18 ₼" },
      { name: "Firni", description: "Klassik süd deserti, darçın, nar", price: "14 ₼" },
      { name: "Paxlava Seleksiya", description: "Üç növ paxlava, pistə, bal", price: "20 ₼" },
      { name: "Şokolad Fondanı", description: "İsti şokolad, vanilli dondurma", price: "16 ₼" },
    ],
  },
  {
    id: "drinks",
    name: "İçkilər",
    items: [
      { name: "Çay Seleksiyası", description: "Qara çay, yaşıl çay, ot çayları", price: "8 ₼" },
      { name: "Türk Qəhvəsi", description: "Ənənəvi hazırlanma, şəkər seçimi", price: "10 ₼" },
      { name: "Kompot", description: "Mevsimlik meyvələrdən", price: "12 ₼" },
      { name: "Şərbət", description: "Ənənəvi Azərbaycan şərbəti", price: "14 ₼" },
      { name: "Limonad", description: "Ev yapımı limonad, nanə, limon", price: "10 ₼" },
    ],
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("aperitives");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-dark-surface pt-32 pb-20">
        <div
          className={`container-narrow text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            subtitle="Menyumuz"
            title="Kulinariya Sənəti"
            description="Ənənəvi dadların müasir interpretasiyası"
            light
          />
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container-wide py-4 overflow-x-auto">
          <ul className="flex items-center justify-center gap-8 min-w-max">
            {menuCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => scrollToCategory(category.id)}
                  className={`text-body-sm transition-colors duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Menu Content */}
      <section ref={sectionRef} className="bg-background section-padding">
        <div className="container-narrow">
          {menuCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              id={category.id}
              className="mb-20 last:mb-0"
            >
              <h3 className="text-heading-md text-foreground mb-10 text-center">
                {category.name}
              </h3>
              <div className="gold-separator mb-10" />
              
              <div className="space-y-0">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className={`py-8 border-b border-primary/20 last:border-b-0 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${(categoryIndex * 100) + (itemIndex * 50)}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-heading-sm text-foreground mb-1">
                          {item.name}
                        </h4>
                        <p className="text-body text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-heading-sm text-primary whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
