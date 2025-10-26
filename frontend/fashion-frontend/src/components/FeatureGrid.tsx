import { motion } from 'motion/react';
import { Sparkles, Zap, Lock, TrendingUp, Users, Database } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'CATALOG',
    description: 'Archive every piece. Build your digital wardrobe.',
  },
  {
    icon: Zap,
    title: 'INSTANT',
    description: 'Generate outfits in seconds. No thinking required.',
  },
  {
    icon: Sparkles,
    title: 'SMART',
    description: 'AI understands your style. Suggests what works.',
  },
  {
    icon: TrendingUp,
    title: 'EVOLVE',
    description: 'Track trends. Stay ahead of the curve.',
  },
  {
    icon: Users,
    title: 'CONNECT',
    description: 'Network with others. Share your archive.',
  },
  {
    icon: Lock,
    title: 'SECURE',
    description: 'Your collection is private. Always backed up.',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-40 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-8">
            <div className="px-6 py-2 border border-zinc-800 bg-black/40">
              <span className="text-zinc-600 tracking-[0.3em] text-xs uppercase">Features</span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl mb-6 tracking-tighter gothic-text">
            COMPLETE SYSTEM
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="relative bg-zinc-950/50 border border-zinc-800 group-hover:border-zinc-700 transition-all p-10 h-full backdrop-blur-sm">
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-8 h-8">
                    <div className="absolute top-0 right-0 w-full h-px bg-zinc-800" />
                    <div className="absolute top-0 right-0 w-px h-full bg-zinc-800" />
                  </div>

                  {/* Icon */}
                  <div className="mb-8">
                    <div className="inline-flex p-3 border border-zinc-800 bg-black/60">
                      <Icon className="w-6 h-6 text-zinc-500" />
                    </div>
                  </div>

                  <h3 className="text-xl mb-4 tracking-wider text-zinc-300 uppercase">
                    {feature.title}
                  </h3>
                  
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Index */}
                  <div className="absolute bottom-4 right-4 text-4xl opacity-5 gothic-text">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-16 py-6 bg-white text-black overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 uppercase tracking-[0.2em] text-sm group-hover:text-white transition-colors">
              Join Waitlist
            </span>
          </motion.button>
          
          <p className="mt-8 text-zinc-700 text-xs uppercase tracking-widest">
            Limited Access • Invite Only
          </p>
        </motion.div>
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
