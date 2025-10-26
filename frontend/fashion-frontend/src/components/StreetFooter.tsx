import { motion } from 'motion/react';
import { Instagram, Twitter, Github } from 'lucide-react';

export function StreetFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-5xl tracking-tighter mb-4 gothic-text">
                FORGE
              </h3>
              <p className="text-zinc-600 uppercase text-sm tracking-wider">
                Archive System
              </p>
            </motion.div>

            {/* Social - Minimal */}
            <div className="flex gap-4">
              {[Instagram, Twitter, Github].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors"
                >
                  <Icon className="w-4 h-4 text-zinc-600" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-6 tracking-[0.3em] text-xs text-zinc-700 uppercase">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Archive', 'Pricing', 'Access'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm uppercase tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 tracking-[0.3em] text-xs text-zinc-700 uppercase">Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Privacy', 'Terms'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm uppercase tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-700 text-xs uppercase tracking-widest">
            © {currentYear} FitFinder
          </p>
          
          <p className="text-zinc-800 text-xs tracking-widest">
            BUILT DIFFERENT
          </p>
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
    </footer>
  );
}
