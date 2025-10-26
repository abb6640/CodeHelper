import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Shirt, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaTshirt } from "react-icons/fa";

export function LandingPage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [floatingItems, setFloatingItems] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        
        // Generate random floating fashion items
        const items = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 15 + Math.random() * 10
        }));
        setFloatingItems(items);
    }, []);

    // Fashion model images from Unsplash (high-quality fashion photography - diverse models)
    const fashionImages = [
        "httpshttps://www.prada.com/ww/en/pradasphere/fashion-shows/2025/ss-menswear.html://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=700&fit=crop&q=80", // Male model
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=700&fit=crop&q=80", // Female model
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&q=80", // Male model
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop&q=80"  // Female model
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating fashion icons */}
            {floatingItems.map((item) => (
                <div
                    key={item.id}
                    className="absolute pointer-events-none opacity-10"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        animation: `float ${item.duration}s infinite ease-in-out`,
                        animationDelay: `${item.delay}s`
                    }}
                >
                    {item.id % 3 === 0 ? (
                        <Shirt className="w-8 h-8 text-purple-400" />
                    ) : item.id % 3 === 1 ? (
                        <Star className="w-6 h-6 text-pink-400" />
                    ) : (
                        <Sparkles className="w-7 h-7 text-indigo-400" />
                    )}
                </div>
            ))}

            {/* Fashion Model Images - Left Side (Desktop only) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pl-8 z-0">
                {fashionImages.slice(0, 2).map((img, idx) => (
                    <div
                        key={`left-${idx}`}
                        className="fashion-image-container relative"
                        style={{
                            animationDelay: `${idx * 0.2}s`
                        }}
                    >
                        <img
                            src={img}
                            alt={`Fashion model ${idx + 1}`}
                            className="w-52 h-72 object-cover rounded-2xl shadow-2xl border-2 border-white/10 transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Fashion Model Images - Right Side (Desktop only) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pr-8 z-0">
                {fashionImages.slice(2, 4).map((img, idx) => (
                    <div
                        key={`right-${idx}`}
                        className="fashion-image-container-right relative"
                        style={{
                            animationDelay: `${idx * 0.2 + 0.4}s`
                        }}
                    >
                        <img
                            src={img}
                            alt={`Fashion model ${idx + 3}`}
                            className="w-52 h-72 object-cover rounded-2xl shadow-2xl border-2 border-white/10 transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Fashion Images Gallery - Mobile Version (scrolling banner) */}
            <div className="lg:hidden absolute top-0 left-0 right-0 h-32 overflow-hidden opacity-30 pointer-events-none">
                <div className="flex gap-4 animate-scroll-horizontal">
                    {[...fashionImages, ...fashionImages].map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Fashion ${idx}`}
                            className="w-32 h-44 object-cover rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Main Content */}
                <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Badge with bounce animation */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg mb-8 border border-white/20 animate-bounce-slow">
                        <FaTshirt className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="text-purple-300 font-medium tracking-wide font-zalando">FitFinder AI</span>
                    </div>

                    {/* Main Heading with Wave Animation */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-zalando font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                            FIT FINDER
                        </span>
                    </h1>

                    {/* Subtitle with typing effect feel */}
                    <p className="font-zalando text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
                        Discover your perfect outfit with AI-powered recommendations. 
                        <span className="block mt-2 font-medium text-purple-400 animate-pulse-slow">Your style journey starts here.</span>
                    </p>

                    {/* CTA Button with ripple effect */}
                    <button
                        onClick={() => navigate('/outfit-finder')}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden animate-bounce-in"
                    >
                        <span className="relative z-10">Get Started</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform animate-slide" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Ripple effect */}
                        <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping"></span>
                    </button>
                </div>

                {/* Bottom Text with fade */}
                <p className={`text-sm text-gray-400 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'} animate-fade-in`}>
                    Join thousands styling smarter every day
                </p>
            </div>

            <style>{`
                .font-zalando {
                    font-family: 'Zalando Sans SemiExpanded', sans-serif;
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                
                @keyframes bounce-in {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes fade-in-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes slide {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes slide-in-left {
                    0% { 
                        transform: translateX(-100px);
                        opacity: 0;
                    }
                    100% { 
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slide-in-right {
                    0% { 
                        transform: translateX(100px);
                        opacity: 0;
                    }
                    100% { 
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes scroll-horizontal {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out 0.5s both;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out 0.3s both;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out both;
                }
                
                .animate-slide {
                    animation: slide 2s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }

                .animate-scroll-horizontal {
                    animation: scroll-horizontal 20s linear infinite;
                }

                /* Left side fashion images animation */
                .fashion-image-container {
                    animation: slide-in-left 0.8s ease-out both;
                }

                /* Right side fashion images animation */
                .fashion-image-container-right {
                    animation: slide-in-right 0.8s ease-out both;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}