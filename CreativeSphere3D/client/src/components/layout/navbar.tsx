import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import GradientText from "../ui/gradient-text";

const NavItem = ({ 
  href, 
  label, 
  isActive 
}: { 
  href: string; 
  label: string; 
  isActive: boolean;
}) => {
  return (
    <a
      href={href}
      className="relative px-4 py-2 text-white/90 hover:text-white group transition-colors"
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
        initial={{ width: isActive ? "100%" : "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        exit={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </a>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [location] = useLocation();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* Glassmorphism navbar */}
      <div className="absolute inset-0 backdrop-blur-md border-b border-white/10" 
          style={{ 
            background: "linear-gradient(to bottom, rgba(10,20,50,0.4) 0%, rgba(10,20,50,0.3) 100%)",
            boxShadow: "0 4px 20px rgba(0, 10, 50, 0.2)"
          }} />
          
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <GradientText 
                className="text-3xl font-display font-bold tracking-tighter"
                as="span">SK</GradientText>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  href={`#${item.id}`}
                  label={item.label}
                  isActive={activeSection === item.id}
                />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden relative z-20"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        {/* Glassmorphism background for mobile menu */}
        <div className="absolute inset-0 backdrop-blur-md border-b border-white/10" 
            style={{ 
              background: "linear-gradient(to bottom, rgba(10,20,50,0.5) 0%, rgba(10,20,50,0.4) 100%)",
              boxShadow: "0 4px 20px rgba(0, 10, 50, 0.25)"
            }} />
            
        <div className="px-4 pt-2 pb-4 space-y-1 relative z-10">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <a
                href={`#${item.id}`}
                className="block px-4 py-3 my-1 text-white/90 hover:text-white rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
