import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Welcome = ({ testimonials = [] }) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  
  const welcomeTextRef = useRef(null);
  const imageMorphRef = useRef(null);
  
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger timeline to coordinate the transitions
    const pinContext = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Morph image & reveal welcome screen
      tl.to(imageMorphRef.current, {
        scale: window.innerWidth > 768 ? 3.8 : 2.5,
        yPercent: -20,
        opacity: 0.12,
        duration: 1
      }, 0);

      tl.to(welcomeTextRef.current, {
        scale: 1,
        opacity: 0.85,
        duration: 1
      }, 0.2);

      // 2. Transition from Screen 1 (Welcome) to Screen 2 (Testimonials)
      tl.to(screen1Ref.current, {
        opacity: 0,
        yPercent: -30,
        pointerEvents: 'none',
        duration: 0.8
      }, 1.2);

      tl.fromTo(screen2Ref.current, 
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, pointerEvents: 'auto', duration: 1 },
        1.3
      );

    }, pinRef);

    return () => pinContext.revert();
  }, []);

  // Split testimonials into 2 rows
  const midIndex = Math.ceil(testimonials.length / 2);
  const row1Testimonials = testimonials.slice(0, midIndex);
  const row2Testimonials = testimonials.slice(midIndex);

  // Helper to render initials avatar
  const renderInitials = (name) => {
    const parts = name.split(' ');
    const initials = parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
    const colors = [
      'bg-red-500/20 text-red-400 border-red-500/30',
      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bg-green-500/20 text-green-400 border-green-500/30',
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-rose-500/20 text-rose-400 border-rose-500/30'
    ];
    // Simple hash
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorClass = colors[charSum % colors.length];

    return (
      <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold font-heading ${colorClass}`}>
        {initials}
      </div>
    );
  };

  const TestimonialCard = ({ review }) => (
    <div className="glass-panel-light p-6 rounded-3xl w-[320px] md:w-[380px] flex-shrink-0 flex flex-col gap-4 mx-4 shadow-lg hover:border-brand-yellow/30 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-3">
        {review.avatar && review.avatar !== '/avatar.png' ? (
          <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
        ) : (
          renderInitials(review.name)
        )}
        <div>
          <h4 className="text-white text-sm font-semibold flex items-center gap-1.5 font-heading">
            {review.name}
            <span className="inline-block w-4 h-4 bg-blue-500 rounded-full text-[9px] flex items-center justify-center text-white" title="Verified Client">✓</span>
          </h4>
          <span className="text-white/40 text-xs">{review.role}</span>
        </div>
      </div>
      <p className="text-white/80 text-sm italic font-sans font-light leading-relaxed">
        "{review.message}"
      </p>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-950/60" style={{ height: '220vh' }}>
      
      {/* Welcome Screen Pin Box */}
      <div ref={pinRef} className="w-full h-screen overflow-hidden relative flex items-center justify-center bg-zinc-950">
        
        {/* Ambient background textures */}
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute inset-0 bg-radial-gradient from-zinc-900 to-zinc-950 pointer-events-none"></div>

        {/* Morphing Center Image Background Layer */}
        <div 
          ref={imageMorphRef} 
          className="absolute w-64 h-64 md:w-80 md:h-80 flex items-center justify-center pointer-events-none select-none z-0 transform-gpu"
        >
          <img 
            src="/avatar.png" 
            alt="Morphed Avatar background" 
            className="w-full h-full object-contain filter grayscale brightness-50 opacity-40" 
          />
        </div>

        {/* SCREEN 1: Welcome Typography Reveal */}
        <div 
          ref={screen1Ref} 
          className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <div ref={welcomeTextRef} className="opacity-0 scale-95 transform-gpu flex flex-col items-center w-full">
            <span className="text-brand-yellow font-sans font-bold text-xs md:text-sm uppercase tracking-[0.4em] mb-4 text-center">
              // INTRODUCTION
            </span>
            <h2 className="font-heading font-black text-[8vw] sm:text-[6vw] leading-none tracking-tighter uppercase text-white mb-8 text-center">
              ABOUT ME
            </h2>
            
            {/* Immersive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
              
              {/* Bio & Education (Left 7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">Who I Am</h3>
                  <p className="text-white/70 text-sm font-sans font-light leading-relaxed">
                    I am <strong className="text-brand-yellow">Parshuram Prajapati</strong>, a passionate Full Stack Web Developer and AIML student based in India. I enjoy creating modern, responsive, and user-friendly web applications, and solving real-world problems using technology. Specializing in Python programming and AI/ML-based pipelines, I am constantly learning and building.
                  </p>
                </div>
                
                <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-white/50">Education</h4>
                  <div>
                    <p className="text-sm font-bold text-white leading-snug">BLDEA College of Engineering and Technology</p>
                    <p className="text-xs text-white/60">Computer Science Engineering (Artificial Intelligence & Machine Learning)</p>
                    <p className="text-[10px] font-mono text-brand-yellow mt-1">Vijayapur, Karnataka, India</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-white/50 mb-1">Track Record</h4>
                  <p className="text-xs text-white/60">
                    🏆 1+ Year of Experience in Frontend Development, Python programming, and responsive web design.
                  </p>
                </div>
              </div>

              {/* Skills Matrix (Right 5 Columns) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-4">Core Skillset</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      'HTML', 'CSS', 'JavaScript', 'React', 'Python', 
                      'C Programming', 'MySQL', 'Git & GitHub', 'Machine Learning', 
                      'Responsive Web Design'
                    ].map((skill) => (
                      <span 
                        key={skill}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 text-center lg:text-left">
                  <p className="text-xs text-white/40">
                    *Scroll further to see selected works and client stories.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SCREEN 2: Testimonials Marquee Showcase */}
        <div 
          ref={screen2Ref} 
          className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0 z-20"
        >
          <div className="text-center px-6 mb-12">
            <span className="text-brand-yellow font-sans font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-3 block">
              // CLIENT STORIES
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase text-white tracking-tight">
              What People Say
            </h2>
            <p className="text-white/40 text-xs md:text-sm mt-2 font-sans">
              Feedback and reviews from design agencies and product teams.
            </p>
          </div>

          {/* Testimonial Rows (Marquees) */}
          <div className="flex flex-col gap-6 w-full overflow-hidden">
            
            {/* ROW 1: Scrolling Left */}
            <div className="relative flex w-full">
              <div className="animate-marquee-left flex py-2">
                {row1Testimonials.map((review, i) => (
                  <TestimonialCard key={`r1-${review.id}-${i}`} review={review} />
                ))}
                {/* Duplicate for infinite effect */}
                {row1Testimonials.map((review, i) => (
                  <TestimonialCard key={`r1-dup-${review.id}-${i}`} review={review} />
                ))}
              </div>
            </div>

            {/* ROW 2: Scrolling Right */}
            <div className="relative flex w-full">
              <div className="animate-marquee-right flex py-2">
                {row2Testimonials.map((review, i) => (
                  <TestimonialCard key={`r2-${review.id}-${i}`} review={review} />
                ))}
                {/* Duplicate for infinite effect */}
                {row2Testimonials.map((review, i) => (
                  <TestimonialCard key={`r2-dup-${review.id}-${i}`} review={review} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
