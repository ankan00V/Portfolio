import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { RESUME_DATA } from '../data';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 inline-block">
            Education Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {RESUME_DATA.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ y: -10, rotateX: 5, boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)" }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-6">
                {/* Logo or Icon Logic */}
                {(edu as any).logo ? (
                  <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg shadow-black/20 overflow-hidden">
                    <img 
                      src={(edu as any).logo} 
                      alt={`${edu.institution} logo`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <GraduationCap className="text-white" size={26} />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {edu.institution}
              </h3>
              <p className="text-purple-200/80 font-medium mb-4">{edu.degree}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-400 border-t border-white/5 pt-4">
                <span>{edu.period}</span>
                <span className="flex items-center gap-1 text-green-400 font-medium">
                  <Award size={14} /> {edu.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};