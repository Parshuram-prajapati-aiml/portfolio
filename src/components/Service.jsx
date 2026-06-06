import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Cpu, ShoppingBag, Layout, Award, Settings, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Service = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const cardsRef = useRef([]);

  const servicesData = [
    {
      title: "Business Website",
      tag: "Corporate",
      color: "#648c11",
      textColor: "text-[#648c11]",
      description: "Corporate websites optimized for conversion and premium branding.",
      icon: <Monitor size={36} />
    },
    {
      title: "Admin Dashboard",
      tag: "SaaS",
      color: "#ff4500",
      textColor: "text-[#ff4500]",
      description: "Advanced dashboards with analytics and data visualization.",
      icon: <Cpu size={36} />
    },
    {
      title: "E-Commerce Store",
      tag: "Retail",
      color: "#000080",
      textColor: "text-blue-500",
      description: "Luxury online shopping experiences with seamless checkout.",
      icon: <ShoppingBag size={36} />
    },
    {
      title: "Full Stack Web App",
      tag: "App",
      color: "#ff0000",
      textColor: "text-red-500",
      description: "Scalable web applications with powerful backend systems.",
      icon: <Layout size={36} />
    },
    {
      title: "Portfolio Website",
      tag: "Creative",
      color: "#fff000",
      textColor: "text-yellow-400",
      description: "High-end portfolio experiences for creators and agencies.",
      icon: <Award size={36} />
    },
    {
      title: "Website Redesign",
      tag: "Design",
      color: "#a855f7",
      textColor: "text-purple-400",
      description: "Modern redesigns with immersive animations and premium UI.",
      icon: <Settings size={36} />
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Custom JS object to track progress
      const scrollObj = { progress: 0 };

      const update3DTransforms = () => {
        const progress = scrollObj.progress;
        
        // Active card index tracking
        const currentActive = Math.min(
          servicesData.length - 1, 
          Math.max(0, Math.round(progress))
        );
        setActiveIdx(currentActive);

        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          const offset = i - progress;
          // Curve mathematics
          const radius = 650; // Radius of 3D circle
          const spacingAngle = 0.28; // Radians separation between cards
          const angle = offset * spacingAngle;

          // Trigonometric placement formula
          const x = Math.sin(angle) * radius;
          const y = radius - Math.cos(angle) * radius;
          const z = -Math.abs(offset) * 110;

          // Rotation around the curve
          const rotateZ = angle * (180 / Math.PI);
          const rotateY = -offset * 12;

          // Scale & Opacity formulas
          const scale = 1 - Math.abs(offset) * 0.15;
          const opacity = 1 - Math.abs(offset) * 0.35;

          gsap.set(card, {
            x,
            y: y - 100, // adjust height center offset
            z,
            rotationZ: rotateZ,
            rotationY: rotateY,
            scale: Math.max(0.5, scale),
            opacity: Math.max(0, opacity),
            pointerEvents: Math.abs(offset) < 0.5 ? 'auto' : 'none'
          });
        });
      };

      // Set up pinned ScrollTrigger
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=400%', // Scroll duration 500% overall (100% start + 400% scroll)
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          // Map scroll progress (0 to 1) to cards range (0 to 5)
          const targetProgress = self.progress * (servicesData.length - 1);
          gsap.to(scrollObj, {
            progress: targetProgress,
            duration: 0.1,
            overwrite: 'auto',
            onUpdate: update3DTransforms
          });
        }
      });

      // Initial update
      update3DTransforms();
    });

    return () => mm.revert();
  }, []);

  // Helper to return background styling based on active index color
  const getDynamicBg = () => {
    const color = servicesData[activeIdx]?.color || '#09090b';
    return {
      backgroundColor: `${color}15`, // extremely low opacity of original color
      transition: 'background-color 0.8s ease'
    };
  };

  return (
    <section
      id="service"
      ref={containerRef}
      className="relative w-full bg-zinc-950 text-white overflow-hidden transition-all duration-700"
      style={getDynamicBg()}
    >
      {/* Desktop Curved 3D Carousel */}
      <div
        ref={pinRef}
        className="hidden lg:flex w-full h-screen relative flex-col items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Outlined Watermark "SERVICES" */}
        <h2 className="absolute font-heading font-black text-[18vw] leading-none tracking-tighter text-outline select-none pointer-events-none opacity-5 uppercase">
          SERVICES
        </h2>

        {/* Curved Cards Shell */}
        <div 
          className="relative w-full h-[600px] flex items-center justify-center transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {servicesData.map((service, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute w-[420px] h-[520px] p-10 rounded-[30px] border border-white/10 glass-panel shadow-2xl flex flex-col justify-between group overflow-hidden transform-gpu"
            >
              {/* Card Color ambient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: service.color }}
              ></div>

              <div className="flex justify-between items-start z-10">
                <span 
                  className="text-xs uppercase font-sans font-bold tracking-widest px-4 py-1.5 rounded-full border"
                  style={{ 
                    borderColor: `${service.color}40`, 
                    color: service.color, 
                    backgroundColor: `${service.color}10` 
                  }}
                >
                  {service.tag}
                </span>
                <div 
                  className="p-3 bg-white/5 rounded-2xl border border-white/5"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </div>
              </div>

              <div className="z-10">
                <h3 className="text-3xl font-bold font-heading mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm font-sans font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={20} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Counter Indicator */}
        <div className="absolute bottom-10 flex items-center gap-3 z-20">
          {servicesData.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIdx === i ? 'w-8 bg-brand-yellow' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Snap Carousel version */}
      <div className="block lg:hidden w-full px-6 py-24 min-h-screen flex flex-col justify-center">
        <div className="mb-12">
          <span className="text-brand-yellow font-sans font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
            // SOLUTIONS
          </span>
          <h2 className="text-3xl font-heading font-black uppercase text-white tracking-tight">
            My Services
          </h2>
        </div>

        {/* Snap-scroll container */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-none scroll-smooth">
          {servicesData.map((service, idx) => (
            <div
              key={`mob-serv-${idx}`}
              className="snap-center flex-shrink-0 w-[80vw] p-8 rounded-[30px] border border-white/10 bg-zinc-900/80 backdrop-blur-md flex flex-col justify-between h-[420px]"
            >
              <div className="flex justify-between items-start">
                <span 
                  className="text-xs uppercase font-sans font-bold tracking-widest px-3 py-1 rounded-full border border-white/10"
                  style={{ color: service.color }}
                >
                  {service.tag}
                </span>
                <div style={{ color: service.color }}>
                  {service.icon}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-heading mb-3">{service.title}</h3>
                <p className="text-white/70 text-xs font-sans font-light leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-yellow">
                  Enquire <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
