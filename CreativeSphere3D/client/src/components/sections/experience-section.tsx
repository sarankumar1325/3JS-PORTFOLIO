
import { motion } from "framer-motion";
import useScrollReveal from "@/hooks/use-scroll-reveal";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  src: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "ML Intern",
    company: "Codsoft Solutions",
    period: "Jun 2024 - Jul 2024",
    description: [
      "Engineered ML pipelines for fraud detection, spam classification, and churn prediction, analyzing 10K+ records and improving accuracy by 15%.",
      "Enhanced feature engineering and preprocessing techniques, reducing model error by 10% using TensorFlow and Scikit-learn."
    ],
    src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "ML Engineer",
    company: "The Fusion Apps",
    period: "Nov 2023 - Jul 2024",
    description: [
      "Trained spam classification models (LSTM and SVM) on 50K+ emails, achieving 98% and 97% accuracies.",
      "Analyzed retail sales data to uncover trends, driving a 25% increase in product turnover and streamlining inventory."
    ],
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "ML Engineer",
    company: "Learn and Build",
    period: "Sep 2023 - Nov 2023",
    description: [
      "Designed a recommender system using NetworkX, increasing prediction accuracy by 15% across 10K+ user interactions.",
      "Leveraged graph-based learning, boosting engagement by 20%."
    ],
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
  }
];

const ExperienceSection = () => {
  const titleReveal = useScrollReveal();
  const contentReveal = useScrollReveal();

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          ref={contentReveal.ref as React.RefObject<HTMLDivElement>}
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={contentReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500/30 via-indigo-500/30 to-transparent"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={contentReveal.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                </div>
                
                <div className="backdrop-blur-lg bg-blue-900/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-500/30">
                        <img
                          src={exp.src}
                          alt={exp.company}
                          className="w-full h-full object-cover object-center opacity-60"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <span className="text-blue-400 text-sm mt-1 md:mt-0">{exp.period}</span>
                      </div>
                      
                      <div className="text-lg text-blue-300 font-medium mb-4">{exp.company}</div>
                      
                      <ul className="space-y-3">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start text-gray-300 text-sm">
                            <span className="text-blue-400 mr-2 mt-1">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
    </section>
  );
};

export default ExperienceSection;
