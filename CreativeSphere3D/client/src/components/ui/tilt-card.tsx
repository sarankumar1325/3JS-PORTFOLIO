import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SpotlightEffect from "./spotlight-effect";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  spotlightSize?: number;
  spotlightIntensity?: number;
  perspective?: number;
}

const TiltCard = ({
  children,
  className,
  tiltAmount = 10,
  spotlightSize = 300,
  spotlightIntensity = 0.1,
  perspective = 1000,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate tilt values
    const tiltX = -(y - 0.5) * tiltAmount;
    const tiltY = (x - 0.5) * tiltAmount;
    
    setPosition({ x: tiltX, y: tiltY });
    setSpotlight({ x: x * 100, y: y * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setSpotlight({ ...spotlight, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative group cursor-pointer overflow-hidden", className)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: position.x,
        rotateY: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.5,
      }}
    >
      <SpotlightEffect
        x={spotlight.x}
        y={spotlight.y}
        opacity={spotlight.opacity}
        size={spotlightSize}
        intensity={spotlightIntensity}
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
