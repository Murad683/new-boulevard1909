import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

const whatsappNumber = "994101001909";

const Reservation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa bütün sahələri doldurun",
        variant: "destructive",
      });
      return;
    }

    const message = [
      "Boulevard 1909 rezervasiya sorğusu:",
      `Ad: ${formData.name}`,
      `Telefon: ${formData.phone}`,
      `Tarix: ${formData.date}`,
      `Saat: ${formData.time}`,
      `Şəxs sayı: ${formData.guests}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setIsSubmitted(true);
    toast({
      title: "Uğurlu!",
      description: "Rezervasiyanız qəbul edildi",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

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
            subtitle="Rezervasiya"
            title="Masa Ayırın"
            description="Unutulmaz bir axşam üçün yerinizi indi rezerv edin"
            light
          />
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-background section-padding">
        <div className="container-narrow max-w-2xl">
          {isSubmitted ? (
            <div
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-heading-md text-foreground mb-4">
                Rezervasiyanız Qəbul Edildi
              </h3>
              <p className="text-body text-muted-foreground mb-8">
                Tezliklə sizinlə əlaqə saxlanılacaq
              </p>
              <div className="bg-card p-8 rounded-sm">
                <div className="grid grid-cols-2 gap-6 text-left">
                  <div>
                    <span className="text-body-sm text-muted-foreground block mb-1">Ad</span>
                    <span className="text-body text-foreground">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-body-sm text-muted-foreground block mb-1">Telefon</span>
                    <span className="text-body text-foreground">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-body-sm text-muted-foreground block mb-1">Tarix</span>
                    <span className="text-body text-foreground">{formData.date}</span>
                  </div>
                  <div>
                    <span className="text-body-sm text-muted-foreground block mb-1">Saat</span>
                    <span className="text-body text-foreground">{formData.time}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-body-sm text-muted-foreground block mb-1">Şəxs sayı</span>
                    <span className="text-body text-foreground">{formData.guests} nəfər</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", phone: "", date: "", time: "", guests: "" });
                }}
                className="btn-outline mt-10"
              >
                Yeni Rezervasiya
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-8">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-body-sm text-foreground block mb-3">
                    Ad / Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-primary/30 px-6 py-4 text-body text-foreground 
                             focus:border-primary focus:outline-none transition-colors duration-300
                             placeholder:text-muted-foreground"
                    placeholder="Adınızı daxil edin"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="text-body-sm text-foreground block mb-3">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-primary/30 px-6 py-4 text-body text-foreground 
                             focus:border-primary focus:outline-none transition-colors duration-300
                             placeholder:text-muted-foreground"
                    placeholder="+994 XX XXX XX XX"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="date" className="text-body-sm text-foreground block mb-3">
                      Tarix
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-primary/30 px-6 py-4 text-body text-foreground 
                               focus:border-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="text-body-sm text-foreground block mb-3">
                      Saat
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-primary/30 px-6 py-4 text-body text-foreground 
                               focus:border-primary focus:outline-none transition-colors duration-300"
                      placeholder="Saatı daxil edin"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="guests" className="text-body-sm text-foreground block mb-3">
                    Şəxs Sayı
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-primary/30 px-6 py-4 text-body text-foreground 
                             focus:border-primary focus:outline-none transition-colors duration-300
                             appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Nəfər sayı seçin</option>
                    {guestOptions.map((option) => (
                      <option key={option} value={option} className="bg-background text-foreground">
                        {option} {option === "10+" ? "nəfər" : "nəfər"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary w-full mt-4">
                  Rezervasiya Et
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Reservation;
