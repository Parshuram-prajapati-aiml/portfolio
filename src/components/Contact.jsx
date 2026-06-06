import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Mail, User, Send, Smartphone } from 'lucide-react';
import { sendEmail } from '../utils/emailService';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const sectionRef = useRef(null);

  useEffect(() => {
    // Pin contact section so that footer slides over it
    // pinSpacing: false means the footer will overlay this section as the scroll continues
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // Send email via EmailJS
      await sendEmail(formData);
      
      // WhatsApp integration
      const phoneNumber = "918792832815";
      const baseText = `*New Portfolio Inquiry* \n\n*Name:* ${formData.name}\n*Email:* ${formData.email || 'Not provided'}\n\n*Message:*\n${formData.message}`;
      const encodedText = encodeURIComponent(baseText);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/918792832815', color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]' },
    { name: 'Instagram', url: 'https://www.instagram.com/its_me_parshuram_18?igsh=MWtqY2U1cjAxNnRxag%3D%3D&utm_source=qr', color: 'hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[0_0_40px_rgba(225,48,108,0.4)]' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/parashuram-prajapati-97659a32a/', color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:shadow-[0_0_40px_rgba(0,119,181,0.4)]' },
    { name: 'GitHub', url: 'https://github.com/Parshuram-prajapati-aiml', color: 'hover:bg-[#24292e] hover:text-white hover:border-[#24292e] hover:shadow-[0_0_40px_rgba(36,41,46,0.4)]' }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0a0a0a] text-white flex items-center justify-center overflow-hidden rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-50"
    >
      {/* Background Watermark CONNECT */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <h2 className="font-heading font-black text-[25vw] tracking-tighter text-white/[0.02] leading-none uppercase">
          CONNECT
        </h2>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 items-center">
        
        {/* Left Side Header and Socials */}
        <div className="md:col-span-5 flex flex-col justify-center text-left">
          <span className="text-brand-yellow font-sans font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
            // GET IN TOUCH
          </span>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white tracking-tight leading-none mb-6">
            Let's <br />Talk
          </h2>
          
          <p className="text-white/50 text-sm font-sans font-light leading-relaxed mb-8 max-w-sm">
            Have a project in mind or want to say hello? Fill out the form and I'll receive it instantly on WhatsApp.
          </p>

          {/* Social Platforms Circle Icons */}
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 border border-white/20 text-xs font-bold rounded-full uppercase tracking-wider text-white/80 bg-transparent transition-all duration-500 ease-out hover:scale-105 ${link.color} cursor-pointer`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="md:col-span-7">
          <form onSubmit={handleSend} className="glass-panel p-8 rounded-3xl flex flex-col gap-5 border border-white/5 shadow-2xl relative z-50">
            
            {/* Input Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1 flex items-center gap-1.5">
                <User size={12} className="text-brand-yellow" /> Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:border-brand-yellow focus:outline-none transition-all duration-300"
              />
              {errors.name && <span className="text-rose-500 text-xs mt-1 font-sans">{errors.name}</span>}
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1 flex items-center gap-1.5">
                <Mail size={12} className="text-brand-yellow" /> Email (Optional)
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:border-brand-yellow focus:outline-none transition-all duration-300"
              />
              {errors.email && <span className="text-rose-500 text-xs mt-1 font-sans">{errors.email}</span>}
            </div>

            {/* Input Message */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1 flex items-center gap-1.5">
                <MessageSquare size={12} className="text-brand-yellow" /> Message
              </label>
              <textarea
                rows="4"
                placeholder="Describe your project, timeline and budget..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:border-brand-yellow focus:outline-none transition-all duration-300 resize-none"
              />
              {errors.message && <span className="text-rose-500 text-xs mt-1 font-sans">{errors.message}</span>}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 ${isLoading ? 'bg-zinc-600 cursor-not-allowed' : 'bg-white hover:bg-zinc-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]'} text-black font-bold py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300`}
            >
              <Send size={14} />
              {isLoading ? 'Sending...' : 'Send Inquiry'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-xs text-center font-sans">
                ✓ Message sent successfully! Check your WhatsApp too.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-rose-500/20 border border-rose-500 rounded-lg text-rose-400 text-xs text-center font-sans">
                ✕ Error sending message. Please try again or contact via WhatsApp.
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
