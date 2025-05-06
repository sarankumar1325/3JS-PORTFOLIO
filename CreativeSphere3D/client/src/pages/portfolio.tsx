import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Aurora from "@/components/ui/aurora-effect";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import GallerySection from "@/components/sections/gallery-section";
import ContactSection from "@/components/sections/contact-section";
import useCursor from "@/hooks/use-cursor";

const Portfolio = () => {
  const { x, y, isPointer, isClicking } = useCursor();
  const [cursorVisible, setCursorVisible] = useState(false);

  // Show cursor after initial load to prevent it from appearing in a wrong position
  useEffect(() => {
    const timer = setTimeout(() => {
      setCursorVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans bg-dark text-white overflow-x-hidden relative">
      {/* Black background */}
      <div className="fixed inset-0 z-0 bg-black"></div>

      {/* Aurora effect */}
      <Aurora 
        colorStops={["#0062ff", "#1e40af", "#3b82f6"]} 
        blend={0.6} 
        amplitude={1.2} 
        speed={0.3}
        className="fixed inset-0 w-full h-full z-1"
      />

      {/* Custom cursor */}
      {cursorVisible && (
        <motion.div
          className={`custom-cursor hidden md:block pointer-events-none fixed z-50 border-2 border-primary mix-blend-difference ${
            isPointer ? "scale-150 bg-primary/20" : ""
          } ${isClicking ? "scale-75" : ""}`}
          animate={{
            x,
            y,
            transition: {
              type: "spring",
              mass: 0.1,
              stiffness: 800,
              damping: 30,
            },
          }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
