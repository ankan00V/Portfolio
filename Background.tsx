import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Group for mouse interaction (tilt)
    const interactionGroup = new THREE.Group();
    scene.add(interactionGroup);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x8b5cf6); // Purple
    const color2 = new THREE.Color(0x3b82f6); // Blue
    const color3 = new THREE.Color(0xffffff); // White

    for(let i = 0; i < particlesCount * 3; i+=3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i+1] = (Math.random() - 0.5) * 15;
      posArray[i+2] = (Math.random() - 0.5) * 15;

      const choice = Math.random();
      let mixedColor;
      if (choice < 0.33) mixedColor = color1;
      else if (choice < 0.66) mixedColor = color2;
      else mixedColor = color3;

      colorsArray[i] = mixedColor.r;
      colorsArray[i+1] = mixedColor.g;
      colorsArray[i+2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    // Add mesh to interaction group
    interactionGroup.add(particlesMesh);

    camera.position.z = 5;

    // Interactive State (Normalized -1 to 1)
    let targetX = 0;
    let targetY = 0;

    const updateTargetPosition = (clientX: number, clientY: number) => {
      // Normalize coordinates to -1 to 1 range
      // This ensures consistent sensitivity across screen sizes (mobile vs desktop)
      targetX = (clientX / window.innerWidth) * 2 - 1;
      targetY = (clientY / window.innerHeight) * 2 - 1;
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      updateTargetPosition(event.clientX, event.clientY);
    };

    const onDocumentTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            updateTargetPosition(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    const onDocumentTouchStart = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            updateTargetPosition(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchmove', onDocumentTouchMove);
    document.addEventListener('touchstart', onDocumentTouchStart);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // 1. Continuous Rotation (Galaxy Spin) - Independent of cursor
      particlesMesh.rotation.y += 0.001; 
      particlesMesh.rotation.x += 0.0005;

      // 2. Mouse/Touch Interaction (Tilt/Parallax)
      // We use the normalized targetX/targetY to drive rotation
      // Max rotation amplitude: ~0.5 radians (approx 28 degrees)
      const rotationAmplitude = 0.5;
      
      const desiredRotationY = targetX * rotationAmplitude;
      const desiredRotationX = targetY * rotationAmplitude;

      // Smooth interpolation (damping)
      interactionGroup.rotation.y += 0.05 * (desiredRotationY - interactionGroup.rotation.y);
      interactionGroup.rotation.x += 0.05 * (desiredRotationX - interactionGroup.rotation.x);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      document.removeEventListener('touchstart', onDocumentTouchStart);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'radial-gradient(circle at center, #0a0a16 0%, #000000 100%)' }}
    />
  );
};