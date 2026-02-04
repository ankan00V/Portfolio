import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { RESUME_DATA } from '../data';

// Sub-component for a Contact Card
const ContactCard = ({ icon: Icon, title, value, href, colorClass, delay, actionLabel }: any) => {
    return (
        <motion.a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className={`
                group relative flex flex-col items-center justify-center p-8 rounded-3xl 
                bg-white/5 backdrop-blur-xl border border-white/10 
                hover:border-white/20 transition-all duration-500 overflow-hidden text-center
            `}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`} />
            
            {/* Glowing Icon Container */}
            <div className={`
                relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 
                bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500
                shadow-2xl shadow-black/50
            `}>
                {/* Inner Glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-tr ${colorClass}`} />
                
                <Icon size={32} className="relative z-10 text-white" />
            </div>

            <h3 className="relative z-10 text-2xl font-bold text-white mb-2">{title}</h3>
            
            <p className="relative z-10 text-gray-400 text-sm mb-8 font-medium break-all max-w-[200px]">
                {value}
            </p>

            {/* Action Button */}
            <div className={`
                relative z-10 mt-auto px-6 py-2 rounded-full 
                bg-white/5 border border-white/10 group-hover:bg-white/10 
                flex items-center gap-2 text-sm font-semibold text-gray-300 group-hover:text-white 
                transition-all duration-300
            `}>
                {actionLabel} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.a>
    );
};

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide uppercase">
            Get in touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Collaborate</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to bring your data science projects to life? I'm currently available for freelance work and full-time opportunities.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ContactCard 
                icon={Mail} 
                title="Email Me" 
                value={RESUME_DATA.email} 
                href={`mailto:${RESUME_DATA.email}`}
                colorClass="from-purple-600 to-indigo-600"
                delay={0}
                actionLabel="Send Message"
            />
            <ContactCard 
                icon={Phone} 
                title="Call Me" 
                value={RESUME_DATA.phone} 
                href={`tel:${RESUME_DATA.phone}`}
                colorClass="from-blue-600 to-cyan-600"
                delay={0.1}
                actionLabel="Call Now"
            />
            <ContactCard 
                icon={MapPin} 
                title="Location" 
                value={RESUME_DATA.location} 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESUME_DATA.location)}`}
                colorClass="from-pink-600 to-rose-600"
                delay={0.2}
                actionLabel="Open Maps"
            />
        </div>
      </div>
    </section>
  );
};