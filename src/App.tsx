/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Particles } from './components/Particles';
import { MusicPlayer } from './components/MusicPlayer';
import { Typewriter } from './components/Typewriter';
import { NextButton } from './components/NextButton';
import { StorySection, MessageBlock, ImageGallery } from './components/StoryComponents';
import { Timeline } from './components/Timeline';
import { FlipCard } from './components/FlipCard';

export default function App() {
  const [appState, setAppState] = useState<'start' | 'greeting' | 'story'>('start');
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scrolling before starting
  useEffect(() => {
    if (appState !== 'story') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Small delay to let the DOM update before scrolling
      setTimeout(() => scrollTo('section-1'), 100);
    }
  }, [appState]);

  return (
    <div className="relative min-h-screen bg-beige selection:bg-rose-200 selection:text-rose-900 font-sans">
      <Particles />
      <MusicPlayer isAtEnd={isAtEnd} />

      <AnimatePresence mode="wait">
        {appState === 'start' && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-beige via-blush/20 to-beige"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-center px-6"
            >
              <h1 className="font-serif text-5xl md:text-7xl text-rose-800 mb-6 tracking-wide">
                For Dipa
              </h1>
              <p className="text-rose-600/80 text-lg md:text-xl font-light mb-12 tracking-widest uppercase text-sm">
                A digital love letter
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAppState('greeting')}
                className="group relative overflow-hidden px-10 py-4 rounded-full bg-white/80 backdrop-blur-md border border-rose-100 shadow-[0_0_40px_rgba(194,24,91,0.15)] text-rose-700 font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_60px_rgba(194,24,91,0.35)] hover:bg-rose-50 hover:border-rose-200"
              >
                <span className="relative z-10 group-hover:text-rose-900 transition-colors duration-300">Click to Begin 💫</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-rose-100/0 via-rose-100/50 to-rose-100/0 z-0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {appState === 'greeting' && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-white to-rose-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-center px-6"
            >
              <h1 className="font-serif text-4xl md:text-6xl text-rose-800 mb-4 tracking-wide">
                Good morning Dipa ☀️
              </h1>
              <p className="text-rose-500/80 text-lg md:text-2xl font-light italic mb-12">
                A small gift from your Suva ❤️
              </p>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAppState('story')}
                className="px-8 py-3 rounded-full bg-rose-100/80 text-rose-700 font-medium tracking-wide transition-all duration-300 hover:bg-rose-200 hover:shadow-[0_0_30px_rgba(194,24,91,0.2)] hover:text-rose-900 hover:border-rose-300 border border-rose-200 shadow-sm"
              >
                Open Gift 🎁
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {appState === 'story' && (
        <main className="relative z-10">
          {/* Section 1 - About Dipa */}
          <StorySection id="section-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-12 text-center italic"
            >
              To the girl who changed everything...
            </motion.h2>

            <ImageGallery eager images={[
              { 
                src: "/dipa1.webp", 
                alt: "Beautiful portrait of Dipa",
                className: "w-64 h-80 md:w-72 md:h-96 rotate-[-2deg]"
              },
              { 
                src: "/dipa2.jpg", 
                alt: "Dipa",
                className: "w-56 h-72 md:w-64 md:h-80 rotate-[3deg] mt-8 md:mt-16"
              }
            ]} />

            <MessageBlock delay={0.2}>
              From the moment you came into my life, everything felt brighter. 
              Like a soft morning light after a long night.
            </MessageBlock>
            
            <MessageBlock delay={0.6}>
              Your smile, your laugh, the way you see the world... 
              It all captivated me in a way I never expected.
            </MessageBlock>

            <NextButton onClick={() => scrollTo('section-2')} text="There's more... 💖" />
          </StorySection>

          {/* Section 2 - Us Together */}
          <StorySection id="section-2" className="bg-gradient-to-b from-transparent via-white/40 to-transparent">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-12 text-center italic"
            >
              Our Story
            </motion.h2>

            <MessageBlock>
              Every moment spent with you feels like a page from a book I never want to finish reading.
            </MessageBlock>

            <ImageGallery images={[
              { 
                src: "/our-story.webp", 
                alt: "Our Story",
                className: "w-full max-w-2xl h-64 md:h-96 rounded-3xl object-cover"
              }
            ]} />

            <MessageBlock delay={0.4}>
              It’s in the quiet moments. The shared glances. The comfortable silences.
              That’s where I found my home. With you.
            </MessageBlock>

            <NextButton onClick={() => scrollTo('section-little-things')} text="Keep going..." />
          </StorySection>

          {/* Section 2.5 - The Little Things */}
          <StorySection id="section-little-things">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-12 text-center italic"
            >
              The Little Things
            </motion.h2>

            <MessageBlock>
              It's not just the big moments that made me fall for you.
            </MessageBlock>

            {/* Mobile: stacked layout, Desktop: scattered polaroid layout */}
            {/* Mobile layout */}
            <div className="flex flex-col items-center gap-6 my-12 md:hidden px-4 w-full">
              <motion.div
                initial={{ opacity: 0, rotate: -4, y: 20 }}
                whileInView={{ opacity: 1, rotate: -4, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-48 p-3 bg-white shadow-xl rounded-sm border border-gray-100"
              >
                <img src="/little1.jpg" alt="Your smile" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Your smile</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 5, y: 20 }}
                whileInView={{ opacity: 1, rotate: 5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-48 p-3 bg-white shadow-xl rounded-sm border border-gray-100 self-end mr-4"
              >
                <img src="/little2.jpg" alt="Your eyes" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Your eyes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: -2, y: 20 }}
                whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-52 p-3 bg-white shadow-2xl rounded-sm border border-gray-100 self-center"
              >
                <img src="/little3.webp" alt="Just you" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Just you</p>
              </motion.div>
            </div>

            {/* Desktop layout - scattered polaroids */}
            <div className="relative w-full max-w-3xl h-[500px] my-12 mx-auto hidden md:block">
              <motion.div
                initial={{ opacity: 0, rotate: -10, x: -50, y: 20 }}
                whileInView={{ opacity: 1, rotate: -6, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute left-[10%] top-[10%] w-56 p-3 bg-white shadow-xl rounded-sm border border-gray-100 z-10"
              >
                <img src="/little1.jpg" alt="Your smile" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Your smile</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 10, x: 50, y: -20 }}
                whileInView={{ opacity: 1, rotate: 8, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute right-[10%] top-[30%] w-60 p-3 bg-white shadow-xl rounded-sm border border-gray-100 z-20"
              >
                <img src="/little2.jpg" alt="Your eyes" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Your eyes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: -5, y: 50 }}
                whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute left-[35%] bottom-[5%] w-64 p-3 bg-white shadow-2xl rounded-sm border border-gray-100 z-30"
              >
                <img src="/little3.webp" alt="Just you" className="w-full aspect-square object-cover mb-3" loading="lazy" />
                <p className="font-serif text-center text-gray-600 text-sm italic">Just you</p>
              </motion.div>
            </div>

            <MessageBlock delay={0.8}>
              It's the way your nose scrunches. The sound of your voice. The random little habits that make you so uniquely, beautifully you.
            </MessageBlock>

            <NextButton onClick={() => scrollTo('section-3')} text="Our memories..." />
          </StorySection>

          {/* Section 3 - Special Moments */}
          <StorySection id="section-3" className="w-full max-w-5xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-16 text-center italic"
            >
              Moments I'll Never Forget
            </motion.h2>

            <Timeline memories={[
              {
                id: '1',
                date: 'The Beginning',
                title: 'That First Spark',
                summary: 'I remember the exact moment I realized you were special.',
                details: 'It wasn\'t just butterflies; it was a deep, sudden sense of peace. Like I had finally found something I didn\'t even know I was looking for. Everything just clicked into place.',
                image: '/moment1.jpg'
              },
              {
                id: '2',
                date: 'Late Nights',
                title: 'Endless Conversations',
                summary: 'Hours feel like minutes when we talk.',
                details: 'I could listen to your voice forever and never get tired of it. Every late-night call, every shared secret, every silly joke brought us closer together in ways I can\'t fully explain.',
                image: '/moment2.webp'
              },
              {
                id: '3',
                date: 'Just Us',
                title: 'A Perfect Day',
                summary: 'The day we just existed together, with nowhere to be.',
                details: 'No big plans, just you and me. Those simple, quiet moments are the ones I treasure the most, because they showed me how effortless and beautiful loving you is.',
                image: '/moment3.webp'
              }
            ]} />

            <NextButton onClick={() => scrollTo('section-intimate')} text="Almost there..." />
          </StorySection>

          {/* Section 3.5 - Intimate Moments */}
          <StorySection id="section-intimate">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-12 text-center italic"
            >
              Just You & Me
            </motion.h2>

            <MessageBlock>
              Beyond the adventures and the laughter, my favorite moments are the quiet ones.
            </MessageBlock>

            <div className="flex flex-col md:flex-row gap-8 my-16 items-center justify-center w-full max-w-4xl px-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full md:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(194,24,91,0.15)] group"
              >
                <img src="/intimate1.webp" alt="Together" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white font-serif italic text-xl md:text-2xl tracking-wide">Fingers intertwined...</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative w-full md:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(194,24,91,0.15)] group mt-8 md:mt-16"
              >
                <img src="/intimate2.jpg" alt="Close together" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white font-serif italic text-xl md:text-2xl tracking-wide">Late night whispers...</p>
                </div>
              </motion.div>
            </div>

            <MessageBlock delay={0.6}>
              The way you look at me when you think I'm not noticing. The warmth of your embrace. Those are the moments I want to live in forever.
            </MessageBlock>

            <NextButton onClick={() => scrollTo('section-4')} text="Our journey..." />
          </StorySection>

          {/* Section 4 - Deep Emotional Message */}
          <StorySection id="section-4" className="bg-white/30 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <motion.p 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5 }}
                className="text-xl md:text-2xl text-gray-800 font-light leading-loose"
              >
                I don't know what the future holds, but I know exactly who I want to hold in the future.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-800 font-light leading-loose"
              >
                You are my favorite thought, my sweetest dream, and my most beautiful reality.
              </motion.p>
            </div>

            <NextButton onClick={() => scrollTo('section-reasons')} text="Why I love you..." />
          </StorySection>

          {/* Section 4.5 - Reasons Why */}
          <StorySection id="section-reasons">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl md:text-5xl text-rose-800 mb-6 text-center italic"
            >
              Just A Few Reasons Why
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-rose-400/80 uppercase tracking-widest text-sm mb-16 text-center"
            >
              (Though there are a million more)
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl px-4">
              <FlipCard frontText="01" backText="Your beautiful, kind heart that cares so deeply." delay={0.1} />
              <FlipCard frontText="02" backText="The way you make me feel completely safe and at home." delay={0.3} />
              <FlipCard frontText="03" backText="Your infectious smile that lights up my darkest days." delay={0.5} />
              <FlipCard frontText="04" backText="Because you are simply, perfectly, unapologetically you." delay={0.7} />
            </div>

            <NextButton onClick={() => scrollTo('section-final')} text="One last thing..." />
          </StorySection>

          {/* Final Section - Ending */}
          <StorySection id="section-final" className="min-h-[100vh] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeOut" }}
              onViewportEnter={() => {
                setTimeout(() => setShowFinalMessage(true), 1000);
                setIsAtEnd(true);
              }}
              onViewportLeave={() => setIsAtEnd(false)}
              className="text-center relative"
            >
              <motion.div 
                className="absolute inset-0 bg-rose-200/30 blur-[100px] rounded-full z-0"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10 h-32 flex items-center justify-center">
                {showFinalMessage && (
                  <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-rose-800 tracking-wide">
                    <Typewriter text="I love you, Dipa ❤️" speed={100} />
                  </h1>
                )}
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: showFinalMessage ? 1 : 0 }}
                transition={{ delay: 3, duration: 2 }}
                className="mt-12 text-rose-600/60 font-light tracking-widest uppercase text-sm"
              >
                Forever & Always
              </motion.p>
            </motion.div>
          </StorySection>
        </main>
      )}
    </div>
  );
}
