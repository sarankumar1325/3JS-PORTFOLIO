import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

const MasonryGrid = ({
  children,
  className,
  columns = { default: 1, sm: 2, lg: 3 },
  gap = "1rem",
}: MasonryGridProps) => {
  // Generate CSS for responsive columns
  const columnStyles = `
    .masonry-grid {
      column-count: ${columns.default};
      column-gap: ${gap};
    }
    
    @media (min-width: 640px) {
      .masonry-grid {
        column-count: ${columns.sm || columns.default};
      }
    }
    
    @media (min-width: 768px) {
      .masonry-grid {
        column-count: ${columns.md || columns.sm || columns.default};
      }
    }
    
    @media (min-width: 1024px) {
      .masonry-grid {
        column-count: ${columns.lg || columns.md || columns.sm || columns.default};
      }
    }
    
    @media (min-width: 1280px) {
      .masonry-grid {
        column-count: ${columns.xl || columns.lg || columns.md || columns.sm || columns.default};
      }
    }
    
    .masonry-item {
      display: inline-block;
      margin-bottom: ${gap};
      width: 100%;
    }
  `;

  return (
    <>
      <style>{columnStyles}</style>
      <div className={cn("masonry-grid", className)}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div key={index} className="masonry-item">
                {child}
              </div>
            ))
          : children}
      </div>
    </>
  );
};

export default MasonryGrid;
