import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface NextButtonProps {
  onClick: () => void;
  text: string;
  show?: boolean;
}

export function NextButton({ onClick, text, show = true }: NextButtonProps) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.5 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-3 mt-16 mx-auto"
    >
      <div className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-[0_8px_32px_rgba(194,24,91,0.1)] text-rose-700 font-medium tracking-wide flex items-center gap-2 overflow-hidden transition-all duration-300 group-hover:bg-white/80 group-hover:shadow-[0_8px_32px_rgba(194,24,91,0.25)] group-hover:text-rose-900 group-hover:border-rose-200">
        <span className="relative z-10">{text}</span>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blush/0 via-blush/30 to-blush/0 z-0"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="text-rose-400/70" size={24} />
      </motion.div>
    </motion.button>
  );
}
