import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeWords = [
    "LEESHARK CREATIVE DEVELOPER PORTFOLIO",
    "DESIGN CODE ANIMATION WEBGL SAAS",
    "AWWWARDS INSPIRED LUXURY MINIMAL ART",
    "CRAFTING INTERACTIVE DIGITAL EXPERIENCES"
  ];

  return (
    <footer className="relative w-full bg-brand-yellow text-zinc-900 py-16 md:py-24 overflow-hidden z-30">
      
      {/* 4-LAYER SCROLLING MARQUEE TEXT BACKGROUND */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.06] font-heading font-black tracking-tighter uppercase select-none leading-none pt-4 pb-4">
        
        {/* Layer 1: Left */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-marquee-left-fast text-5xl md:text-8xl flex gap-16 whitespace-nowrap">
            <span>{marqueeWords[0]}</span>
            <span>{marqueeWords[0]}</span>
          </div>
        </div>

        {/* Layer 2: Right */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-marquee-right-fast text-5xl md:text-8xl flex gap-16 whitespace-nowrap">
            <span>{marqueeWords[1]}</span>
            <span>{marqueeWords[1]}</span>
          </div>
        </div>

        {/* Layer 3: Left */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-marquee-left-fast text-5xl md:text-8xl flex gap-16 whitespace-nowrap">
            <span>{marqueeWords[2]}</span>
            <span>{marqueeWords[2]}</span>
          </div>
        </div>

        {/* Layer 4: Right */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-marquee-right-fast text-5xl md:text-8xl flex gap-16 whitespace-nowrap">
            <span>{marqueeWords[3]}</span>
            <span>{marqueeWords[3]}</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
        
        {/* Profile Image Showcase */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8 animate-float">
          {/* Subtle drop shadow outline */}
          <div className="absolute inset-0 rounded-full bg-zinc-950/15 blur-2xl"></div>
          <img
            src="/parshuram.png"
            alt="Parshuram Prajapati Avatar"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-16">
          {/* Blue Follow Button */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:scale-105 hover:bg-blue-700 active:scale-95 transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] cursor-pointer"
          >
            Follow
          </a>
          
          {/* White Message Button */}
          <a
            href="https://wa.me/917695973074"
            target="_blank"
            rel="noreferrer"
            className="bg-white text-zinc-950 px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:scale-105 hover:bg-zinc-100 active:scale-95 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            Message
          </a>
        </div>

        {/* Luxury Branding */}
        <div className="text-center mb-10">
          <h3 className="text-3xl font-heading font-black uppercase tracking-wider text-zinc-950 flex items-center justify-center gap-1">
            Parshuram Prajapati
          </h3>
          <p className="text-zinc-800 text-xs font-semibold tracking-widest mt-2 uppercase">
            Crafting High-End Creative Code & Immersive Web Art
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-950 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Minimal transparency divider line */}
        <div className="w-full max-w-5xl h-[1.5px] bg-zinc-950/10 rounded-full mb-10"></div>

        {/* Bottom Copyright and legal links */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 text-zinc-800 text-xs font-bold font-sans uppercase tracking-wider">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Parshuram Prajapati. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-950">Privacy</a>
            <a href="#" className="hover:text-zinc-950">Terms</a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border-2 border-zinc-900/10 hover:border-zinc-950 flex items-center justify-center hover:bg-zinc-950 hover:text-brand-yellow transition-all duration-300 group cursor-pointer"
            title="Back to top"
          >
            <ArrowUp size={16} className="transform group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
