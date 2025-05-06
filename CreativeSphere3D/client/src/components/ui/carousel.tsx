"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";
import "./carousel.css";

interface SlideData {
  title: string;
  button?: string;
  src: string;
  description?: string[];
  company?: string;
  period?: string;
}

const CarouselSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="carousel-slide">
      <img src={data.src} alt={data.title} className="carousel-image" />
      <div className="carousel-content">
        <h3 className="carousel-title">{data.title}</h3>
        {data.company && <div className="carousel-company">{data.company}</div>}
        {data.period && <div className="carousel-period">{data.period}</div>}
        {data.description && (
          <div className="carousel-description">
            {data.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, description, company, period } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[60vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.92) rotateX(6deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1.5%] overflow-hidden transition-all duration-150 ease-out shadow-2xl"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-0 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 0.7 : 0.3,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/80 to-blue-900/40 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold relative text-white">
                {title}
              </h2>
              {period && (
                <span className="text-sm text-blue-300 font-medium mt-1 sm:mt-0">{period}</span>
              )}
            </div>
            
            {company && (
              <div className="text-md sm:text-lg text-blue-400 font-semibold mb-3">{company}</div>
            )}
            
            {description && description.length > 0 && (
              <ul className="space-y-3 mt-4">
                {description.map((item, idx) => (
                  <li key={idx} className="text-gray-100 flex items-start text-xs sm:text-sm md:text-base">
                    <span className="text-blue-400 mr-2 mt-1 flex-shrink-0 text-lg">•</span>
                    <p className="text-left leading-snug">{item}</p>
                  </li>
                ))}
              </ul>
            )}
            
            {button && (
              <div className="flex justify-start mt-6">
                <button className="px-4 py-2 w-fit text-black bg-white h-10 border border-transparent text-xs flex justify-center items-center rounded-xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  {button}
                </button>
              </div>
            )}
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:border-blue-500 focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200`}
      title={title}
      onClick={handleClick}
    >
      {type === "previous" ? (
        <ChevronLeft className="text-white w-5 h-5" />
      ) : (
        <ChevronRight className="text-white w-5 h-5" />
      )}
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  className?: string;
}

export function Carousel({ slides, className = "" }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto ${className}`}
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(calc(-${current * (100 / slides.length)}% + ${current === 0 ? 0 : '15vmin'}))`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full bottom-4">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
      
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              current === index ? "bg-blue-500" : "bg-white/30"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;