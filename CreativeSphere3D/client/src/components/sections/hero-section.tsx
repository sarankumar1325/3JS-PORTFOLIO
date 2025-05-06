import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GradientText from "../ui/gradient-text";
import useScrollReveal from "@/hooks/use-scroll-reveal";

// Define ThreeElements interface
type ThreeElements = JSX.IntrinsicElements;

// 3D Card component
const ProfileCard = (props: ThreeElements['mesh']) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;

    // Gentle floating animation
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={1.5}
    >
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshStandardMaterial 
        color="#121212" 
        metalness={0.5}
        roughness={0.2}
        emissive="#450098"
        emissiveIntensity={0.2}
      />

      {/* Profile circle */}
      <mesh position={[0, 0.5, 0.06]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial 
          color="#6710f2" 
          emissive="#6710f2"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Name text position */}
      <mesh position={[0, -0.2, 0.06]}>
        <boxGeometry args={[1, 0.2, 0.01]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.5}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Role text position */}
      <mesh position={[0, -0.5, 0.06]}>
        <boxGeometry args={[0.8, 0.15, 0.01]} />
        <meshStandardMaterial 
          color="#cccccc" 
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Social icons */}
      <mesh position={[0, -0.8, 0.06]}>
        <boxGeometry args={[1, 0.15, 0.01]} />
        <meshStandardMaterial 
          color="#333333" 
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </mesh>
  );
};

// Profile Image component
import profileImage from '../../assets/profile.png';

const ProfileImage = () => {
  return (
    <motion.div
      className="w-[500px] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.img 
        src={profileImage} 
        alt="Profile" 
        className="w-full h-auto" 
        style={{ filter: 'brightness(1.1) contrast(1.1)' }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
};


// Scene setup
const Scene = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 3;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00c6ff" />
      <ProfileCard position={[0, 0, 0]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
      />
    </>
  );
};

// Main component
const HeroSection = () => {
  const titleReveal = useScrollReveal();
  const contentReveal = useScrollReveal();
  const card3dReveal = useScrollReveal();

  const techs = ["PYTHON", "PYTORCH", "TENSORFLOW", "GPT-4", "MACHINE LEARNING", "NLP", "PROMPT ENGINEERING", "RAG", "VECTOR DATABASES", "AWS", "DATA SCIENCE", "LANGCHAIN"];

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="container mx-auto px-4 pt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={contentReveal.ref as React.RefObject<HTMLDivElement>}
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={contentReveal.isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block">
              <span className="text-lg text-accent font-semibold py-1 px-4 border border-accent/30 rounded-full bg-black/20">
                <svg className="inline-block mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Generative AI & ML Engineer
              </span>
            </div>

            <motion.h1 
              ref={titleReveal.ref as React.RefObject<HTMLHeadingElement>}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={titleReveal.isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="block" 
                initial={{ y: 30, opacity: 0 }}
                animate={titleReveal.isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Building
              </motion.span>
              <GradientText className="block text-5xl md:text-7xl mt-2">
                <motion.span
                  initial={{ y: 30, opacity: 0 }}
                  animate={titleReveal.isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Digital Experiences
                </motion.span>
              </GradientText>
              <motion.span 
                className="block text-3xl md:text-5xl mt-2"
                initial={{ y: 30, opacity: 0 }}
                animate={titleReveal.isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                That <span className="relative">Matter
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary"></span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-300 max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={contentReveal.isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ animationName: "blurText" }}
            >
              Passionate about developing and optimizing AI models for real-world applications. Skilled in data preparation, algorithm development, and scalable solution design.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={contentReveal.isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a 
                href="#projects" 
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg bg-black/20 hover:bg-white/10 transition-colors duration-300"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            ref={card3dReveal.ref as React.RefObject<HTMLDivElement>}
            className="relative w-full aspect-square max-w-md mx-auto lg:w-1/2 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={card3dReveal.isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProfileImage />
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Animated marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: [0, "-50%"] }}
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {[...techs, ...techs].map((tech, index) => (
            <span key={index} className="inline-block mx-6 font-mono text-gray-500"># {tech}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;