import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Portfolio = () => {
  const [activeColor, setActiveColor] = useState('yellow');
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const overlayRef = useRef(null);

  // Background colors config
  const colorMap = {
    red: { bg: 'bg-red-950/80', accent: '#ef4444', text: 'text-red-500' },
    yellow: { bg: 'bg-amber-950/80', accent: '#facc15', text: 'text-yellow-400' },
    green: { bg: 'bg-emerald-950/80', accent: '#22c55e', text: 'text-green-400' },
    purple: { bg: 'bg-purple-950/80', accent: '#a855f7', text: 'text-purple-400' },
    rose: { bg: 'bg-rose-950/80', accent: '#f43f5e', text: 'text-rose-400' },
    orange: { bg: 'bg-orange-950/80', accent: '#f97316', text: 'text-orange-400' },
  };

  // GSAP quickTo tracking
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    // QuickTo setups for laggy buttery smooth tracking
    if (scannerRef.current) {
      xTo.current = gsap.quickTo(scannerRef.current, 'left', {
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => updateClipPath()
      });
      yTo.current = gsap.quickTo(scannerRef.current, 'top', {
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => updateClipPath()
      });
    }
  }, []);

  const updateClipPath = () => {
    if (!scannerRef.current || !overlayRef.current || !containerRef.current) return;
    
    // Get positions relative to container
    const rect = containerRef.current.getBoundingClientRect();
    
    // Read current animated position from scanner element
    const scanLeft = parseFloat(scannerRef.current.style.left) || 0;
    const scanTop = parseFloat(scannerRef.current.style.top) || 0;
    
    const halfSize = 140; // 280px box size
    const x = scanLeft + halfSize;
    const y = scanTop + halfSize;
    
    // Apply inverted clipping mask to overlay (meaning the overlay gets a cut-out)
    // To cut out a rectangle in a clip-path, we draw outer perimeter, then inner cutout:
    // polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, [cutout coordinates...])
    const left = x - halfSize;
    const right = x + halfSize;
    const top = y - halfSize;
    const bottom = y + halfSize;
    
    overlayRef.current.style.clipPath = `polygon(
      0% 0%, 
      0% 100%, 
      100% 100%, 
      100% 0%, 
      0% 0%, 
      ${left}px ${top}px, 
      ${right}px ${top}px, 
      ${right}px ${bottom}px, 
      ${left}px ${bottom}px, 
      ${left}px ${top}px
    )`;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !xTo.current || !yTo.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    setIsHovered(true);
    
    // target coordinates for left/top of the 280px box
    const targetLeft = x - 140;
    const targetTop = y - 140;

    xTo.current(targetLeft);
    yTo.current(targetTop);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Move offscreen or animate back to center
    if (xTo.current && yTo.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 140;
      const centerY = rect.height / 2 - 140;
      xTo.current(centerX);
      yTo.current(centerY);
    }
  };

  // Initialize scanner position to center on load
  useEffect(() => {
    if (containerRef.current && xTo.current && yTo.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 140;
      const centerY = rect.height / 2 - 140;
      gsap.set(scannerRef.current, { left: centerX, top: centerY });
      // trigger initial clipPath calculation
      setTimeout(() => updateClipPath(), 100);
    }
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-hidden cursor-crosshair bg-zinc-950 select-none flex items-center justify-center"
    >
      {/* SHARP REVEALED BACKGROUND LAYER */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${colorMap[activeColor].bg} flex flex-col justify-center items-center overflow-hidden`}>
        {/* Large Typography Background Text */}
        <div className="absolute font-heading font-black text-[18vw] tracking-tighter leading-none opacity-45 flex pointer-events-none select-none select-none select-none select-none text-white/10 uppercase">
          P O <span className="text-outline-yellow">R</span> T F <span className="text-outline">O</span> L I O
        </div>

        {/* Center Showcase Avatar Image (Sharp) */}
        <div className="relative z-10 w-80 h-80 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] flex justify-center items-center">
          <div className="absolute inset-0 rounded-full blur-3xl opacity-25 transition-colors duration-1000" style={{ backgroundColor: colorMap[activeColor].accent }}></div>
          <img
            src="/parshuram.png"
            alt="Parshuram Sharp Avatar"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="absolute bottom-28 text-center z-10 pointer-events-none">
          <p className="text-xs uppercase tracking-[0.4em] font-sans font-bold text-white/50 mb-1">Hover & Move Cursor</p>
          <h2 className="text-2xl font-bold font-heading uppercase text-white tracking-widest">
            Reveal <span className="text-brand-yellow">Creative Scanner</span>
          </h2>
        </div>
      </div>

      {/* BLURRED OVERLAY LAYER (Clipped dynamically based on cursor) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-zinc-950/75 backdrop-blur-[6px] brightness-[0.75] flex flex-col justify-center items-center overflow-hidden z-20 transition-all pointer-events-none"
        style={{
          // Starts with full clip (meaning nothing is cut out, overlay is fully blurred)
          clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%)'
        }}
      >
        {/* Blurred Typography Background Text */}
        <div className="absolute font-heading font-black text-[18vw] tracking-tighter leading-none opacity-5 flex text-white uppercase">
          P O R T F O L I O
        </div>

        {/* Center Showcase Avatar Image (Blurred) */}
        <div className="relative w-80 h-80 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] flex justify-center items-center filter blur-md grayscale">
          <img
            src="/parshuram.png"
            alt="Parshuram Blurred Avatar"
            className="w-full h-full object-contain opacity-40"
          />
        </div>
      </div>

      {/* CURSOR SCANNER BOX AND CROP FRAME */}
      <div
        ref={scannerRef}
        className="absolute w-[280px] h-[280px] pointer-events-none z-30"
        style={{
          left: '-1000px',
          top: '-1000px',
          transition: 'opacity 0.3s ease',
          opacity: isHovered ? 1 : 0.7
        }}
      >
        {/* Marching Ants Border Box */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: `drop-shadow(0 0 12px ${colorMap[activeColor].accent})` }}>
          <rect
            x="4"
            y="4"
            width="272"
            height="272"
            fill="none"
            stroke={colorMap[activeColor].accent}
            strokeWidth="2.5"
            className="marching-ants-rect"
          />
        </svg>

        {/* Crop Frame Corner Handles */}
        {/* Top-Left */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4" style={{ borderColor: colorMap[activeColor].accent }}></div>
        {/* Top-Right */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4" style={{ borderColor: colorMap[activeColor].accent }}></div>
        {/* Bottom-Left */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4" style={{ borderColor: colorMap[activeColor].accent }}></div>
        {/* Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4" style={{ borderColor: colorMap[activeColor].accent }}></div>

        {/* Small Center Target Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <div className="w-[2px] h-4 absolute bg-white/40"></div>
          <div className="h-[2px] w-4 absolute bg-white/40"></div>
        </div>
      </div>

      {/* BACKGROUND COLOR SWITCHER (Bottom center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/90 border border-white/10 px-6 py-3.5 rounded-full backdrop-blur-xl flex items-center gap-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Theme:</span>
        <div className="flex gap-2.5">
          {Object.keys(colorMap).map((color) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                setActiveColor(color);
              }}
              style={{
                backgroundColor: colorMap[color].accent,
                boxShadow: activeColor === color ? `0 0 15px ${colorMap[color].accent}` : 'none'
              }}
              className={`w-5 h-5 rounded-full cursor-pointer hover:scale-125 active:scale-95 transition-all duration-300 ${
                activeColor === color ? 'scale-110 ring-2 ring-white border-2 border-zinc-950' : 'opacity-70 hover:opacity-100'
              }`}
              title={color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
