import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full overflow-hidden z-0 opacity-60",
        className
      )}
    >
      {/* Hyperspace effect with blue aurora */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Aurora streams */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 h-0.5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            opacity: Math.random() * 0.5 + 0.25,
            zIndex: -1,
            backgroundColor: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#2563EB' : '#1E40AF',
          }}
          animate={{
            scaleX: [1, 15, 1],
            x: [0, i % 2 ? 2000 : -2000, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Core large blue aurora blobs */}
      <motion.div
        className="absolute h-[80vh] w-[40vw] bg-gradient-to-br from-blue-600/40 to-blue-900/40 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ left: "10%", top: "20%" }}
      />
      
      <motion.div
        className="absolute h-[70vh] w-[35vw] bg-gradient-to-tr from-indigo-700/30 to-blue-500/30 rounded-full"
        animate={{
          scale: [1, 0.9, 1],
          x: [0, -70, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ right: "15%", bottom: "10%" }}
      />
      
      <motion.div
        className="absolute h-[60vh] w-[30vw] bg-gradient-to-bl from-cyan-500/20 to-blue-600/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ right: "30%", top: "30%" }}
      />
    </div>
  );
};

export default AuroraBackground;
