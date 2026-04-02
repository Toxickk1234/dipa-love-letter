import { motion } from 'motion/react';
import { useState } from 'react';

interface FlipCardProps {
  frontText: string;
  backText: string;
  delay?: number;
}

export function FlipCard({ frontText, backText, delay = 0 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative w-full aspect-square cursor-pointer perspective-1000 group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white/60 backdrop-blur-md border border-rose-100 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgba(194,24,91,0.08)] flex flex-col items-center justify-center p-2 md:p-4 group-hover:bg-white/80 transition-colors">
          <span className="font-serif text-4xl md:text-5xl text-rose-300 mb-1 md:mb-2">{frontText}</span>
          <span className="text-[10px] md:text-xs text-rose-400/60 uppercase tracking-widest mt-1 md:mt-2 text-center">Tap to reveal</span>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-400 to-rose-500 border border-rose-300 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgba(194,24,91,0.2)] flex items-center justify-center p-3 sm:p-4 md:p-6 text-center rotate-y-180 overflow-hidden">
          <span className="text-white font-medium text-sm sm:text-base md:text-lg leading-snug md:leading-relaxed font-serif italic w-full break-words">
            {backText}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
