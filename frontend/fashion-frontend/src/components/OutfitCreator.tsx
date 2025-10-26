import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Layers, Archive, Zap, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';

const features = [
  {
    icon: Layers,
    title: 'Construct',
    description: 'Layer pieces from your archive to build infinite combinations',
  },
  {
    icon: Archive,
    title: 'Archive',
    description: 'Catalog every piece. Tag by style, season, mood, aesthetic',
  },
  {
    icon: Zap,
    title: 'Generate',
    description: 'AI-powered suggestions based on your collection and preferences',
  },
  {
    icon: Eye,
    title: 'Visualize',
    description: 'See your fits before you wear them. Save your favorites',
  }
];

export function OutfitCreator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-40 px-6 relative">
      {/* Dark concrete texture */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1628093753622-7421e9caa63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGNvbmNyZXRlJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjE0Mzg4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Concrete texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >


          <h2 className="text-6xl md:text-8xl mb-8 tracking-tighter gothic-text">
            YOUR ARCHIVE
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto uppercase tracking-wider">
            Build. Save. Reference.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/5 transition-colors duration-500 blur-xl" />
                
                <div className="relative bg-zinc-950/50 border border-zinc-800 group-hover:border-zinc-700 transition-all p-10 backdrop-blur-sm">
                  {/* Sharp corner accent */}
                  <div className="absolute top-0 left-0 w-12 h-12">
                    <div className="absolute top-0 left-0 w-full h-px bg-red-900/40" />
                    <div className="absolute top-0 left-0 w-px h-full bg-red-900/40" />
                  </div>

                  {/* Icon */}
                  <div className="mb-8">
                    <div className="inline-flex p-4 border border-zinc-800 bg-black/60">
                      <Icon className="w-6 h-6 text-zinc-400" />
                    </div>
                  </div>

                  <h3 className="text-3xl mb-4 tracking-tight text-zinc-200 uppercase">
                    {feature.title}
                  </h3>
                  
                  <p className="text-zinc-500 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom corner accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-zinc-800" />
                    <div className="absolute bottom-0 right-0 w-px h-full bg-zinc-800" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
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
        }
      `}</style>
    </section>
  );
}
