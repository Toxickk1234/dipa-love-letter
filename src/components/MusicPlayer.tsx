import { Music, Music2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function MusicPlayer({ isAtEnd = false }: { isAtEnd?: boolean }) {
  const [showVideo, setShowVideo] = useState(false);

  const togglePlay = () => {
    setShowVideo(true);
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-50 flex items-center">
        <AnimatePresence>
          {isAtEnd && !showVideo && (
            <motion.div
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mr-4 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(194,24,91,0.15)] border border-rose-100 text-rose-600 text-sm font-medium whitespace-nowrap relative cursor-pointer"
              onClick={togglePlay}
            >
              Play this 🎵
              {/* Little triangle pointing right */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-[6px] border-transparent border-l-white/90" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Pulsing ring effect when at the end and not showing video */}
          <AnimatePresence>
            {isAtEnd && !showVideo && (
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
            aria-label="Play song"
          >
            {showVideo ? <Music size={20} /> : <Music2 size={20} className="opacity-60" />}
          </motion.button>
        </div>
      </div>

      {/* YouTube Shorts Popup Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-[360px] max-w-[90vw] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              <iframe
                src="https://www.youtube.com/embed/CtBZMzFOnkc?autoplay=1&loop=1&playlist=CtBZMzFOnkc"
                title="Our Song"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
