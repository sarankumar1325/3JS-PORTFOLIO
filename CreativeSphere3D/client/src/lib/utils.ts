import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to create a debounced version of a function
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Function to animate counting up to a target number
export function animateCountUp(
  el: HTMLElement,
  target: number,
  duration: number = 2000
) {
  let startTimestamp: number | null = null;
  const start = parseInt(el.innerText, 10) || 0;
  
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentCount = Math.floor(progress * (target - start) + start);
    el.innerText = currentCount.toString();
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.innerText = target.toString();
    }
  };
  
  window.requestAnimationFrame(step);
}

// Wait for a certain amount of time, useful for animations
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get random number between min and max
export const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
    (window.innerWidth <= 768);
};

// Generate a random ID for elements
export const generateId = (prefix: string = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
