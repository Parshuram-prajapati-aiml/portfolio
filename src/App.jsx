import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Component imports
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import Service from './components/Service';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const App = () => {
  // Testimonials state management (allows dynamic addition of new client reviews)
  const [testimonials, setTestimonials] = useState([
    { 
      id: 1, 
      name: "Alex Mercer", 
      role: "CTO at Nexus", 
      message: "Leeshark is an exceptional developer who brought our design vision to life with stunning precision.", 
      avatar: "/avatar.png" 
    },
    { 
      id: 2, 
      name: "Sarah Connor", 
      role: "Creative Director at Cyberdyne", 
      message: "The interactive folder animation and 3D carousels blew our clients away. Highly recommended!", 
      avatar: "/avatar.png" 
    },
    { 
      id: 3, 
      name: "David Miller", 
      role: "Founder at ScaleFlow", 
      message: "Fast, responsive, and incredibly talented. Will work with them again on our next SaaS app.", 
      avatar: "/avatar.png" 
    },
    { 
      id: 4, 
      name: "Elena Rostova", 
      role: "PM at Vostok Tech", 
      message: "The performance and animation flow are flawless. True professional.", 
      avatar: "/avatar.png" 
    },
    { 
      id: 5, 
      name: "Raj Patel", 
      role: "Director at CoreLogic", 
      message: "Outstanding communication and excellent execution. Exceeded all expectations!", 
      avatar: "/avatar.png" 
    },
  ]);

  const handleAddTestimonial = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    // Sync ScrollTrigger updates with Lenis scrolling
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Ticker configuration
    gsap.ticker.lagSmoothing(0);

    // 2. Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Cleanup scrolling triggers on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-yellow selection:text-zinc-950 select-none overflow-x-hidden">
      
      {/* 1. Navbar: top fixed responsive navbar */}
      <Navbar onAddTestimonial={handleAddTestimonial} />

      {/* 2. Portfolio: fullscreen fixed background section */}
      {/* Set to sticky/fixed so content scrolls over it with overlap effect */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Portfolio />
      </div>

      {/* 3. Content Wrapper: Scrolls over portfolio with overlap shadow */}
      <div className="relative z-10 bg-zinc-950 shadow-[0_-30px_60px_rgba(9,9,11,0.95)]">
        
        {/* welcome section tag indicator */}
        <div id="home">
          {/* Hero: main landing section */}
          <Hero />
        </div>

        <div id="about">
          {/* Welcome: intro content section with testimonial marquee */}
          <Welcome testimonials={testimonials} />
        </div>

        <div id="portfolio">
          {/* Projects: animated 3D folder archive showcase */}
          <Projects />
        </div>

        <div id="service">
          {/* Services: premium 3D curved services carousel */}
          <Service />
        </div>

        <div id="contact">
          {/* Contact: parallax overlap contact section */}
          <Contact />
        </div>

        {/* Footer: luxury branding and Alternating Marquee */}
        <Footer />
      </div>

    </div>
  );
};

export default App;
