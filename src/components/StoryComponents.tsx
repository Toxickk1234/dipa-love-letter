import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface StorySectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function StorySection({ id, children, className = '' }: StorySectionProps) {
  return (
    <section 
      id={id} 
      className={`min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 relative z-10 ${className}`}
    >
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
        {children}
      </div>
    </section>
  );
}

export function MessageBlock({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform' }}
      className="text-center my-8"
    >
      <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-light">
        {children}
      </p>
    </motion.div>
  );
}

export function ImageGallery({ images }: { images: { src: string; alt: string; className?: string }[] }) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 my-12">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
          style={{ willChange: 'opacity, transform' }}
          className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-900/10 border-4 border-white/50 ${img.className || 'w-64 h-80'}`}
        >
          <img 
            src={img.src} 
            alt={img.alt} 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent mix-blend-overlay" />
        </motion.div>
      ))}
    </div>
  );
}
