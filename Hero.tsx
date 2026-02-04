import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { RESUME_DATA } from '../data';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
            Hello, I'm Ankan
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-200 to-blue-400">
            Aspiring <br />
            Data Scientist
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            Transforming complex datasets into actionable insights. Expert in Python, C++, and Machine Learning.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              onClick={scrollToSection('projects')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer"
            >
              View Work <ArrowRight size={18} />
            </a>
            <a 
              href={RESUME_DATA.resume} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/25"
            >
              Resume <Download size={18} />
            </a>
            <a 
              href="#contact" 
              onClick={scrollToSection('contact')}
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative w-80 h-80 mx-auto">
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-[80px] opacity-40 animate-pulse" />
             <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5603AQEgsBwL21VRlw/profile-displayphoto-scale_400_400/B56ZgJOw0_HYAk-/0/1752501523203?e=1772064000&v=beta&t=a92AmGRzscSEdNHt0elDQSMe0t5MOenQ-r1Ptw5JKZ8" 
                  alt="Ankan Ghosh" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};