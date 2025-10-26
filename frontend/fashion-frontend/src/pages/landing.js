import { GlitchHero } from "../components/GlitchHero.tsx";
import { OutfitCreator } from "../components/OutfitCreator.tsx";
import { StyleMixer } from "../components/StyleMixer.tsx";
import { FeatureGrid } from "../components/FeatureGrid.tsx";
import { StreetFooter } from "../components/StreetFooter.tsx";
import '../styles/globals.css'
export  function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden relative">
      {/* Dark atmospheric gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-[#0d0d0d] to-zinc-950 pointer-events-none" />

      {/* Subtle red glow accents - Carti vampire vibes */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[180px] pointer-events-none" />

      <GlitchHero />
      <OutfitCreator />
      <StyleMixer />
      <FeatureGrid />
      <StreetFooter />
    </div>
  );
}