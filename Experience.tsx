import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { RESUME_DATA } from '../data';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Professional <span className="text-blue-500">Experience</span>
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />

          {RESUME_DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 w-full" />
              
              <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 shrink-0 my-4 md:my-0 md:mx-8 overflow-hidden ${(exp as any).logo ? 'bg-white' : 'bg-[#050510]'}`}>
                {(exp as any).logo ? (
                  <img 
                    src={(exp as any).logo} 
                    alt={exp.company} 
                    className="w-full h-full object-contain p-1" 
                  />
                ) : (
                  <Briefcase size={20} className="text-purple-400" />
                )}
              </div>

              <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10 p-6 rounded-2xl inline-block w-full md:w-auto md:min-w-[300px]">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="text-purple-400 font-medium mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-500 mb-4">{exp.period} | {exp.location}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};