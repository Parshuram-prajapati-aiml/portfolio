import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, PlusCircle, MessageSquare } from 'lucide-react';

export const Navbar = ({ onAddTestimonial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', message: '' });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnRef = useRef(null);

  // Scroll to section helper
  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // GSAP Intro animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(logoRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8 }
    );

    tl.fromTo(linksRef.current, 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.5'
    );

    tl.fromTo(btnRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5 },
      '-=0.3'
    );
  }, []);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    if (onAddTestimonial) {
      onAddTestimonial({
        id: Date.now(),
        name: formData.name,
        role: formData.role || 'Client',
        message: formData.message,
        avatar: '/avatar.png' // Use fallback or avatar
      });
    }

    setFormData({ name: '', role: '', message: '' });
    setShowModal(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out px-6 py-4 md:px-12 md:py-6 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          lastScrollY > 50 
            ? 'background-transparent backdrop-blur-md border-b border-white/5 bg-zinc-950/40' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            ref={logoRef}
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold font-heading cursor-pointer tracking-wider text-white hover:text-brand-yellow hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all duration-300"
          >
            Parshuram Prajapati
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-sans">
            {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((link, idx) => (
              <button
                key={link}
                ref={(el) => (linksRef.current[idx] = el)}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="relative text-white/80 hover:text-white transition-colors duration-300 text-sm font-semibold uppercase tracking-widest group cursor-pointer"
              >
                {link}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Call to Action Button */}
          <div ref={btnRef} className="hidden md:block">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-zinc-900 border border-white/10 hover:border-brand-yellow px-5 py-2.5 rounded-full text-white text-sm font-semibold uppercase tracking-widest hover:scale-105 hover:bg-zinc-800 transition-all duration-300 shadow-md hover:shadow-brand-yellow/20 cursor-pointer"
            >
              <PlusCircle size={16} className="text-brand-yellow" />
              Add Review
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 bg-zinc-900/80 rounded-full border border-white/10 text-brand-yellow"
            >
              <PlusCircle size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-yellow transition-colors duration-200"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8 text-center">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link.toLowerCase())}
              className="text-4xl md:text-5xl font-bold font-heading text-white hover:text-brand-yellow transition-colors duration-300 uppercase tracking-wider"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              setShowModal(true);
            }}
            className="mt-6 flex items-center justify-center gap-2 bg-brand-yellow text-zinc-950 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <MessageSquare size={20} />
            Write Testimonial
          </button>
        </div>
      </div>

      {/* Testimonial Glassmorphic Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl font-bold font-heading text-white mb-2 flex items-center gap-2">
              <MessageSquare className="text-brand-yellow" />
              Add Testimonial
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Share your experience working with me. Your feedback will appear in the scroll marquee.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-yellow focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                  Role / Company
                </label>
                <input
                  type="text"
                  placeholder="Founder, Acme Corp"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-yellow focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Working with Leeshark was fantastic..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-yellow focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-brand-yellow hover:bg-yellow-500 text-zinc-950 font-bold py-4 rounded-xl uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
