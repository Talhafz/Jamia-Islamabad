'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ThreeCanvas({ variant = 'hero' }: { variant?: 'hero' | 'subtle' }) {
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

    // Renderer — disable antialias on subtle variant for perf
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: variant === 'hero' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, variant === 'hero' ? 2 : 1.5));
    container.appendChild(renderer.domElement);

    // 1. PARTICLES (Floating Dust)
    // Subtle variant uses fewer particles for better perf on inner-page banners
    const particleCount = variant === 'hero' ? 200 : 60;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color('#10b981');
    const goldColor = new THREE.Color('#f59e0b');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i]     = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().copy(emeraldColor).lerp(goldColor, mixRatio);
      colors[i]     = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: variant === 'hero' ? 0.6 : 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. CENTRAL GEOMETRY (Islamic-Inspired Star Wireframe) - ONLY FOR HERO
    const starGroup = new THREE.Group();
    let cubeGeo: THREE.BoxGeometry | undefined;
    let edgeGeo1: THREE.EdgesGeometry | undefined;
    let wireframeMat: THREE.MeshBasicMaterial | undefined;
    let edgeMat: THREE.LineBasicMaterial | undefined;

    if (variant === 'hero') {
      cubeGeo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
      wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x059669,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });

      const cube1 = new THREE.Mesh(cubeGeo, wireframeMat);
      const cube2 = new THREE.Mesh(cubeGeo, wireframeMat);
      cube2.rotation.y = Math.PI / 4;
      cube2.rotation.x = Math.PI / 4;

      edgeGeo1 = new THREE.EdgesGeometry(cubeGeo);
      edgeMat = new THREE.LineBasicMaterial({
        color: 0xd97706,
        transparent: true,
        opacity: 0.45,
      });

      const edge1 = new THREE.LineSegments(edgeGeo1, edgeMat);
      const edge2 = new THREE.LineSegments(edgeGeo1, edgeMat);
      edge2.rotation.y = Math.PI / 4;
      edge2.rotation.x = Math.PI / 4;

      starGroup.add(cube1, cube2, edge1, edge2);
      scene.add(starGroup);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x059669, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse Tracking — hero only (subtle skips this for perf)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    if (variant === 'hero') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation Loop ────────────────────────────────────────────────────────
    // Subtle variant is throttled to ~30 fps to reduce GPU load on inner pages.
    const FRAME_INTERVAL = variant === 'hero' ? 0 : 1000 / 30;
    let lastFrameTime = 0;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause rendering when the browser tab is not visible
      if (document.hidden) return;

      // Throttle frame rate for subtle variant
      if (FRAME_INTERVAL > 0 && timestamp - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = timestamp;

      const elapsedTime = clock.getElapsedTime();

      if (variant === 'hero') {
        starGroup.rotation.y = elapsedTime * 0.12;
        starGroup.rotation.x = elapsedTime * 0.08;

        // Smooth mouse parallax
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x = targetX * 1.5;
        camera.position.y = -targetY * 1.5;
        camera.lookAt(scene.position);
      }

      // Slowly rotate the particle cloud on both variants
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // ── Cleanup — gracefully release WebGL resources without blocking navigation ──────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      try {
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        if (cubeGeo) cubeGeo.dispose();
        if (edgeGeo1) edgeGeo1.dispose();
        if (wireframeMat) wireframeMat.dispose();
        if (edgeMat) edgeMat.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.warn('WebGL cleanup warning:', e);
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none w-full h-full ${
        variant === 'hero' ? 'opacity-60' : 'opacity-30'
      }`}
    />
  );
}
