import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ChevronDown, CheckCircle2, Bookmark, Layers } from 'lucide-react';
import * as THREE from 'three';
import { RESUME_DATA } from '../data';

// 3D Blob Component
const Blob: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initial dimensions
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height); 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Crystal Core (Glowing, Solid, Faceted)
    const coreGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Indigo
      emissive: 0x4338ca, // Darker Indigo
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    // 2. Tech Cage (Wireframe Geodesic)
    const cageGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const cage = new THREE.Mesh(cageGeometry, cageMaterial);
    group.add(cage);

    // 3. Floating Data Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 150;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i+=3) {
        // Distributed in a shell
        const r = 2.2 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = r * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06,
        color: 0xec4899, // Pink
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x3b82f6, 2, 10); // Bright Blue
    light1.position.set(4, 4, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xd946ef, 2, 10); // Bright Magenta
    light2.position.set(-4, -4, 4);
    scene.add(light2);

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = mountRef.current?.getBoundingClientRect();
        if (rect) {
            // Normalize relative to the canvas container
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }
    };
    
    // Attach listener to the specific element for better control
    const element = mountRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

    // Handle Resize
    const handleResize = () => {
        if (!mountRef.current) return;
        width = mountRef.current.clientWidth;
        height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId: number;
    let time = 0;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;
      
      // Dynamic Rotations
      core.rotation.x = Math.sin(time * 0.5) * 0.3;
      core.rotation.y += 0.015;
      
      cage.rotation.y -= 0.005;
      cage.rotation.z += 0.003;

      particles.rotation.y += 0.002;
      particles.rotation.x = Math.sin(time * 0.2) * 0.1;
      
      // Breathing/Pulse Effect
      const pulse = 1 + Math.sin(time * 2.5) * 0.03;
      core.scale.setScalar(pulse);
      cage.scale.setScalar(1 + Math.sin(time * 1.5 + 1) * 0.02);

      // Interactive Tilt with Spring-like smoothing
      group.rotation.x += (mouseY * 0.8 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.8 - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      onClick={onClick}
      className="cursor-pointer w-[280px] h-[280px] md:w-[400px] md:h-[400px] mx-auto hover:scale-105 transition-transform duration-500 relative group flex items-center justify-center -my-4 md:-my-8"
      title="Click to reveal certifications"
    >
        {/* CSS Glow behind canvas for enhanced vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[40px] md:blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition-all duration-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-40 md:h-40 bg-indigo-500/20 blur-[30px] md:blur-[50px] rounded-full animate-pulse" />
    </div>
  );
};

export const Certifications: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="certifications" className="py-12 md:py-20 relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div 
          layout
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 inline-block mb-3 md:mb-4">
            Certifications & Credentials
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
            Validated expertise across Cloud, AI, and Data Science. 
            {isExpanded ? " Click the header to collapse." : " Tap the crystal to explore."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="blob"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
               <Blob onClick={() => setIsExpanded(true)} />
               
               <motion.button
                onClick={() => setIsExpanded(true)}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="mt-2 text-white/80 flex flex-col items-center gap-2 font-medium bg-white/5 px-6 py-2.5 md:px-8 md:py-3 rounded-full border border-purple-500/30 hover:bg-white/10 hover:border-purple-400 hover:text-white transition-all backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)] text-sm md:text-base"
               >
                 Tap to Reveal
                 <ChevronDown size={18} className="text-purple-400" />
               </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
               {/* Close / Collapse Control */}
               <div className="flex justify-center mb-6 md:mb-8">
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs md:text-sm text-gray-300 transition-all flex items-center gap-2 hover:border-purple-400/30"
                  >
                    Collapse View <ChevronDown className="rotate-180" size={14} />
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 perspective-1000">
                  {RESUME_DATA.certifications.map((cert, index) => {
                    const isPro = cert.type === 'Professional';
                    const isAssociate = cert.type === 'Associate';
                    const isFoundation = cert.type === 'Foundation';

                    return (
                      <motion.a
                        key={index}
                        href={cert.url || "https://www.linkedin.com/in/ghoshankan/details/certifications/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          relative p-5 md:p-6 rounded-2xl border backdrop-blur-md group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden
                          ${isPro 
                            ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]' 
                            : isAssociate 
                              ? 'bg-gradient-to-br from-cyan-500/5 to-teal-500/5 border-cyan-500/10 hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(34,211,238,0.1)]'
                              : isFoundation
                                ? 'bg-gradient-to-br from-emerald-500/5 to-green-500/5 border-emerald-500/10 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]'
                                : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                          }
                        `}
                      >
                        {/* Hover Gradient Overlay - reduced opacity for mobile to avoid text legibility issues if sticking */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${
                          isPro ? 'from-purple-500/10 via-transparent to-blue-500/10' : 
                          isAssociate ? 'from-cyan-500/10 via-transparent to-teal-500/10' :
                          isFoundation ? 'from-emerald-500/10 via-transparent to-green-500/10' :
                          'from-white/5 to-transparent'
                        }`} />

                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className={`p-2 md:p-2.5 rounded-xl ${
                            isPro ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300 ring-1 ring-purple-500/30' : 
                            isAssociate ? 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20' :
                            isFoundation ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20' :
                            'bg-white/10 text-gray-400'
                          }`}>
                            {isPro ? <Award size={20} className="md:w-6 md:h-6" /> : isAssociate ? <CheckCircle2 size={20} className="md:w-6 md:h-6" /> : isFoundation ? <Layers size={20} className="md:w-6 md:h-6" /> : <Bookmark size={20} className="md:w-6 md:h-6" />}
                          </div>
                          
                          {isPro && (
                            <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg shadow-purple-500/30 ring-1 ring-white/20">
                              Pro
                            </span>
                          )}
                          
                          {isAssociate && (
                             <span className="px-2 py-0.5 md:px-2 md:py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 rounded-lg">
                               Associate
                             </span>
                          )}

                          {isFoundation && (
                             <span className="px-2 py-0.5 md:px-2 md:py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
                               Foundation
                             </span>
                          )}
                        </div>
                        
                        <h3 className={`font-bold text-base md:text-lg mb-2 leading-tight transition-colors relative z-10 ${
                          isPro ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300' : 
                          isAssociate ? 'text-gray-100 group-hover:text-cyan-200' :
                          isFoundation ? 'text-gray-100 group-hover:text-emerald-200' :
                          'text-gray-200 group-hover:text-white'
                        }`}>
                          {cert.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-4 relative z-10 flex-wrap">
                          <span className={`font-medium ${isPro ? "text-purple-200/80" : isAssociate ? "text-cyan-200/80" : isFoundation ? "text-emerald-200/80" : "text-gray-400"}`}>{cert.issuer}</span>
                          <span className="opacity-50">•</span>
                          <span>{cert.date}</span>
                        </div>

                        {cert.id && (
                          <div className="hidden md:block text-xs text-gray-500 font-mono mb-4 break-all opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
                            ID: {cert.id}
                          </div>
                        )}

                        <div className={`mt-auto pt-3 md:pt-4 flex items-center gap-1 text-xs font-medium transition-colors relative z-10 ${
                          isPro ? 'text-purple-400 group-hover:text-purple-300' : 
                          isAssociate ? 'text-cyan-400 group-hover:text-cyan-300' :
                          isFoundation ? 'text-emerald-400 group-hover:text-emerald-300' :
                          'text-gray-400 group-hover:text-white'
                        }`}>
                          View Credential <ExternalLink size={12} />
                        </div>
                      </motion.a>
                    );
                  })}
               </div>
               
               <div className="flex justify-center mt-8 md:mt-12">
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors hover:scale-110 group"
                  >
                    <ChevronDown className="rotate-180 text-gray-400 group-hover:text-white" />
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};