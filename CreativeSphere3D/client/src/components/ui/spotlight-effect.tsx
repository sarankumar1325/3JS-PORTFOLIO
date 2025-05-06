import { cn } from "@/lib/utils";

interface SpotlightEffectProps {
  x: number;
  y: number;
  opacity: number;
  size?: number;
  intensity?: number;
  className?: string;
}

const SpotlightEffect = ({
  x,
  y,
  opacity,
  size = 300,
  intensity = 0.1,
  className,
}: SpotlightEffectProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        className
      )}
      style={{
        background: `radial-gradient(circle ${size}px at ${x}% ${y}%, rgba(255,255,255,${intensity}) 0%, transparent 80%)`,
        opacity,
      }}
    />
  );
};

export default SpotlightEffect;
