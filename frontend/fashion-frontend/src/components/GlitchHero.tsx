import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Flame, Zap, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';

// Dark cybersigilism SVG
function DarkSigil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.5">
      <circle cx="100" cy="100" r="80" opacity="0.2" />
      <circle cx="100" cy="100" r="60" opacity="0.3" />
      <circle cx="100" cy="100" r="40" opacity="0.4" />
      <path d="M100,20 L100,45 M100,155 L100,180 M20,100 L45,100 M155,100 L180,100" opacity="0.3" strokeWidth="1" />
      <path d="M55,55 L70,70 M130,130 L145,145 M145,55 L130,70 M70,130 L55,145" opacity="0.3" strokeWidth="1" />
      <polygon points="100,50 120,90 150,100 120,110 100,150 80,110 50,100 80,90" opacity="0.1" fill="currentColor" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function GlitchHero() {
  const [glitch, setGlitch] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Graffiti Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1754914844790-be52551df820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ3JhZmZpdGklMjB3YWxsfGVufDF8fHx8MTc2MTQzODg1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Dark graffiti"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-[#0d0d0d]/80 to-[#0d0d0d]" />
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-950/10 via-transparent to-transparent" />
      </motion.div>

      {/* Floating dark sigils */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-24 w-48 h-48 text-red-900/20"
      >
        <DarkSigil />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 left-20 w-56 h-56 text-zinc-700/20"
      >
        <DarkSigil />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Gothic badge */}


        {/* Main Title - High Fashion Typography */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="relative mb-4">
              <span className={`block text-[10rem] md:text-[16rem] leading-none tracking-tighter gothic-text ${glitch ? 'animate-glitch-hard' : ''}`}>
                Fashion 
              </span>
            </h1>
          </motion.div>

          {/* Sharp underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-red-900 to-transparent mx-auto max-w-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-4 mb-16"
        >
          <p className="text-2xl md:text-4xl tracking-tight text-zinc-300 uppercase">
            Digital Wardrobe
          </p>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Construct your aesthetic. Archive your fits. Elevate your presence.
          </p>
        </motion.div>

        {/* CTA Buttons - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 bg-white text-black overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
              Explore Your Wardrobe
            </span>
          </motion.button>
        </motion.div>

        {/* Stats - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-32 flex justify-center gap-16"
        >
          {[
            { number: '50K+', label: 'ARCHIVED' },
            { number: '2K+', label: 'USERS' },
            { number: 'INF', label: 'STYLE' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl mb-2 gothic-text">
                {stat.number}
              </div>
              <div className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-zinc-700 to-transparent"
        />
      </motion.div>

      <style>{`
        @keyframes glitch-hard {
          0%, 100% { transform: translate(0) }
          20% { transform: translate(-4px, 4px) }
          40% { transform: translate(4px, -4px) }
          60% { transform: translate(-3px, -3px) }
          80% { transform: translate(3px, 3px) }
        }
        .animate-glitch-hard {
          animation: glitch-hard 0.2s;
        }

        /* Gothic/High Fashion text effect */
        .gothic-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 900;
          letter-spacing: -0.05em;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #d4d4d4 50%,
            #a3a3a3 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 80px rgba(220, 38, 38, 0.2);
        }
      `}</style>
    </section>
  );
}
