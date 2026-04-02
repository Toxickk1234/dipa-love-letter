import { Music, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function MusicPlayer({ isAtEnd = false }: { isAtEnd?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a gentle romantic piano royalty-free track placeholder
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/16/audio_b299a9a30b.mp3?filename=romantic-piano-111134.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center">
      <AnimatePresence>
        {isAtEnd && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mr-4 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(194,24,91,0.15)] border border-rose-100 text-rose-600 text-sm font-medium whitespace-nowrap relative"
          >
            Play our song 🎵
            {/* Little triangle pointing right */}
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-[6px] border-transparent border-l-white/90" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Pulsing ring effect when at the end and not playing */}
        <AnimatePresence>
          {isAtEnd && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0], scale: [1, 1.8, 2.2] }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-rose-400 z-0"
            />
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="relative z-10 p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-lg text-rose-600 hover:bg-white/80 hover:shadow-[0_0_20px_rgba(194,24,91,0.25)] hover:text-rose-800 transition-all duration-300"
          aria-label="Toggle background music"
        >
          {isPlaying ? <Music size={20} /> : <Music2 size={20} className="opacity-60" />}
        </motion.button>
      </div>
    </div>
  );
}
