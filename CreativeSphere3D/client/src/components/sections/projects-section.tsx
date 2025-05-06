
import { motion } from "framer-motion";
import TiltCard from "../ui/tilt-card";
import { ProjectType } from "@/types";
import useScrollReveal from "@/hooks/use-scroll-reveal";
import { useState } from "react";
import { projects } from "@/data";

const ProjectCard = ({ project, index }: { project: ProjectType; index: number }) => {
  const cardReveal = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={cardReveal.ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50 }}
      animate={cardReveal.isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <TiltCard className="h-full">
        <div className="relative bg-dark-lighter rounded-xl overflow-hidden border border-white/5 h-full flex flex-col">
          <div className={`h-48 bg-gradient-to-br from-${project.color}/30 to-secondary/30 overflow-hidden flex-shrink-0`}>
            <img
              className="w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-300"
              src={project.image}
              alt={project.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&q=80";
              }}
            />
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-xl font-display font-semibold group-hover:text-secondary transition-colors truncate">
                {project.title}
              </h3>
              <span className={`text-xs px-2 py-1 bg-${project.color}/20 text-${project.color} rounded-full whitespace-nowrap flex-shrink-0`}>
                {project.category}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-dark rounded-md border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <a
                href={project.links.live}
                className="text-secondary text-sm hover:underline flex items-center"
              >
                <span>View Details</span>
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>

              <div className="flex space-x-2">
                <a
                  href={project.links.github}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={project.links.live}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Live site"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const titleReveal = useScrollReveal();
  const btnReveal = useScrollReveal();

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold">FEATURED WORK</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          ref={btnReveal.ref as React.RefObject<HTMLDivElement>}
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={btnReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
          >
            <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
