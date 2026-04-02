import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export interface Memory {
  id: string;
  date: string;
  title: string;
  summary: string;
  details: string;
  image: string;
}

export function Timeline({ memories }: { memories: Memory[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto py-10">
      {/* The vertical line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-rose-200/50 -translate-x-1/2" />

      <div className="flex flex-col gap-12">
        {memories.map((memory, index) => {
          const isExpanded = expandedId === memory.id;
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline Dot with Ripple */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 mt-6 md:mt-0">
                <motion.div
                  animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute w-4 h-4 rounded-full bg-rose-400"
                />
                <div className="w-4 h-4 rounded-full bg-rose-500 border-4 border-[#F5E6E8] shadow-[0_0_10px_rgba(194,24,91,0.5)]" />
              </div>

              {/* Content Card */}
              <div className={`w-full pl-12 pr-4 md:px-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div 
                  layout
                  onClick={() => setExpandedId(isExpanded ? null : memory.id)}
                  className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-xl cursor-pointer hover:bg-white/80 transition-colors group"
                >
                  <motion.span layout className="text-rose-400 text-sm font-medium tracking-wider uppercase mb-2 block">
                    {memory.date}
                  </motion.span>
                  <motion.h3 layout className="font-serif text-2xl text-rose-800 mb-2 group-hover:text-rose-600 transition-colors">
                    {memory.title}
                  </motion.h3>
                  <motion.p layout className="text-gray-600 font-light text-sm md:text-base">
                    {memory.summary}
                  </motion.p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-rose-100">
                          {memory.image.match(/\.(mp4|webm)$/i) ? (
                            <video 
                              src={memory.image}
                              controls
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="w-full h-48 rounded-xl mb-4 shadow-md bg-rose-50"
                              style={{ objectFit: 'cover' }}
                            >
                              <p className="text-gray-500 text-sm text-center py-4">Loading video...</p>
                            </video>
                          ) : (
                            <img 
                              src={memory.image} 
                              alt={memory.title} 
                              className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <p className="text-gray-700 font-light leading-relaxed text-sm md:text-base">
                            {memory.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div layout className="mt-4 text-center">
                    <span className="text-xs text-rose-400/70 uppercase tracking-widest">
                      {isExpanded ? 'Show less' : 'Click to expand'}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
