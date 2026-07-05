'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;
    
    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. PARTICLES (Floating Dust)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color('#10b981');
    const goldColor = new THREE.Color('#f59e0b');

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates in space [-10, 10]
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Random color interpolate between emerald and gold
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().copy(emeraldColor).lerp(goldColor, mixRatio);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (simple point)
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. CENTRAL GEOMETRY (Islamic-Inspired Star Wireframe)
    // We can simulate an 8-pointed star by intersecting two cubes rotated 45 degrees
    const starGroup = new THREE.Group();

    const cubeGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x059669, // Emerald
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const cube1 = new THREE.Mesh(cubeGeo, wireframeMat);
    const cube2 = new THREE.Mesh(cubeGeo, wireframeMat);
    cube2.rotation.y = Math.PI / 4; // 45 degrees rotation
    cube2.rotation.x = Math.PI / 4;

    // Add gold edges to highlight outline
    const edgeGeo1 = new THREE.EdgesGeometry(cubeGeo);
    const edgeMat = new THREE.LineBasicMaterial({ 
      color: 0xd97706, // Gold
      transparent: true,
      opacity: 0.45 
    });
    
    const edge1 = new THREE.LineSegments(edgeGeo1, edgeMat);
    const edge2 = new THREE.LineSegments(edgeGeo1, edgeMat);
    edge2.rotation.y = Math.PI / 4;
    edge2.rotation.x = Math.PI / 4;

    starGroup.add(cube1);
    starGroup.add(cube2);
    starGroup.add(edge1);
    starGroup.add(edge2);
    scene.add(starGroup);

    // Light source for highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x059669, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate central geometry
      starGroup.rotation.y = elapsedTime * 0.12;
      starGroup.rotation.x = elapsedTime * 0.08;

      // Rotate particle cloud slowly
      particles.rotation.y = elapsedTime * 0.02;

      // Smooth mouse follow parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 1.5;
      camera.position.y = -targetY * 1.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cubeGeo.dispose();
      edgeGeo1.dispose();
      particleGeometry.dispose();
      wireframeMat.dispose();
      edgeMat.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60"
    />
  );
}
