import GradientText from "../ui/gradient-text";

const Footer = () => {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="py-8 border-t border-white/5 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="flex items-center space-x-2 text-secondary">
              <GradientText className="text-2xl font-display font-bold">L</GradientText>
              <span className="font-display font-semibold">Lovable Portfolio</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
