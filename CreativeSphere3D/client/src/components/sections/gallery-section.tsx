import { motion } from "framer-motion";
import MasonryGrid from "../ui/masonry-grid";
import useScrollReveal from "@/hooks/use-scroll-reveal";
import { GalleryItemType } from "@/types";

// Sample gallery data
const galleryItems: GalleryItemType[] = [
  {
    id: 1,
    title: "Dashboard Design",
    category: "UI/UX Project",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&q=80",
  },
  {
    id: 2,
    title: "Mobile App",
    category: "React Native Project",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&q=80",
  },
  {
    id: 3,
    title: "3D Game Assets",
    category: "Three.js Project",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&q=80",
  },
  {
    id: 4,
    title: "AR Experience",
    category: "WebXR Project",
    image: "https://images.unsplash.com/photo-1536148935331-408321065b18?auto=format&q=80",
  },
  {
    id: 5,
    title: "Team Dashboard",
    category: "Full-Stack Project",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&q=80",
  },
];

const GalleryItem = ({ item, index }: { item: GalleryItemType; index: number }) => {
  const itemReveal = useScrollReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={itemReveal.ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 50 }}
      animate={itemReveal.isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group overflow-hidden rounded-xl"
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-auto object-cover transition-transform duration-500"
        whileHover={{ scale: 1.1 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 w-full">
          <h3 className="text-white font-display font-semibold">{item.title}</h3>
          <p className="text-gray-300 text-sm">{item.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GallerySection = () => {
  const titleReveal = useScrollReveal();
  const gridReveal = useScrollReveal();

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold">SHOWCASE</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
            Project Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </motion.div>

        {/* Masonry gallery */}
        <motion.div
          ref={gridReveal.ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 30 }}
          animate={gridReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <MasonryGrid
            columns={{ default: 1, sm: 2, lg: 3 }}
            gap="1rem"
          >
            {galleryItems.map((item, index) => (
              <GalleryItem key={item.id} item={item} index={index} />
            ))}
          </MasonryGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
