import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/boulevard-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-dark-surface text-secondary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <img
              src={logo}
              alt="Boulevard 1909"
              className="h-16 w-auto object-contain mx-auto md:mx-0 mb-6"
            />
            <p className="text-body text-muted-foreground max-w-xs mx-auto md:mx-0">
              Ənənəvi Azərbaycan mətbəxini müasir təqdimatla birləşdirən premium restoran.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h4 className="text-body-sm text-primary mb-8">Naviqasiya</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-body hover:text-primary transition-colors duration-300">
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-body hover:text-primary transition-colors duration-300">
                  Menyu
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-body hover:text-primary transition-colors duration-300">
                  Rezervasiya
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-body hover:text-primary transition-colors duration-300">
                  Qalereya
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-body hover:text-primary transition-colors duration-300">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-body-sm text-primary mb-8">Əlaqə</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-end gap-3">
                <MapPin size={16} className="text-primary" />
                <span className="text-body">15 Ahad Yaqubov, Bakı</span>
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3">
                <Phone size={16} className="text-primary" />
                <a
                  href="tel:+994101001909"
                  className="text-body hover:text-primary transition-colors duration-300"
                >
                  (+994) 10 100 1909
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3">
                <Instagram size={16} className="text-primary" />
                <a
                  href="https://www.instagram.com/boulevard1909/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body hover:text-primary transition-colors duration-300"
                >
                  @boulevard1909
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-primary/20 text-center">
          <p className="text-body-sm text-muted-foreground">
            © {new Date().getFullYear()} Boulevard 1909. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
