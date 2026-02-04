import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import { RESUME_DATA } from '../data';

// Helper for Footer Links
const FooterLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: (e: React.MouseEvent) => void }) => (
  <a 
    href={href} 
    onClick={(e) => { e.preventDefault(); onClick(e); }}
    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group w-fit"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
    {children}
  </a>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#050510]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => handleNavClick('#hero')}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer focus:outline-none"
          >
            AG
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:glow cursor-pointer focus:outline-none"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#050510] border-b border-white/10">
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-gray-300 hover:text-white cursor-pointer focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Modern Industry Standard Footer */}
      <footer className="relative bg-[#02020a] border-t border-white/5 pt-20 pb-10 mt-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Brand & Bio (Span 5) */}
            <div className="md:col-span-5">
               <button 
                onClick={() => handleNavClick('#hero')}
                className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-2 focus:outline-none"
               >
                 Ankan<span className="text-purple-500">.</span>
               </button>
               <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                 Results-driven Data Scientist & Competitive Programmer. 
                 Specializing in transforming complex data into actionable insights through 
                 Machine Learning and efficient algorithms.
               </p>
               <div className="flex gap-4">
                 <a 
                   href={RESUME_DATA.social.github}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                   aria-label="GitHub"
                 >
                   <Github size={18} />
                 </a>
                 <a 
                   href={RESUME_DATA.social.linkedin}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-white/10 hover:border-blue-400/30 transition-all hover:scale-110"
                   aria-label="LinkedIn"
                 >
                   <Linkedin size={18} />
                 </a>
                 <a 
                   href={`mailto:${RESUME_DATA.email}`}
                   className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-white/10 hover:border-pink-400/30 transition-all hover:scale-110"
                   aria-label="Email"
                 >
                   <Mail size={18} />
                 </a>
               </div>
            </div>

            {/* Column 2: Navigation (Span 3) */}
            <div className="md:col-span-3">
              <h3 className="text-white font-semibold mb-6">Navigation</h3>
              <ul className="space-y-4">
                <li><FooterLink href="#hero" onClick={() => handleNavClick('#hero')}>Home</FooterLink></li>
                <li><FooterLink href="#education" onClick={() => handleNavClick('#education')}>Education</FooterLink></li>
                <li><FooterLink href="#projects" onClick={() => handleNavClick('#projects')}>Projects</FooterLink></li>
                <li><FooterLink href="#skills" onClick={() => handleNavClick('#skills')}>Skills</FooterLink></li>
              </ul>
            </div>

            {/* Column 3: Legal/Contact (Span 4) */}
            <div className="md:col-span-4">
               <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
               <p className="text-gray-400 text-sm mb-4">
                 Feel free to reach out for collaborations or just a friendly hello.
               </p>
               <a 
                 href={`mailto:${RESUME_DATA.email}`} 
                 className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors mb-8"
               >
                 {RESUME_DATA.email} <ArrowUpRight size={16} />
               </a>

               <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">Location</h3>
               <p className="text-gray-400 text-sm">
                 {RESUME_DATA.location}
               </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Ankan Ghosh. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
                <p className="text-gray-600 text-sm flex items-center gap-1.5">
                    Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
                </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};