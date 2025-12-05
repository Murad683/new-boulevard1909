import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/boulevard-logo.jpg";

const navLinks = [
  { path: "/", label: "Ana Səhifə" },
  { path: "/menu", label: "Menyu" },
  { path: "/reservation", label: "Rezervasiya" },
  { path: "/gallery", label: "Qalereya" },
  { path: "/contact", label: "Əlaqə" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const lockScroll = () => {
      scrollPositionRef.current = window.scrollY;
      root.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      root.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollPositionRef.current);
    };

    if (isMobileMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-surface/95 backdrop-blur-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-wide flex items-center justify-between">
        <Link to="/" className="relative z-10">
          <img
            src={logo}
            alt="Boulevard 1909"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-body-sm transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-secondary-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-secondary-foreground p-2 relative z-50"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-dark-surface z-40 lg:hidden transition-all duration-500 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <li
                  key={link.path}
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    to={link.path}
                    className={`text-heading-sm transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-secondary-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
