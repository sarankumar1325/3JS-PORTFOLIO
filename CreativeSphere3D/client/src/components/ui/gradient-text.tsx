import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GradientText = ({
  children,
  className,
  as: Component = "span",
}: GradientTextProps) => {
  return (
    <Component
      className={cn(
        "bg-gradient-to-r from-secondary via-primary to-accent to-[50%] text-transparent bg-clip-text bg-[length:300%_300%] animate-gradient",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default GradientText;
