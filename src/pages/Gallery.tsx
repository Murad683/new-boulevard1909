import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = {
  type: "video";
  src: string;
  alt: string;
};

const galleryItems: MediaItem[] = [
  { type: "video", src: "/videos/atmosphere-1.mp4", alt: "Atmosfer videosu 1" },
  { type: "video", src: "/videos/atmosphere-2.mp4", alt: "Atmosfer videosu 2" },
  { type: "video", src: "/videos/atmosphere-3.mp4", alt: "Atmosfer videosu 3" },
  { type: "video", src: "/videos/atmosphere-5.mp4", alt: "Atmosfer videosu 5" },
  { type: "video", src: "/videos/atmosphere-6.mp4", alt: "Atmosfer videosu 6" },
];

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: number) => {
    const newIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    setCurrentIndex(newIndex);
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
            subtitle="Qalereya"
            title="Vizual Səyahət"
            description="Restoranımızın atmosferini kəşf edin"
            light
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-background section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={`relative aspect-[4/3] overflow-hidden cursor-pointer group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                <div className="absolute inset-0 bg-dark-surface/0 group-hover:bg-dark-surface/30 transition-all duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-dark-surface/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-secondary-foreground hover:text-primary transition-colors duration-300 z-10"
            aria-label="Bağla"
          >
            <X size={32} />
          </button>

          <button
            onClick={() => navigateLightbox(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary-foreground hover:text-primary transition-colors duration-300"
            aria-label="Əvvəlki"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={() => navigateLightbox(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary-foreground hover:text-primary transition-colors duration-300"
            aria-label="Növbəti"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-5xl max-h-[80vh] w-full mx-6">
            <video
              src={galleryItems[currentIndex].src}
              controls
              autoPlay
              className="w-full h-full object-contain animate-fade-in"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-secondary-foreground/50"
                }`}
                aria-label={`Şəkil ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
