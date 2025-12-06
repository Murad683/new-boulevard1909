import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Ünvan",
    content: "15 Ahad Yaqubov, Bakı, Azərbaycan AZ1003",
    link: "https://maps.google.com/?q=15+Ahad+Yaqubov,+Baku,+Azerbaijan",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "(+994) 10 100 1909",
    link: "tel:+994101001909",
  },
  {
    icon: Clock,
    title: "İş Saatları",
    content: "Hər gün: 12:00 - 23:00",
    link: null,
  },
  {
    icon: Instagram,
    title: "Instagram",
    content: "@boulevard1909",
    link: "https://www.instagram.com/boulevard1909/",
  },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const contentTimer = setTimeout(() => setContentVisible(true), 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

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
            subtitle="Əlaqə"
            title="Bizimlə Əlaqə"
            description="Suallarınız üçün bizimlə əlaqə saxlayın"
            light
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-background section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div
              className={`transition-all duration-1000 ${
                contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h3 className="text-heading-md text-foreground mb-10">
                Əlaqə Məlumatları
              </h3>
              <div className="gold-separator mb-10 mx-0" />
              
              <div className="space-y-10">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex items-start gap-6 transition-all duration-700 ${
                      contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-body-sm text-primary mb-2">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-body text-foreground hover:text-primary transition-colors duration-300"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-body text-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div
                className={`mt-16 p-8 bg-card transition-all duration-1000 delay-500 ${
                  contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h4 className="text-heading-sm text-foreground mb-4">
                  Xüsusi Tədbirlər
                </h4>
                <p className="text-body text-muted-foreground">
                  Korporativ tədbirlər, ad günləri və ya xüsusi münasibətlər üçün ayrıca otaqlarımız mövcuddur. 
                  Ətraflı məlumat üçün bizimlə əlaqə saxlayın.
                </p>
              </div>
            </div>

            {/* Map */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h3 className="text-heading-md text-foreground mb-10">
                Yerləşmə
              </h3>
              <div className="gold-separator mb-10 mx-0" />
              
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2752.1546330465535!2d49.830985683015015!3d40.337246486881384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307f00779bad09%3A0x8c410e1ffe7372fd!2sRestaurant%20Boulevard!5e1!3m2!1saz!2saz!4v1765011362160!5m2!1saz!2saz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Boulevard 1909 Xəritə"
                  className="w-full h-full grayscale"
                />
                <div className="absolute inset-0 pointer-events-none border border-primary/20" />
              </div>

              <p className="text-body text-muted-foreground mt-6 text-center">
                Su idman sarayının yaxınlığı, Yeni Bulvar
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
