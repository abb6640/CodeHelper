import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';

const styles = [
  {
    name: 'INDUSTRIAL',
    image: 'https://images.unsplash.com/photo-1616488312245-7dbe834e6311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdXJiYW4lMjBjaXR5fGVufDF8fHx8MTc2MTQzODg1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'GOTHIC',
    image: 'https://images.unsplash.com/photo-1701857151674-5ca51c53bde7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3RoaWMlMjBhcmNoaXRlY3R1cmUlMjBkYXJrfGVufDF8fHx8MTc2MTM1NjQyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'STREET',
    image: 'https://images.unsplash.com/photo-1509539662397-116cb90542f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwZGFya3xlbnwxfHx8fDE3NjE0Mzg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'MINIMAL',
    image: 'https://images.unsplash.com/photo-1573381034258-a0ad2216f65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBuZW9uJTIwZ3JhZmZpdGl8ZW58MXx8fHwxNzYxNDM4ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  }
];

export function StyleMixer() {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-zinc-950 to-[#0d0d0d]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-8xl tracking-tighter gothic-text mb-8">
            AESTHETICS
          </h2>
          
          <p className="text-xl text-zinc-500 uppercase tracking-wider">
            Define Your Language
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <ImageWithFallback
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Border effect */}
              <div className="absolute inset-0 border border-zinc-800 group-hover:border-red-900/40 transition-colors" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top corner marker */}
                <div className="flex justify-end">
                  <div className="w-2 h-2 bg-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Bottom title */}
                <div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <h3 className="text-3xl tracking-tighter mb-2 text-white uppercase">
                      {style.name}
                    </h3>
                    <div className="w-12 h-px bg-zinc-700 group-hover:bg-red-900 transition-colors" />
                  </motion.div>
                </div>
              </div>

              {/* Index number */}
              <div className="absolute top-8 left-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity gothic-text">
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <p className="text-zinc-600 uppercase tracking-widest text-sm">
            Mix. Match. Create Your Own.
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
