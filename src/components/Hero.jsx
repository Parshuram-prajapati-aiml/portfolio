import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const words = [
    'React Developer', 
    'Python Programmer', 
    'AIML Student', 
    'UI/UX Enthusiast', 
    'Machine Learning Enthusiast', 
    'Problem Solver'
  ];

  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imageRef = useRef(null);

  // Vertical text roll timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Parallax scrolling animations
  useEffect(() => {
    if (!heroRef.current || !leftRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'none', force3D: true },
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    tl.to(leftRef.current, {
      y: -80,
      opacity: 0,
    }, 0);

    tl.to(imageRef.current, {
      y: 100,
      scale: 0.96,
      transformOrigin: 'center center',
    }, 0);

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  // Hover sound or micro-interactions for social icons
  const socialPlatforms = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/918792832815',
      color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.91-6.997-1.88-1.879-4.361-2.912-7.001-2.914-5.443 0-9.865 4.42-9.869 9.865-.001 1.748.461 3.454 1.336 4.965l-.995 3.63 3.714-.974zm11.233-6.84c-.26-.13-1.536-.759-1.772-.844-.236-.085-.407-.13-.578.13-.171.26-.66.844-.809 1.012-.149.17-.299.19-.559.06-.26-.13-1.097-.404-2.09-1.293-.772-.687-1.293-1.537-1.445-1.796-.15-.26-.016-.399.115-.529.117-.117.26-.304.39-.455.131-.15.175-.255.263-.422.088-.168.044-.316-.022-.447-.066-.13-.578-1.393-.792-1.908-.208-.5-.438-.432-.6-.44-.153-.007-.328-.008-.503-.008-.176 0-.462.065-.704.327-.242.263-.925.903-.925 2.202s.945 2.553 1.077 2.729c.132.176 1.86 2.84 4.505 3.978.63.27 1.12.433 1.503.555.633.201 1.21.173 1.666.105.508-.076 1.536-.627 1.75-.1233.215-.607.215-1.127.15-1.22-.065-.09-.236-.13-.496-.26z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/its_me_parshuram_18?igsh=MWtqY2U1cjAxNnRxag%3D%3D&utm_source=qr',
      color: 'hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/parashuram-prajapati-97659a32a/',
      color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Parshuram-prajapati-aiml',
      color: 'hover:bg-[#24292e] hover:text-white hover:border-[#24292e] hover:shadow-[0_0_20px_rgba(36,41,46,0.4)]',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-24 bg-zinc-950 overflow-hidden"
    >
      {/* Background Noise & Ambient Blur */}
      <div className="absolute inset-0 noise-overlay"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography & Text details */}
        <div ref={leftRef} className="lg:col-span-7 flex flex-col justify-center">
          
          <span className="text-brand-yellow font-sans font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-4 block">
            // Full Stack Developer • AIML Student • Python Programmer
          </span>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5vw] font-heading font-black leading-[0.9] tracking-tighter uppercase text-white mb-6">
            Hello, I'm <br />
            <span className="text-outline">Parshuram</span>
          </h1>

          {/* Continuous Rotating Text Roll Animation */}
          <div className="h-14 overflow-hidden mb-6 flex items-center">
            <span className="text-xl md:text-2xl font-heading font-extrabold text-white mr-3">I'm a</span>
            <div className="relative h-full flex flex-col justify-start">
              {words.map((word, index) => {
                const isSelected = index === activeWordIndex;
                return (
                  <div
                    key={word}
                    className={`absolute left-0 text-xl md:text-2xl font-heading font-extrabold text-brand-yellow uppercase tracking-wider transition-all duration-700 ease-in-out ${
                      isSelected 
                        ? 'translate-y-0 opacity-100 scale-100' 
                        : index < activeWordIndex 
                          ? '-translate-y-full opacity-0 scale-95' 
                          : 'translate-y-full opacity-0 scale-95'
                    }`}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-white/60 text-base md:text-lg max-w-xl font-sans font-light leading-relaxed mb-8">
            I am Parshuram Prajapati, a passionate Web Developer and AIML student specializing in responsive web development, Python programming, and AI/ML-based projects. I enjoy creating modern digital experiences and solving real-world problems.
          </p>

          {/* Social Icons Group */}
          <div className="flex flex-wrap gap-4 items-center">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 transition-all duration-500 ease-out cursor-pointer ${platform.color} group`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {platform.svg}
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* Right Side: Hero Avatar Image (Parallax) */}
        <div ref={rightRef} className="lg:col-span-5 flex justify-center items-center">
          <div 
            ref={imageRef}
            className="relative w-40 h-40 sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[520px] lg:h-[520px] max-w-full flex items-center justify-center transform-gpu will-change-transform"
          >
            {/* Ambient decorative glowing border */}
            <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-brand-yellow/10 to-transparent animate-pulse opacity-60"></div>
            
            {/* Image Box */}
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <img
                src="/parshuram.png"
                alt="Parshuram Prajapati Avatar"
                width={520}
                height={520}
                className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Floating interactive card indicators */}
            <div className="absolute -top-4 -right-4 bg-zinc-900/90 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl animate-float pointer-events-none shadow-lg">
              <span className="text-[10px] text-brand-yellow font-bold uppercase tracking-widest block">Focus Areas</span>
              <span className="text-xs font-semibold text-white">Web & AIML Projects</span>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-zinc-900/90 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-xl animate-float-delayed pointer-events-none shadow-lg">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block">Location</span>
              <span className="text-xs font-semibold text-white">Vijayapur, India</span>
            </div>
          </div>
        </div>

      </div>

      {/* Slide down arrow indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-40">
        <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-white mb-2">Scroll to explore</span>
        <div className="w-1 h-12 bg-white/20 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-yellow rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

