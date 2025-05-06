import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import useScrollReveal from "@/hooks/use-scroll-reveal";
import { SkillType, SkillCategory as SkillCategoryType } from "@/types";

// Skills data based on Saran Kumar's resume
const skillCategories: SkillCategoryType[] = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: "primary",
    skills: [
      { name: "Generative AI Models", level: 95 },
      { name: "Prompt Engineering", level: 90 },
      { name: "RAG Systems", level: 88 },
    ],
  },
  {
    id: "langs",
    name: "Programming Languages",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    color: "secondary",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "SQL / Java", level: 80 },
    ],
  },
  {
    id: "tools",
    name: "Tools & Frameworks",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    color: "accent",
    skills: [
      { name: "TensorFlow / PyTorch", level: 85 },
      { name: "LLM APIs (OpenAI, Gemini)", level: 90 },
      { name: "React / Web Development", level: 83 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Deployment",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    color: "teal",
    skills: [
      { name: "AWS Services", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 80 },
      { name: "Git / GitHub", level: 90 },
    ],
  },
];

// 3D Skill Sphere
const SkillSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skills = [
    "Python", "GPT-4", "LangChain", "PyTorch", "TensorFlow", "AI",
  ];

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full border border-white/10 shadow-xl overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {skills.map((skill, index) => {
            // Calculate position in a circle
            const angle = (index / skills.length) * Math.PI * 2;
            const radius = index === skills.length - 1 ? 0 : 0.33; // Center "Skills" text
            const top = 50 + Math.sin(angle) * radius * 100;
            const left = 50 + Math.cos(angle) * radius * 100;
            
            const size = index === skills.length - 1 ? "text-base" : "text-sm";
            const bgColor = index === skills.length - 1 
              ? "bg-white/10" 
              : ["bg-primary/30", "bg-secondary/30", "bg-accent/30", "bg-teal/30"][index % 4];
            
            return (
              <motion.div
                key={index}
                className={`absolute ${bgColor} backdrop-blur-md p-2 rounded-lg border border-white/10 ${size} font-mono`}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
    </div>
  );
};

const SkillCategory = ({ category, index }: { category: SkillCategoryType; index: number }) => {
  const controls = useAnimation();
  const categoryReveal = useScrollReveal();
  
  useEffect(() => {
    if (categoryReveal.isVisible) {
      controls.start((i) => ({
        width: `${category.skills[i].level}%`,
        transition: { duration: 1, delay: 0.3 + (i * 0.1) },
      }));
    }
  }, [categoryReveal.isVisible, controls, category.skills]);

  return (
    <motion.div
      ref={categoryReveal.ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={categoryReveal.isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
        <span className={`w-8 h-8 rounded-md bg-${category.color}/20 flex items-center justify-center mr-2`}>
          {category.icon}
        </span>
        {category.name}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill: SkillType, i: number) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-gray-300">{skill.name}</span>
            <div className="w-48 h-2 bg-dark rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r from-primary to-secondary`}
                custom={i}
                animate={controls}
                initial={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const titleReveal = useScrollReveal();
  const textReveal = useScrollReveal();
  const sphereReveal = useScrollReveal();

  return (
    <section id="skills" className="py-20 bg-dark-lighter relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold">EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Skills text */}
          <div className="space-y-6">
            <motion.p
              ref={textReveal.ref as React.RefObject<HTMLParagraphElement>}
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={textReveal.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              With specialized expertise in AI and Machine Learning, I've developed
              innovative solutions using cutting-edge technologies. My comprehensive
              skillset includes:
            </motion.p>

            {/* Skill categories */}
            <div className="space-y-8">
              {skillCategories.map((category, index) => (
                <SkillCategory 
                  key={category.id} 
                  category={category} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {/* Skills visualization */}
          <motion.div
            ref={sphereReveal.ref as React.RefObject<HTMLDivElement>}
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={sphereReveal.isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SkillSphere />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
