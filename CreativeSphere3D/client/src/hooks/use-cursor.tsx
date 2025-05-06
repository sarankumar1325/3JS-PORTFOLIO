import { useEffect, useState } from "react";

type CursorStyles = {
  x: number;
  y: number;
  isPointer: boolean;
  isClicking: boolean;
};

export function useCursor() {
  const [cursor, setCursor] = useState<CursorStyles>({
    x: 0,
    y: 0,
    isPointer: false,
    isClicking: false,
  });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    const updatePointerStatus = () => {
      const hoveredElement = document.elementFromPoint(cursor.x, cursor.y);
      const pointerElements = [
        "BUTTON",
        "A",
        "INPUT",
        "TEXTAREA",
        "SELECT",
        "LABEL",
      ];
      
      // Check if we're over a pointer element or an element with a click handler
      const isOverPointer =
        hoveredElement &&
        (pointerElements.includes(hoveredElement.tagName) ||
          hoveredElement.closest("[role='button']") ||
          hoveredElement.classList.contains("cursor-pointer") ||
          window.getComputedStyle(hoveredElement).cursor === "pointer");

      setCursor((prev) => ({
        ...prev,
        isPointer: isOverPointer,
      }));
    };

    const handleMouseDown = () => {
      setCursor((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursor((prev) => ({ ...prev, isClicking: false }));
    };

    // Add event listeners
    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", updatePointerStatus);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Set interval to continuously check for pointer changes
    const pointerInterval = setInterval(updatePointerStatus, 100);

    // Clean up
    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", updatePointerStatus);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(pointerInterval);
    };
  }, [cursor.x, cursor.y]);

  return cursor;
}

export default useCursor;
